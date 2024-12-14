import { NextFunction, Request, Response } from 'express';
import { studentServices } from './student.services';
import { z } from 'zod';
import studentValidationSchema from './student.validation';

const getStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await studentServices.getStudentsFromDB();

    res.status(200).json({
      success: true,
      message: 'Data retrieved successfully',
      data: result,
    });
  } catch (err) {
    next(err)
  }
};

const getSingleStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { studentId } = req.params;
    const result = await studentServices.getSingleStudent(studentId);

    res.status(200).json({
      success: true,
      message: 'Student retrieved Successfully',
      data: result,
    });
  } catch (err) {
    next(err)
  }
};

export const studentControllers = {
  getStudent,
  getSingleStudent,
};
