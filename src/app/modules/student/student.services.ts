import { Student } from "./student.model";
import { TStudent } from "./student.interface";
import mongoose from "mongoose";
import { User } from "../user/user.model";



const getStudentsFromDB = async () => {
    const res = await Student.find().populate({ path: 'academicDepartment', populate: {path: 'academicFaculty'}}).populate('addmissionSemister')
    return res
}

const getSingleStudent =  async (studentId: string) => {
    const res = await Student.findOne({id: studentId}).populate({ path: 'academicDepartment', populate: {path: 'academicFaculty'}}).populate('addmissionSemister')
    return res
}

const updateStudentIntoDB =  async (studentId: string , payload: Partial<TStudent>) => {

    const {name, gardian, localGuardian, ...remainingStudentData} = payload

    const modifiedStudentData: Record<string, unknown> = {remainingStudentData} 


    if(name && Object.keys(name).length) {
        for (const [key, value] of Object.entries(name)) {
            modifiedStudentData[`name.${key}`] = value
        } 
    }

    if(gardian && Object.keys(gardian).length) {
        for (const [key, value] of Object.entries(gardian)) {
            modifiedStudentData[`gardian.${key}`] = value
        } 
    }

    if(localGuardian && Object.keys(localGuardian).length) {
        for (const [key, value] of Object.entries(localGuardian)) {
            modifiedStudentData[`localGuardian.${key}`] = value
        } 
    }

    const res = await Student.findOneAndUpdate({id: studentId} , modifiedStudentData, {new: true, runValidators: true})
    return res
}


const deleteStudentFromDB =  async (studentId: string) => {
    const session = await mongoose.startSession()
    try {

        session.startTransaction()
        const deletedStudent = await Student.findOneAndUpdate({id: studentId}, {isDeleted: true} , {new: true, session});

        if(!deletedStudent) {
            throw new Error('Failed to delete Student')
        }

        const deletedUser = await User.findOneAndUpdate({id: studentId} , {isDeleted: true}, {new: true, session});

        if(!deletedUser) {
            throw new Error('Failed to delete User')
        }

        await session.commitTransaction();
        await session.endSession();
        return deletedStudent


    } catch (error) {
        await session.abortTransaction()
        await session.endSession()
        throw new Error('Failed to create Student'); 
        
    }

    
}

export const studentServices = {
    getStudentsFromDB,
    getSingleStudent,
    deleteStudentFromDB,
    updateStudentIntoDB
}