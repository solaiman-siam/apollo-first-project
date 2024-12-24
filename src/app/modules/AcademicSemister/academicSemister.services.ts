import { academisSemisterNameCodeMapper } from './academicSemister.constant';
import { TAcademicSemister } from './academicSemister.interface';
import { AcademicSemister } from './academicSemister.model';

// create academic semister
const createAcademicSemisterIntoDB = async (payload: TAcademicSemister) => {
  // check semister code
  if (academisSemisterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error('Invalid semister code!');
  }
  const result = await AcademicSemister.create(payload);
  return result;
};

// get all academic semister
const getAllAcademicSemister = async () => {
  const result = await AcademicSemister.find();
  return result;
};

// get all academic semister
const getSingleAcademicSemister = async (semisterId: string) => {
  const result = await AcademicSemister.findById({ _id: semisterId });
  return result;
};

// get all academic semister
const updateSingleAcademicSemister = async ({
  updatedData,
  semisterId,
}: {
  updatedData: Partial<TAcademicSemister>;
  semisterId: string;
}) => {
  // validate code with semister name
  if (
    updatedData.name &&
    updatedData.code &&
    academisSemisterNameCodeMapper[updatedData.name] !== updatedData.code
  ) {
    throw new Error('Invalid semister code');
  }

  const result = await AcademicSemister.findOneAndUpdate(
    {_id: semisterId},
    updatedData,
    { new: true },
  );
  return result;
};

export const AcademicSemisterServices = {
  createAcademicSemisterIntoDB,
  getAllAcademicSemister,
  getSingleAcademicSemister,
  updateSingleAcademicSemister,
};
