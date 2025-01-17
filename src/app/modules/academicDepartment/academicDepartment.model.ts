import { model, Schema } from 'mongoose';
import { TAcademicDepartment } from './academicDepartment.inferface';

const academicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
    },
  },
  { timestamps: true },
);

academicDepartmentSchema.pre('save', async function (next) {
  const isDepartmentExist = await AcademicDepartment.find({ name: this.name });

  if (isDepartmentExist) {
    throw new Error('Department is already exists');
  }

  next();
});

// query

academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();

  const departmentExists = await AcademicDepartment.exists(query);
  if (!departmentExists) {
    throw new Error('Academic Department does not exist.');
  }

  next();
});

export const AcademicDepartment = model<TAcademicDepartment>(
  'AcademicDepartment',
  academicDepartmentSchema,
);
