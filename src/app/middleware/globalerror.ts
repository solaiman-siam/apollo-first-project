import { ErrorRequestHandler, NextFunction, Request, Response } from "express"
import { ZodError, ZodIssue } from "zod"
import { TErrorSources } from "../interface/error"
import config from "../config"
import { zodErrorHandler } from "../errors/handleZodError"
import { mongooseErrorHandler } from "../errors/handleValidationError"


const globarError : ErrorRequestHandler = (err, req, res, next) => {

    let success = false
    let statusCode = err.statusCode || 500
    let message =  err.message || 'Something went wrong'



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
    }

  
    res.status(statusCode).json({
      success,
      message,
      errorSources,
      stack: config.NODE_ENV === 'development' ?  err?.stack : null
      
    })
  }


  export default globarError



  // *** patter ***

  // success
  // message
  // errorSources
  // stack