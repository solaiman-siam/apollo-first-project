import { StudentModel } from "../student.model";
import { Student } from "./student.interface";

const createStudentIntoDB = async(student: Student) => {
    const res = await StudentModel.create(student)
    return res
}

const getStudentsFromDB = async () => {
    const res = await StudentModel.find()
    return res
}

const getSingleStudent =  async (studentId: string) => {
    const res = await StudentModel.findOne({id: studentId})
    return res
}

export const studentServices = {
    createStudentIntoDB,
    getStudentsFromDB,
    getSingleStudent
}