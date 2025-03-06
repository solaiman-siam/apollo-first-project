import { Types } from "mongoose"


export type preRequisiteCourses = {
    course: Types.ObjectId,
    isDeleted: boolean
}

export type TCourse = {
    title: string,
    prefix: string,
    code: number,
    credits: number,
    preRequisiteCourses: preRequisiteCourses,
    isDeleted?: boolean
}