import { Request, Response, NextFunction } from 'express';
import { APIError } from '../types/error.types.js';

export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  console.log(`Route not found: ${req.method} ${req.path}`);
  // If user tries to access non-existing route
  next(new APIError(`Resource not found - ${req.originalUrl}`, 404));
};

export const errorHandler = (err: APIError, req: Request, res: Response, next: NextFunction) => {
  // Set default values
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  // Enhanced response
  const response: {
    status: number;
    message: string;
    stack?: string;
  } = {
    status: err.statusCode,
    message: err.statusCode != 500 ? err.message : 'Internal Server Error',
  };

  // Show stack trace in dev only for easier debugging
  if (process.env.NODE_ENV === 'development') {
    response.stack = err.stack;
  }

  if (err instanceof SyntaxError && err.statusCode === 400 && 'body' in err) {
    err.statusCode = 400;
    err.status = 'fail';
    response.message = 'Invalid JSON body!';
  }

  // Log all errors (could be replaced with winston or an external logger)
  // console.error(`[${new Date().toISOString()}]`, err);

  if (err.statusCode !== 500) {
    console.error(err.message);
  } else {
    console.error('Internal Server Error', {
      message: err.message,
      stack: err.stack,
      path: req.path,
    });
  }

  // Send response
  res.status(err.statusCode).json(response);
};