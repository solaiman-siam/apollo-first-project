import config from "../../config"
import { TStudent } from "../student/student.interface"
import { Student } from "../student/student.model"
import { TUser } from "./user.interface"
import { User } from "./user.model"

const createStudentIntoDB = async(password : string, studentData: TStudent) => {

    const userData: Partial<TUser> = {}

    // if not password set default password
    userData.password = password || ( config.default_pass as string)

    // set student role
    userData.role = 'student'
    userData.id = '2041304102'

    // create a user
    const newUser = await User.create(userData)


    // create a student
    if(Object.keys(newUser).length > 0) {
        console.log(newUser);
        console.log(userData);
        studentData.id = newUser.id 
        studentData.user = newUser._id // ref id

        console.log('student data',studentData);
        const newStudent = await Student.create(studentData)
        console.log('newStudent', newStudent);
        return newStudent
    }
    
}

export const userService = {
    createStudentIntoDB
}