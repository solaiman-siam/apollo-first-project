import express from 'express'
import { studentControllers } from './student.controller'
import { validateRequest } from '../../middleware/validateRequest'
import { studentValidation } from './student.validation'

const router = express.Router()
router.delete('/:studentId', studentControllers.deleteStudent)
router.patch('/:studentId', validateRequest(studentValidation.updateStudentValidationSchema), studentControllers.updateStudent)
router.get('/', studentControllers.getStudent)
router.get('/:studentId', studentControllers.getSingleStudent)

export const StudentRoute = router 