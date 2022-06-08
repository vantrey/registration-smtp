import { Request, Response, Router } from 'express';
import { sendEmailService } from '../services/sendEmail.service';
import {
  codeValidation,
  emailValidation,
  inputValidationMiddleware,
  loginValidation,
  passwordValidation,
} from '../middwares/validatin.middleware';
import { authorizationService } from '../services/authorization.service';
import { emailOrLoginExistingCheckMiddleware } from '../middwares/emailOrLoginExistingCheck.middleware';
import { getErrorResponse } from '../helpers/getErrorResponse';
import { resendEmailValidationMiddleware } from '../middwares/resendEmailValidation.middleware';
import { jwtUtility } from '../helpers/jwt-utility';
import { bruteForceMiddleware } from '../middwares/bruteForce.middleware';
import rateLimit from 'express-rate-limit';

const apiLimiter = rateLimit({
  windowMs: 10000, // 15 minutes
  max: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  statusCode: 429,
  message: '!@#!@#!@#!@#!@#!@#!@#!@#',
});

export const registrationRouter = Router({});

registrationRouter
  .post(
    '/registration',
    bruteForceMiddleware,
    apiLimiter,
    loginValidation,
    emailValidation,
    passwordValidation,
    inputValidationMiddleware,
    emailOrLoginExistingCheckMiddleware,
    async (req: Request, res: Response) => {
      try {
        const { email, password, login } = req.body;
        const createdUser = await authorizationService.registration({ login, email, password });

        if (!createdUser) {
          res.status(500).send('something went wrong');

          return;
        }

        await sendEmailService.sendEmail(email, createdUser.code);
        res.sendStatus(204);
      } catch (error) {
        console.log(error);
        res.status(500).json((error as Error).message);
      }
    }
  )
  .post(
    '/registration-confirmation',
    codeValidation,
    inputValidationMiddleware,
    async (req, res) => {
      try {
        const { code } = req.body;

        const codeIsConfirmed = await authorizationService.confirmRegistration(code);

        if (!codeIsConfirmed) {
          res.status(400).json(
            getErrorResponse([
              {
                field: 'code',
                message: `Wrong code`,
              },
            ])
          );

          return;
        }

        res.sendStatus(204);
      } catch (error) {
        console.log(error);
        res.status(500).json((error as Error).message);
      }
    }
  )
  .post(
    '/registration-email-resending',
    emailValidation,
    inputValidationMiddleware,
    resendEmailValidationMiddleware,
    async (req, res) => {
      try {
        const { email } = req.body;

        const updatedCode = await authorizationService.updateUserCode(email);

        if (!updatedCode) {
          res.status(400).json(getErrorResponse([{ field: 'code', message: 'user doesnt exist' }]));

          return;
        }

        await sendEmailService.sendEmail(email, updatedCode);
        res.sendStatus(204);
      } catch (error) {
        console.log(error);
        res.status(500).json((error as Error).message);
      }
    }
  )
  .post(
    '/auth/login',
    passwordValidation,
    loginValidation,
    inputValidationMiddleware,
    async (req, res) => {
      try {
        const { login, password } = req.body;

        const token = await authorizationService.authorizeUser(login, password);
        200;
        if (!token) {
          res.sendStatus(401);

          return;
        }
        let userid = await jwtUtility.extractUserIdFromToken(token);
        console.log('userId', userid?.toString());
        res.status(200).json({ token });
      } catch (error) {
        console.log(error);
        res.status(500).json((error as Error).message);
      }
    }
  );
