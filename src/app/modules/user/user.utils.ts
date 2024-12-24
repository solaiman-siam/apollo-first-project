import { TAcademicSemister } from "../academicSemister/academicSemister.interface";
import { User } from "./user.model";





    const findLastStudent = async () => {
        const lastStudent = await User.findOne({
            role: 'student'
        },{
            id: 1,
            _id: 0
        })
        .sort({
            createdAt: -1
        })
        .lean();

       return lastStudent?.id ? lastStudent.id.substring(6) : undefined


    }

    

    // year semister code 4digit number
    export const generateStudentId  =  async (payload: TAcademicSemister) => {

        let currentId = (0).toString();

        const lastStudentId = await findLastStudent()


        const lastStudentSemisterCode = lastStudentId?.substring(4, 6)
        const lastStudentSemisterYear = lastStudentId?.substring(0, 4)
        const currentSemisterCode = payload.code;
        const currentSemisterYear = payload.year


        if(lastStudentId && lastStudentSemisterCode === currentSemisterCode && lastStudentSemisterYear === currentSemisterYear ) {
            currentId = lastStudentId?.substring(6)
        }


        let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

        incrementId = `${payload.year}${payload.code}${incrementId} `

        return incrementId;
    };