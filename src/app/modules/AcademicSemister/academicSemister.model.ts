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
      type: String,
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


AcademicSemisterSchema.pre('save', async function (next) {

    const isSemisterExists = await AcademicSemister.findOne({
      year: this.year,
      name: this.name
    })

    if(isSemisterExists) {
      throw new Error('Semister is already exists')
    }
    next();
})

export const AcademicSemister = model<TAcademicSemister>(
  'AcademicSemister',
  AcademicSemisterSchema,
);
