import express, { NextFunction, Request, Response } from 'express';
import { userController } from './user.controller';
import { AnyZodObject, ZodObject } from 'zod';
import { createStudentValidationSchema } from '../student/student.validation';
import { validateRequest } from '../../middleware/validateRequest';




const router = express.Router();

router.post(
  '/create-student',
  validateRequest(createStudentValidationSchema),
  userController.createStudent,
);

export const UserRoutes = router;
