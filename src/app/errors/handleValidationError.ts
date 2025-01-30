import mongoose from 'mongoose';
import { TErrorSources } from '../interface/error';

export const mongooseErrorHandler = (err: mongoose.Error.ValidationError) => {
  const errorSources: TErrorSources = Object.values(err?.errors).map((val) => {
    return {
      path: val?.path,
      message: val?.message,
    };
  });

  const statusCode = 400;

  return {
    statusCode,
    message: 'Mongoose Validation Error',
    errorSources,
  };
};
