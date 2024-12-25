import { Request } from "express";
import catchAsync from "../../utils/catchAsync";
import { AcademicFacultyServices } from "./academicFaculty.service";


const createAcademicFaculty = catchAsync(async (req, res) => {
    const result = await AcademicFacultyServices.createAcademicFacultyIntoDB(req.body)
    res.send({
        success: true,
        message: 'Academic faculty created successfully',
        data: result
    });
});



const getAllAcademicFaculties = catchAsync(async (req, res) => {
    const result = await AcademicFacultyServices.getAllAcademicFaculty()
    res.send({
        success: true,
        message: 'Academic faculties retrieve successfully',
        data: result
    });
})

const getSingleAcademicFaculty = catchAsync(async (req, res) => {
    const {facultyId} = req.params;
    const result = await AcademicFacultyServices.getSingleAcademicFaculty(facultyId)
    res.send({
        success: true,
        message: 'Academic faculty retrieve successfully',
        data: result
    });
})


const updateAcademicFaculty = catchAsync(async (req : Request, res) => {
    const {facultyId} = req.params;
    const result = await AcademicFacultyServices.getSingleAcademicFacultyAndUpdate( req.body, facultyId)
    res.send({
        success: true,
        message: 'Academic faculty updated successfully',
        data: result
    });
})


export const AcademicFacultyControllers = {
    createAcademicFaculty,
    getAllAcademicFaculties,
    getSingleAcademicFaculty,
    updateAcademicFaculty
}