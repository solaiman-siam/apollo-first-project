
import express from 'express'
import { validateRequest } from '../../middleware/validateRequest'
import { CourseValidation } from './course.validation'
import { CourseController } from './course.controller'

const router = express.Router()  


router.post('/create-course', validateRequest(CourseValidation.createCourseValidationSchema), CourseController.createCourse)
router.patch('/:id', validateRequest(CourseValidation.updateCourseValidationSchema), CourseController.updateCourse)
router.get('/:id', CourseController.getSingleCourse)
router.delete('/:id', CourseController.deleteCourse)
router.get('/', CourseController.getAllCourses)


export const CourseRoutes = router