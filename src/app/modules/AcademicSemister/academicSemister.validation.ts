import { z } from "zod";
import { AcademicSemisterName, AcademisterSemisterCode, Months } from "./academicSemister.constant";


const createAcademicSemisterValidationSchema = z.object({
    body: z.object( {
        name: z.enum([...AcademicSemisterName] as [string, ...string[]]),
        year: z.string(),
        code: z.enum([...AcademisterSemisterCode] as [string, ...string[]]),
        startMonth: z.enum([...Months] as [string, ...string[]]),
        endMonth: z.enum([...Months] as [string, ...string[]])
    })
})
const updateAcademicSemisterValidationSchema = z.object({
    body: z.object( {
        name: z.enum([...AcademicSemisterName] as [string, ...string[]]).optional(),
        year: z.string().optional(),
        code: z.enum([...AcademisterSemisterCode] as [string, ...string[]]).optional(),
        startMonth: z.enum([...Months] as [string, ...string[]]).optional(),
        endMonth: z.enum([...Months] as [string, ...string[]]).optional()
    })
})



export const AcademicSemisterValidations = {
    createAcademicSemisterValidationSchema,
    updateAcademicSemisterValidationSchema
}