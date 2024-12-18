import express, { NextFunction, Request, Response } from 'express';
import { userController } from './user.controller';
import { AnyZodObject, ZodObject } from 'zod';
import { studentValidationSchema } from '../student/student.validation';



const router = express.Router();

const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // validation
      await schema.parseAsync({
        body: req.body
      });
      next();
    } catch (err) {
      next(err);
    }
  };
};

router.post(
  '/create-student',
  validateRequest(studentValidationSchema),
  userController.createStudent,
);

export const UserRoutes = router;
