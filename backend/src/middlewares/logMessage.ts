import { Request, Response, NextFunction } from 'express';

export default (req: Request, resp: Response, next: NextFunction) => {
  const { method, path } = req;
  const dateTime = new Date().toISOString();
  console.log(`[${dateTime}] Request received: ${method}, ${path}`);
  next();
};
