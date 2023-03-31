import { Router, Request, Response } from 'express';

export const usersForLessonRouter = Router({});

const nameValidator = (name: string): { field: string; message: string; isValid: boolean } => {
  const trimmedName = name.trim();

  if (!trimmedName) {
    return {
      isValid: false,
      field: `name`,
      message: 'name is requared',
    };
  }

  const isMaxLengthInvalid = trimmedName.length < 5;
  const isMinLengthInvalid = trimmedName.length > 10;

  if (isMaxLengthInvalid || isMinLengthInvalid) {
    return {
      isValid: false,
      field: `name`,
      message: 'name length should maximum 10 and minimum 5 symbols',
    };
  }

  return {
    isValid: true,
    field: '',
    message: '',
  };
};

usersForLessonRouter.get(
  '/users-lesson',
  (req: Request<{}, {}, { name: string; age: number; bio: string }>, res: Response) => {
    const { bio, age, name } = req.body;

    const errorsMessages: { field: string; message: string }[] = [];

    const { isValid: isNameValid, ...error } = nameValidator(name);

    if (!isNameValid) {
      errorsMessages.push(error);
    }

    //if bio

    // if age

    if (errorsMessages) {
      res.status(400).send({ errorsMessages });

      return;
    }

    res.send(200);
  }
);
