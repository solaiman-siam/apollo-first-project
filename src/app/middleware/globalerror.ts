import { ErrorRequestHandler, NextFunction, Request, Response } from "express"
import { ZodError, ZodIssue } from "zod"
import { TErrorSources } from "../interface/error"
import config from "../config"
import { zodErrorHandler } from "../errors/handleZodError"
import { mongooseErrorHandler } from "../errors/handleValidationError"
import { castErrorHandler } from "../errors/handleCastError"
import { duplicateErrorHandler } from "../errors/handleDuplicateError"


const globarError : ErrorRequestHandler = (err, req, res, next) => {

    let success = false
    let statusCode = 500
    let message = 'Something went wrong'
    let errorSources : TErrorSources = [{
      path: '',
      message: 'Something went wrong'
    }]



    if(err instanceof ZodError) {
      const simplifiedError = zodErrorHandler(err)
      statusCode = simplifiedError?.statusCode,
      message = simplifiedError?.message,
      errorSources = simplifiedError?.errorSources
    }else if(err?.name === 'ValidationError') {
      const simplifiedError = mongooseErrorHandler(err)
      statusCode = simplifiedError?.statusCode
      message = simplifiedError?.message
      errorSources = simplifiedError?.errorSources
    }else if (err?.name === 'CastError') {
      const simplifiedError = castErrorHandler(err)
      statusCode = simplifiedError?.statusCode,
      message= simplifiedError?.message,
      errorSources = simplifiedError?.errorSources
    }else if (err?.code === 11000) {
      const simplifiedError = duplicateErrorHandler(err)
      statusCode = simplifiedError?.statusCode,
      message= simplifiedError?.message,
      errorSources = simplifiedError?.errorSources
    // }else if (err instanceof AppError) {

    //   statusCode = err?.statusCode,
    //   message= err?.message,
    //   errorSources = [
    //     {
    //       path: '',
    //       message: err?.message
    //     }
    //   ]
    }else if (err instanceof Error) {

    }

  
    res.status(statusCode).json({
      success,
      message,
      errorSources,
      // err,
      stack: config.NODE_ENV === 'development' ?  err?.stack : null
      
    })
  }


  export default globarError



  // *** patter ***

  // success
  // message
  // errorSources
  // stack