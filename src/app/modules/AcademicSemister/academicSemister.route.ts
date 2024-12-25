
import express from 'express'

import { validateRequest } from '../../middleware/validateRequest';
import { AcademicSemisterController } from './academicSemister.controller';
import { AcademicSemisterValidations } from './academicSemister.validation';


const router = express.Router()


router.post('/create-academic-semister', validateRequest(AcademicSemisterValidations.createAcademicSemisterValidationSchema),  AcademicSemisterController.createAcademicSemister);
router.get('/all', AcademicSemisterController.getAllAcademicSemister);
router.get('/:semisterId', AcademicSemisterController.getSingleAcademicSemister);
router.patch('/:semisterId', validateRequest(AcademicSemisterValidations.updateAcademicSemisterValidationSchema),  AcademicSemisterController.updateSingleAcademicSemister);


export const AcademicSemisterRoute = router;

