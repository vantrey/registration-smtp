import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { getErrorResponse } from '../helpers/getErrorResponse';

export const inputValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const newErrors = errors.array({ onlyFirstError: true }).map((error) => ({
      message: error.msg,
      field: error.param,
    }));

    const errorResponse = getErrorResponse(newErrors);

    res.status(400).json(errorResponse);
  } else {
    next();
  }
};

export const loginValidation = body('login').trim().isLength({ min: 2, max: 100 });
export const emailValidation = body('email').trim().isLength({ min: 2, max: 100 });
export const passwordValidation = body('password').trim().isLength({ min: 2, max: 100 });
export const codeValidation = body('code').trim().isLength({ min: 2, max: 100 });
