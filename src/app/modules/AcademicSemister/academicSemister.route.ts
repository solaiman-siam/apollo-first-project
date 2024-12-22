
import express from 'express'
import { AcademicSemisterController } from './academicSemister.controller';
import { validateRequest } from '../../middleware/validateRequest';
import { AcademicSemisterValidations } from './academicSemister.validation';

const router = express.Router()


router.post('/create-academic-semister', validateRequest(AcademicSemisterValidations.createAcademicSemisterValidationSchema),  AcademicSemisterController.createAcademicSemister);
router.get('/all', AcademicSemisterController.getAllAcademicSemister);
router.get('/:semisterId', AcademicSemisterController.getSingleAcademicSemister);
router.put('/:semisterId', AcademicSemisterController.updateSingleAcademicSemister);


export const AcademicSemisterRoute = router;

