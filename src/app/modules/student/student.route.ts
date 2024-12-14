import express from 'express'
import { studentControllers } from './student.controller'

const router = express.Router()
router.get('/', studentControllers.getStudent)
router.get('/:studentId', studentControllers.getSingleStudent)

export const StudentRoute = router