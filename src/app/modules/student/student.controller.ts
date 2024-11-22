import { Request, Response } from 'express';
import { studentServices } from './student.services';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;
    // will call services
    const result = await studentServices.createStudentIntoDB(studentData);

    // send respon0se
    res.status(200).json({
      success: true,
      message: 'Student Created Successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

const getStudent = async ( req: Request, res: Response) => {
    try{
        const result = await studentServices.getStudentsFromDB()

        res.status(200).json({
            success: true,
            message: 'Data retrieved successfully',
            data: result

        })
    }catch(err) {
        console.log(err);
    }
}

const getSingleStudent = async (req: Request, res: Response) => {
    try{
        const {studentId} = req.params
        const result = await studentServices.getSingleStudent(studentId)

        res.status(200).json({
            success: true,
            message: 'Student retrieved Successfully',
            data: result
        })

    }catch(err) {
        console.log(err);
    }
}

export const studentControllers = {
  createStudent,
  getStudent,
  getSingleStudent
};
