import { Response } from "express";


type TRes<T> = {data: T, statusCode: number, success: boolean , message?: string }

const sendRes = <T>(res: Response, data: TRes<T>) => {

    res.status(data?.statusCode).json({
        success: data.success,
        message: data.message,
        data: data.data
    })
}