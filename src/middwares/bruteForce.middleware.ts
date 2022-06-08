import { NextFunction, Request, Response } from 'express';

export const bruteForceMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const ip = req.ip;
  console.log('req.ip = ', ip);
  console.log('req.connection.remoteAddress = ', req.connection.remoteAddress);
  console.log('req.socket.remoteAddress = ', req.socket.remoteAddress);
  next();
};
