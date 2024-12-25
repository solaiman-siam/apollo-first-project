import catchAsync from "../../utils/catchAsync";
import { TAcademicDepartment } from "./academicDepartment.inferface";
import { AcademicDepartment } from "./academicDepartment.model";




const createAcademicDepartmentFromDb = async (payload : TAcademicDepartment) => {
    const result = await AcademicDepartment.create(payload);
    return result;
};
const getAllAcademicDepartment = async () => {
    const result = await AcademicDepartment.find()
    return result;
};
const getSingleAcademicDepartmentFromDb = async (departmentId: string) => {
    const result = await AcademicDepartment.findById(departmentId)
    return result;
};
const updateAcademicDepartmentFromDb = async (departmentId: string, payload : TAcademicDepartment) => {
    const result = await AcademicDepartment.findById(departmentId , payload, {new: true})
    return result;
};


export const AcademicDepartmentServices = {
    createAcademicDepartmentFromDb,
    getAllAcademicDepartment,
    getSingleAcademicDepartmentFromDb,
    updateAcademicDepartmentFromDb

}