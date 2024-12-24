import config from "../../config"
import { TAcademicSemister } from "../academicSemister/academicSemister.interface"
import { AcademicSemister } from "../academicSemister/academicSemister.model"
import { TStudent } from "../student/student.interface"
import { Student } from "../student/student.model"
import { TUser } from "./user.interface"
import { User } from "./user.model"
import { generateStudentId } from "./user.utils"

const createStudentIntoDB = async (password : string, studentData: TStudent) => {

    const userData: Partial<TUser> = {}

    // if not password set default password
    userData.password = password || ( config.default_pass as string)

    // set student role
    userData.role = 'student'


    const academicSemister = await AcademicSemister.findById(studentData.addmissionSemister)


    // set generated id
    userData.id = await generateStudentId(academicSemister)

    // create a user
    const newUser = await User.create(userData)


    // create a student
    if(Object.keys(newUser).length > 0) {
   
        studentData.id = newUser.id 
        studentData.user = newUser._id // ref id

        const newStudent = await Student.create(studentData)
        return newStudent
    }
}

export const userService = {
    createStudentIntoDB
}