import mongoose from 'mongoose';
import { TErrorReturn, TErrorSources } from '../interface/error';




export const mongooseErrorHandler = (err: mongoose.Error.ValidationError) : TErrorReturn => {
  const errorSources: TErrorSources = Object.values(err?.errors).map((val) => {
    return {
      path: val?.path,
      message: val?.message,
    };
  });

  const statusCode = 400;
  const heYou = 'lkasdf'
  return {
    statusCode,
    message: 'Mongoose Validation Error',
    errorSources,
  };
};
