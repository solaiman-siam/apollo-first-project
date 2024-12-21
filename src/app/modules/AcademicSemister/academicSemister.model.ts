import { model, Schema } from 'mongoose';

import { AcademicSemisterName, AcademisterSemisterCode, Months } from './academicSemister.constant';
import { TAcademicSemister } from './academicSemister.interface';
const AcademicSemisterSchema = new Schema<TAcademicSemister>(
  {
    name: {
      type: String,
      required: true,
      enum: AcademicSemisterName
    },
    code: {
      type: String,
      required: true,
      enum: AcademisterSemisterCode
    },
    year: {
      type: Date,
      required: true,
    },
    startMonth: {
      type: String,
      required: true,
      enum: Months,
    },
    endMonth: {
      type: String,
      required: true,
      enum: Months,
    },
  },
  { timestamps: true },
);

export const AcademicSemister = model<TAcademicSemister>(
  'AcademicSemister',
  AcademicSemisterSchema,
);
