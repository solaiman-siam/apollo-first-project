import { TAcademicFaculty } from "./academicFaculty.interface";
import { AcademicFaculty } from "./academicFaculty.mode";


// create
const createAcademicFacultyIntoDB = async (payload : TAcademicFaculty) => {

    const result = await AcademicFaculty.create(payload)
    return result;

}

// get all
const getAllAcademicFaculty = async () => {
    const result = await AcademicFaculty.find()
    return result;

}
// get single
const getSingleAcademicFaculty = async (facultyId: string) => {
    const result = await AcademicFaculty.findById({_id: facultyId})
    return result;

}
// update one
const getSingleAcademicFacultyAndUpdate = async ( payload: Partial<TAcademicFaculty> ,  facultyId: string) => {
    const result = await AcademicFaculty.findByIdAndUpdate({_id: facultyId}, payload , {
        new: true
    })
    return result;

}





export const academicFacultyServices = {
    createAcademicFacultyIntoDB,
    getAllAcademicFaculty,
    getSingleAcademicFaculty,
    getSingleAcademicFacultyAndUpdate
}