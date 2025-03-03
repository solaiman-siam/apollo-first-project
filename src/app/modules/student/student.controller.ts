import { NextFunction, Request, RequestHandler, Response } from 'express';
import { studentServices } from './student.services';
import catchAsync from '../../utils/catchAsync';



const getStudent = catchAsync(
  async (req, res) => {

    const result = await studentServices.getStudentsFromDB(req.query);
    res.status(200).json({
      success: true,
      message: 'Data retrieved successfully',
      data: result,
    });
});

const getSingleStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await studentServices.getSingleStudent(studentId );
  res.status(200).json({
    success: true,
    message: 'Student retrieved Successfully',
    data: result,
  });
});
const updateStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const { student } = req.body;
  const result = await studentServices.updateStudentIntoDB(studentId, student);
  res.status(200).json({
    success: true,
    message: 'Student updated Successfully',
    data: result,
  });
});

const deleteStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await studentServices.deleteStudentFromDB(studentId);
  res.status(200).json({
    success: true,
    message: 'Student deleted Successfully',
    data: result,
  });
})

export const studentControllers = {
  getStudent,
  getSingleStudent,
  deleteStudent,
  updateStudent
};
