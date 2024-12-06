import { Student } from "./student.model";
import { TStudent } from "./student.interface";

const createStudentIntoDB = async(studentData: TStudent) => {


    
    if(await Student.isUserExists(studentData.id)) {
        throw new Error('User Already Exists')
    }

    

    const result = await Student.create(studentData)


  

    // const student = new Student(studentData)


    // if( await student.isUserExists(studentData.id)) {
    //    throw new Error('User Already Exists')
    // }


    // const result = await student.save()

    return result
}

const getStudentsFromDB = async () => {
    const res = await Student.find()
    return res
}

const getSingleStudent =  async (studentId: string) => {
    const res = await Student.findOne({id: studentId})
    return res
}

export const studentServices = {
    createStudentIntoDB,
    getStudentsFromDB,
    getSingleStudent
}