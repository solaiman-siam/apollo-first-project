import catchAsync from "../../utils/catchAsync";
import { AcademicSemisterServices } from "./academicSemister.services";


// get academic semister
const createAcademicSemister = catchAsync(async (req, res) => {
    const result = await AcademicSemisterServices.createAcademicSemisterIntoDB(req.body)
    res.send({
        success: true,
        data: result,
        message:'Academic semister created successfully'

    })
});

// get all academic semister
const getAllAcademicSemister = catchAsync(async (req, res) => {
    const result = await AcademicSemisterServices.getAllAcademicSemister()
    res.send({
        data: result,
        success: true,
        message:'Academic Semisters Retrieve Successfully'

    })
});

// get single academic semister
const getSingleAcademicSemister = catchAsync(async (req, res) => {
    const {semisterId} = req.params;
    const result = await AcademicSemisterServices.getSingleAcademicSemister(semisterId)
    res.send({
        success: true,
        message:'Academic Semister Retrieve Successfully',
        data: result

    })
});

// update single academic semister
const updateSingleAcademicSemister = catchAsync(async (req, res) => {
    const {semisterId} = req.params
    const result = await AcademicSemisterServices.updateSingleAcademicSemister({updatedData: req.body, semisterId: semisterId})
    res.send({
        success: true,
        message:'Academic semister updated successfully',
        data: result

    })
});


export const AcademicSemisterController = {
    createAcademicSemister,
    getAllAcademicSemister,
    getSingleAcademicSemister,
    updateSingleAcademicSemister
}