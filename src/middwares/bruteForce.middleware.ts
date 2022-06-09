import { NextFunction, Request, Response } from 'express';
import { ipListService } from '../services/ipList.service';

export const bruteForceMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const ip = req.ip;
  const endpoint = req.url;

  const isBlocked = await ipListService.checkIsIpBlocked(ip, endpoint);

  if (isBlocked) {
    res.sendStatus(429);

    return;
  }

  next();
};
