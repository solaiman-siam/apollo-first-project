import { Student } from "./student.model";
import { TStudent } from "./student.interface";



const getStudentsFromDB = async () => {
    const res = await Student.find()
    return res
}

const getSingleStudent =  async (studentId: string) => {
    const res = await Student.findOne({id: studentId})
    return res
}

export const studentServices = {
    getStudentsFromDB,
    getSingleStudent
}