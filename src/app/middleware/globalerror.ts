import { ErrorRequestHandler, NextFunction, Request, Response } from "express"
import { ZodError, ZodIssue } from "zod"
import { TErrorSources } from "../interface/error"
import config from "../config"


const globarError : ErrorRequestHandler = (err, req, res, next) => {

    let success = false
    let statusCode = err.statusCode || 500
    let message =  err.message || 'Something went wrong'



    let errorSources : TErrorSources = [{
      path: '',
      message: 'Something went wrong'
    }]


    const zodErrorHandler = (err: ZodError) => {

      const status = 400

      const errorSources : TErrorSources = err.issues.map((issue : ZodIssue) => { 
        return { 
        path: issue?.path[issue.path.length - 1],
        message: issue?.message
      } 
    })


      return {
        statusCode,
        message: 'Zod Validation Error',
        errorSources,

      }
    }

    

    if(err instanceof ZodError) {
      const simplifiedError = zodErrorHandler(err)
      statusCode = simplifiedError?.statusCode,
      message = simplifiedError?.message,
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