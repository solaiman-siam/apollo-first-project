import { Student } from "./student.model";
import { TStudent } from "./student.interface";
import mongoose from "mongoose";
import { User } from "../user/user.model";
import QueryBuilder from "../../builder/QueryBuilder";
import { searchableFields } from "./student.constant";



const getStudentsFromDB = async (query : Record<string, unknown>) => {

    // console.log('filed', query);



    // let searchTerm  = '' 

    // if(query?.searchTerm) {
    //     searchTerm = query.searchTerm  as string    
    // }

    // const excludeFields = ['searchTerm', "sort", "limit", "page", 'fields']

    // const mutateQuery = {...query}

    // excludeFields.forEach(el => delete mutateQuery[el])

    // const searchQuery = Student.find({
    //     $or: ['name.firstName', 'presentAddress', 'email'].map((field) => ({
    //         [field] : {$regex: searchTerm, $options: 'i'}
    //     }))
    // })

    // const filterQuery = searchQuery.find(mutateQuery).populate({ path: 'academicDepartment', populate: {path: 'academicFaculty'}}).populate('addmissionSemister')

    // let sort = '-createdAt'

    // if(query.sort) {
    //     sort = query.sort as string
    // }

    // const sortQuery = filterQuery.sort(sort)


    // let limit = 10
    // let page = 1
    // let skip = 0

    // if(query.page) {
    //     page = Number(query.page)
    // }

    // if(query.limit) {
    //     limit = Number(query.limit) 
    //     skip = (page - 1) * limit
    // }

    // let fields = '__v'

    // if(query.fields){
    //     fields = (query.fields as string).split(',').join(' ')
    // }


    // const paginateQuery = sortQuery.skip(skip)

    // const limitQuery =  paginateQuery.limit(limit)


    // const fieldsQuery = await limitQuery.select(fields)

    // return fieldsQuery

    const studentQuery = new QueryBuilder(Student.find().populate({ path: 'academicDepartment', populate: {path: 'academicFaculty'}}).populate('addmissionSemister'), query).search(searchableFields).filter().sort().paginate().fields()

    const result = await studentQuery.modelQuery

    return result



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