import { Request, Response, Router } from 'express';
import { sendEmailService } from '../services/sendEmail.service';
import {
  emailValidation,
  inputValidationMiddleware,
  loginValidation,
  passwordValidation,
} from '../middwares/validatin.middware';
import { authorizationService } from '../services/authorization.service';
import { userExistingCheckMiddleware } from '../middwares/userExistingCheck.middware';

export const registrationRouter = Router({});

registrationRouter.post(
  '/registration',
  loginValidation,
  emailValidation,
  passwordValidation,
  inputValidationMiddleware,
  userExistingCheckMiddleware,
  async (req: Request, res: Response) => {
    try {
      const { email, password, login } = req.body;

      const result = await authorizationService.registration({ login, email, password });

      if (!result) {
        res.status(500).send('something went wrong');

        return;
      }

      await sendEmailService.sendEmail(email);
      res.sendStatus(200);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  }
);
