
import express from 'express'
import { AcademicSemisterController } from './academicSemister.controller';

const router = express.Router()


router.post('/create-academic-semister', AcademicSemisterController.createAcademicSemister)


export const AcademicSemisterRoute = router;

