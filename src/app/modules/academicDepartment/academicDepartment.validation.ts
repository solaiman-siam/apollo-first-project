import { string, z } from "zod";




const createAcademicDepartmentValidationSchema = z.object({
    body: z.object({
        name: string({invalid_type_error: 'Academic department must be string' , required_error: 'Academic Department must need'}),
        academicFaculty: string({invalid_type_error: 'Academic faculty must be string' , required_error: 'Academic faculty required'})
    })
})
const updateAcademicDepartmentValidationSchema = z.object({
    body: z.object({
        name: string({invalid_type_error: 'Academic department must be string' , required_error: 'Academic Department must need'}).optional(),
        academicFaculty: string({invalid_type_error: 'Academic faculty must be string' , required_error: 'Academic faculty required'}).optional()
    })
})

export const AcademicDepartmentValidations= {
    createAcademicDepartmentValidationSchema,
    updateAcademicDepartmentValidationSchema
}