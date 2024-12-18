import { NextFunction, Request, RequestHandler, Response } from 'express';
import { studentServices } from './student.services';
import catchAsync from '../../utils/catchAsync';



const getStudent = catchAsync(
  async (req, res) => {
    const result = await studentServices.getStudentsFromDB();
    res.status(200).json({
      success: true,
      message: 'Data retrieved successfully',
      data: result,
    });
})

const getSingleStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await studentServices.getSingleStudent(studentId);
  res.status(200).json({
    success: true,
    message: 'Student retrieved Successfully',
    data: result,
  });
})

export const studentControllers = {
  getStudent,
  getSingleStudent,
};
