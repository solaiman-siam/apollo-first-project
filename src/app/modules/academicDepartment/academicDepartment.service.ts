import { TAcademicDepartment } from "./academicDepartment.inferface";
import { AcademicDepartment } from "./academicDepartment.model";




const createAcademicDepartmentFromDb = async (payload : TAcademicDepartment) => {


    // const isDepartmentExist = await AcademicDepartment.findOne({ name: payload.name});

    // if(isDepartmentExist) {
    //     throw new Error('Department is already exist')
    // }

    const result = await AcademicDepartment.create(payload);
    return result;
};
const getAllAcademicDepartment = async () => {
    const result = await AcademicDepartment.find().populate('academicFaculty')
    return result;
};
const getSingleAcademicDepartmentFromDb = async (departmentId: string) => {
    const result = await AcademicDepartment.findById(departmentId).populate('academicFaculty')
    return result;
};
const updateAcademicDepartmentFromDb = async (departmentId: string, payload : TAcademicDepartment) => {
    const result = await AcademicDepartment.findByIdAndUpdate(departmentId , payload, {new: true})
    return result;
};


export const AcademicDepartmentServices = {
    createAcademicDepartmentFromDb,
    getAllAcademicDepartment,
    getSingleAcademicDepartmentFromDb,
    updateAcademicDepartmentFromDb

}