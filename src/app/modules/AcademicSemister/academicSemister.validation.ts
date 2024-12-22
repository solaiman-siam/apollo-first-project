import { z } from "zod";
import { AcademicSemisterName, AcademisterSemisterCode, Months } from "./academicSemister.constant";
import { TAcademicSemisterName } from "./academicSemister.interface";




const createAcademicSemisterValidationSchema = z.object({
    body: z.object( {
        name: z.enum([...AcademicSemisterName] as [string, ...string[]]),
        year: z.string(),
        code: z.enum([...AcademisterSemisterCode] as [string, ...string[]]),
        startMonth: z.enum([...Months] as [string, ...string[]]),
        endMonth: z.enum([...Months] as [string, ...string[]])
    })
})



export const AcademicSemisterValidations = {
    createAcademicSemisterValidationSchema
}