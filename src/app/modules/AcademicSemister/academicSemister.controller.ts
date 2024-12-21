import catchAsync from "../../utils/catchAsync";



const createAcademicSemister = catchAsync(async (req, res) => {
    const {academicSemister} = req.body;


    res.send({
        success: true,
        data: data ,
        message: ,

    })
});


export const AcademicSemisterController = {
    createAcademicSemister
}