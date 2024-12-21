import { z } from 'zod';

const userNameValidationSchema = z.object({
  firstName: z.string().nonempty('firstName is required'),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .nonempty('lastName is required')
    .max(20, 'max chart will be less than 20')
    .trim(),
});

const guardianValidationSchema = z.object({
  fatherName: z.string().nonempty('fatherName is required'),
  fatherOccupassion: z.string().nonempty('fatherOccupassion is required'),
  motherName: z.string().nonempty('motherName is required'),
  motherOccupation: z.string().nonempty('motherOccupation is required'),
});

const localGuardianValidationSchema = z.object({
  name: z.string().nonempty('name is required'),
  occupassion: z.string().nonempty('occupassion is required'),
  contactInfo: z.string().nonempty('contactInfo is required'),
});

export const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string(),
    student: z.object({
      name: userNameValidationSchema,
      email: z
        .string()
        .email('{VALUE} is not a valid email')
        .nonempty('email is required'),
      gender: z.enum(['male', 'female', 'other'], {
        errorMap: () => ({ message: 'Gender value must be male or female' }),
      }),
      dateOfBirth: z.date().optional(),
      contactNo: z.string().nonempty('contactNo is required'),
      emmergencyContactNo: z
        .string()
        .nonempty('emmergencyContactNo is required'),
      bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
      presentAddress: z.string().nonempty('presentAddress is required'),
      parmanentAddress: z.string().nonempty('parmanentAddress is required'),
      gardian: guardianValidationSchema,
      localGuardian: localGuardianValidationSchema,
    }),
  }),
});


export const studentValidation =  {
  createStudentValidationSchema
}