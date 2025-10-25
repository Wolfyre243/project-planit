import { NextFunction, Request, Response } from 'express';

// @ts-expect-error Function type error
export const catchAsync = (fn) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};