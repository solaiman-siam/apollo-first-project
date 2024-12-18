import { NextFunction, Request, RequestHandler, Response } from "express";
import { userService } from "./user.services";
import catchAsync from "../../utils/catchAsync";


const createStudent = catchAsync(async (req, res) => {
  const { password,  student: studentData } = req.body;
   
  // will call services
  const result = await userService.createStudentIntoDB(password, studentData);

  // send respon0se
  res.status(200).json({
    success: true,
    message: 'Student Created Successfully',
    data: result,
  });
})

  export const userController = {
    createStudent
  }