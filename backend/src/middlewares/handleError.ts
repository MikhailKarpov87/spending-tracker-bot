import { Request, Response, NextFunction } from 'express';
import { handleError } from '../helpers/error';

export default (err: Error, req: Request, res: Response, next: NextFunction) => {
  const dateTime = new Date().toISOString();
  console.log(`[${dateTime}] ERROR: ${err}`);
  handleError(err, res);
  next();
};
