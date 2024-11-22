import { Schema, model, connect } from 'mongoose';
import { Guardian, LocalGuardian, Student, UserName } from './student/student.interface';


const userSchema = new Schema<UserName>({
    firstName: {type: String, required: true},
    middleName: {type: String},
    lastName: {type: String, required: true}
})

const guardianSchema = new Schema<Guardian>({
    fatherName: {type: String, required: true},
    fatherOccupassion: {type: String, required: true},
    motherName: {type: String, required: true},
    motherOccupation: {type: String, required: true}
})

const localGuardianSchema = new Schema<LocalGuardian>({
    name: {type: String, required: true},
    occupassion: {type: String, required: true},
    contactInfo: {type: String, required: true}
})

const studentSchema = new Schema<Student>({
    id: {type: String, required: true},
    name: userSchema,
    email: {type: String, required: true},
    gender: ['male', 'female'],
    dateOfBirth: {type: String},
    contactNo: {type: String, required: true},
    emmergencyContactNo: {type: String, required: true},
    bloodGroup: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    presentAddress: {type: String, required: true},
    parmanentAddress: {type: String, required: true},
    gardian: guardianSchema,
    localGuardian: localGuardianSchema,
    isActive: ['active', 'block']
})


export const StudentModel = model<Student>('Student', studentSchema)