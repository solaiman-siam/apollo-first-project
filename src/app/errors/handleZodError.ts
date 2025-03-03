import { ZodError, ZodIssue } from 'zod';
import { TErrorReturn, TErrorSources } from '../interface/error';

export const zodErrorHandler = (err: ZodError) : TErrorReturn => {
  const errorSources: TErrorSources = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue?.message,
    };  
  });
  const statusCode = 400;
  return {
    statusCode,
    message: 'Zod Validation Error',
    errorSources,
  };
};
