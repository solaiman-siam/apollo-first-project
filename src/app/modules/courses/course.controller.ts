import catchAsync from "../../utils/catchAsync";
import { CourseServices } from "./course.services";


const createCourse = catchAsync(async (req, res) => {
    const result = await CourseServices.createCourseIntoDB(req.body)

    res.send({
        success: true,
        message: 'Course created Successfully',
        data: result,
      });
})


const getAllCourses = catchAsync(async (req, res) => {

    const result = await CourseServices.getAllCoursesFromDB()

    res.send({
        succcess: true,
        message: 'Courses retrieve successfully',
        data: result
    })
})


const getSingleCourse = catchAsync(async (req, res) => {
    const {id} = req.params
    const result  = await CourseServices.getSingleCourseFromDB(id)

    res.send({
        success: true,
        message: 'Course retrieve successfully',
        data: result
    })
})


const deleteCourse = catchAsync(async (req, res) => {
    const {id} = req.params
    const result = await CourseServices.deleteCourseIntoDB(id)

    res.send({
        success: true,
        message: 'Course deleted successfully',
        data: result
    })
})


export const CourseController = {
    createCourse,
    getAllCourses,
    getSingleCourse,
    deleteCourse

}