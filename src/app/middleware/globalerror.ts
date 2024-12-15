import { NextFunction, Request, Response } from "express"


const globarError = (err: any, req: Request, res: Response , next: NextFunction) => {
    const status = 500
    const message =  err.message
  
    res.status(status).json({
      success: false,
      message: message,
      error: err
    })
  }


  export default globarError