import Joi from "joi";

 // User schema validation
 const userValidationSchema = Joi.object({
    firstName: Joi.string().required().messages({
      'any.required': 'firstName is required',
    }),
    middleName: Joi.string().optional(),
    lastName: Joi.string()
      .max(20)
      .trim()
      .regex(/^[A-Za-z]+$/)
      .required()
      .messages({
        'any.required': 'lastName is required',
        'string.max': 'max chart will be less than 20',
        'string.pattern.base': '{#value} is not valid',
      }),
  });

  // Guardian schema validation
  const guardianValidationSchema = Joi.object({
    fatherName: Joi.string().required().messages({
      'any.required': 'Father name is required',
    }),
    fatherOccupassion: Joi.string().required().messages({
      'any.required': 'Father occupation is required',
    }),
    motherName: Joi.string().required().messages({
      'any.required': 'Mother name is required',
    }),
    motherOccupation: Joi.string().required().messages({
      'any.required': 'Mother occupation is required',
    }),
  });

  // Local Guardian schema validation
  const localGuardianValidationSchema = Joi.object({
    name: Joi.string().required().messages({
      'any.required': 'Local guardian name is required',
    }),
    occupassion: Joi.string().required().messages({
      'any.required': 'Local guardian occupation is required',
    }),
    contactInfo: Joi.string().required().messages({
      'any.required': 'Local guardian contact info is required',
    }),
  });

  // Main Student schema validation
  const studentJoiValidationSchema = Joi.object({
    id: Joi.string().required().messages({
      'any.required': 'Student ID is required',
    }),
    name: userValidationSchema.required().messages({
      'any.required': 'Name is required',
    }),
    email: Joi.string().email().required().messages({
      'any.required': 'Email is required',
      'string.email': '{#value} is not a valid email',
    }),
    gender: Joi.string().valid('male', 'female').required().messages({
      'any.required': 'Gender is required',
      'any.only':
        'Gender value is required and it will be these two types: male, female',
    }),
    dateOfBirth: Joi.string().optional(),
    contactNo: Joi.string().required().messages({
      'any.required': 'Contact number is required',
    }),
    emmergencyContactNo: Joi.string().required().messages({
      'any.required': 'Emergency contact number is required',
    }),
    bloodGroup: Joi.string()
      .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
      .optional()
      .messages({
        'any.only': '{#value} is not a valid blood group',
      }),
    presentAddress: Joi.string().required().messages({
      'any.required': 'Present address is required',
    }),
    parmanentAddress: Joi.string().required().messages({
      'any.required': 'Permanent address is required',
    }),
    gardian: guardianValidationSchema.required().messages({
      'any.required': 'Guardian information is required',
    }),
    localGuardian: localGuardianValidationSchema.required().messages({
      'any.required': 'Local guardian information is required',
    }),
    isActive: Joi.string()
      .valid('active', 'block')
      .default('active')
      .messages({
        'any.only': 'Invalid status value',
      }),
  });


  export default studentJoiValidationSchema;