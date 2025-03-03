import mongoose from "mongoose";
import { TErrorReturn, TErrorSources } from "../interface/error";



export const castErrorHandler = (err : mongoose.Error.CastError) : TErrorReturn => {
    
    const errorSources : TErrorSources = [{
        path: err?.path,
        message: err?.message

    }]
    const statusCode = 400


    return {
        statusCode,
        message: 'Cast Error',
        errorSources
    }

}