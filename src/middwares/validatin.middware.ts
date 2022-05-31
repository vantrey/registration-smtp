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

export const loginValidation = body('login')
  .trim()
  .isLength({ min: 2, max: 30 })
  .withMessage('title is required and its length should be 2-30 symbols');
export const emailValidation = body('email')
  .trim()
  .isLength({ min: 2, max: 15 })
  .withMessage('name is required and its length should be 2-15symbols');
export const passwordValidation = body('password').isLength({ min: 2, max: 100 });
