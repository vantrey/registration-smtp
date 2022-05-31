export interface IErrorMessage {
  message: string;
  field: string;
}

export const getErrorResponse = (errors: IErrorMessage[]) => {
  return {
    resultCode: 1,
    errorsMessages: errors,
  };
};
