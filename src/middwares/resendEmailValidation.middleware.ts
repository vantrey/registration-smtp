import { NextFunction, Request, Response } from 'express';
import { getErrorResponse } from '../helpers/getErrorResponse';
import { authorizationService } from '../services/authorization.service';

export const resendEmailValidationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;

  const user = await authorizationService.getUserByLoginOrEmail({ email });

  if (!user || user.isConfirmed) {
    res.status(400).json(
      getErrorResponse([
        {
          field: 'email',
          message: `User doesnt exist or already confirmed`,
        },
      ])
    );

    return;
  }

  next();
};
