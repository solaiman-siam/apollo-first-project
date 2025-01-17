import mongoose from 'mongoose';
import config from '../../config';
import { TAcademicSemister } from '../academicSemister/academicSemister.interface';
import { AcademicSemister } from '../academicSemister/academicSemister.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
    const userData: Partial<TUser> = {};
  
    userData.password = password || (config.default_pass as string);
    userData.role = 'student';
  
    const admissionSemester = await AcademicSemister.findById(payload.addmissionSemister);
  
    if (!admissionSemester) {
      throw new Error('Invalid admission semester');
    }
  
    const session = await mongoose.startSession();
  
    try {
      session.startTransaction();
  
      userData.id = await generateStudentId(admissionSemester);
  
      const newUser = await User.insertMany([userData], { session });
      if (!newUser.length) {
        throw new Error('Failed to create new user');
      }
  
      payload.id = newUser[0].id;
      payload.user = newUser[0]._id;
  
      const newStudent = await Student.insertMany([payload], { session });
      if (!newStudent.length) {
        throw new Error('Failed to create student');
      }
  
      await session.commitTransaction();
      await session.endSession();
      return newStudent;
    } catch (error) {
      await session.abortTransaction();
      await session.endSession();
      throw new Error('Failed to create User');  // Ensures errors are reported
      
    }
  };
  

export const userService = {
  createStudentIntoDB,
};
