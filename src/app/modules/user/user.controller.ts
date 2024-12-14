import { NextFunction, Request, Response } from "express";
import { userService } from "./user.services";


const createStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {

      const { password,  student: studentData } = req.body;
  
  
        // const zodParseData =  studentValidationSchema.parse(studentData)
  
      // const {error, value} = studentValidationSchema.validate(studentData)


      // will call services
      const result = await userService.createStudentIntoDB(password, studentData);
  
      // send respon0se
      res.status(200).json({
        success: true,
        message: 'Student Created Successfully',
        data: result,
      });
    } catch (err) {
      next(err)
    }
  };

  export const userController = {
    createStudent
  }