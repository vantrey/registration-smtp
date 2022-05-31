import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { getErrorResponse } from '../helpers/getErrorResponse';
import { authorizationService } from '../services/authorization.service';

export const userExistingCheckMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, login } = req.body;
  const userExistingResult = await authorizationService.checkLoginOrEmailExist({
    login,
    email,
  });

  if (userExistingResult.isExist) {
    res.status(400).json(
      getErrorResponse([
        {
          field: userExistingResult.existingField,
          message: `${userExistingResult.existingField} already exist`,
        },
      ])
    );

    return;
  }

  next();
};
