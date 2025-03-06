import { model, Schema } from "mongoose";
import { preRequisiteCourses, TCourse } from "./course.interface";


const preRequisiteCoursesSchema = new Schema<preRequisiteCourses>({
    course : {
        type: Schema.ObjectId,
        ref: "Course"
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
})

const courseSchema = new Schema<TCourse>({
        title: {
            type: String,
            unique: true,
            trim: true
        },
        prefix: {
            type: String,
            trim: true,
            required: true
        },
        code: {
            type: Number,
            required: true,
            trim: true
        },
        credits: {
            type: Number,
            required: true,
            trim: true
        },
        preRequisiteCourses: [preRequisiteCoursesSchema],
        isDeleted: {
            type: Boolean,
            default: false
        }
})


export const Course = model<TCourse>('Course', courseSchema)

