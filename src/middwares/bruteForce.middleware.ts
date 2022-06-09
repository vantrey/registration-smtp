import { NextFunction, Request, Response } from 'express';
import requestIp from 'request-ip';

export const bruteForceMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const ip = req.ip;
  const clientIp = requestIp.getClientIp(req);
  console.log('clientIp', clientIp);
  console.log('req.ip = ', ip);
  console.log('req.socket.remoteAddress = ', req.socket.remoteAddress);
  console.log('req.connection.remoteAddress = ', req.connection.remoteAddress);
  console.log('req.connection.remoteAddress = ', req.connection.remoteAddress);
  console.log('req.headers[X-FORWARDED-FOR] = ', req.headers['X-FORWARDED-FOR']);

  const endpoint = req.url;
  console.log(endpoint);

  next();
};
