import { Schema, model, connect } from 'mongoose';
import { TGuardian, TLocalGuardian, TStudent, StudentMethods,TUserName, StudentModel } from './student.interface';
import validator from 'validator';
import bcrypt from 'bcrypt'
import config from '../../config';

const userSchema = new Schema<TUserName>({
    firstName: {type: String, required: [true, 'firstName is required']},
    middleName: {type: String},
    lastName: {
        type: String, 
        required: [true, 'lastName is required'],
        max: [20, 'max chart will be less than 20'],
        trim: true,
    }
    }
)

const guardianSchema = new Schema<TGuardian>({
    fatherName: {type: String, required: true},
    fatherOccupassion: {type: String, required: true},
    motherName: {type: String, required: true},
    motherOccupation: {type: String, required: true}
})

const localGuardianSchema = new Schema<TLocalGuardian>({
    name: {type: String, required: true},
    occupassion: {type: String, required: true},
    contactInfo: {type: String, required: true}
})

const studentSchema = new Schema<TStudent , StudentModel>({
    id: {type: String, required: true, unique: true },
    password: {type: String, required: true, max: [20, 'less than 20 chart']},
    name: {
        type: userSchema,
        required: [true, '']
    },
    email: {type: String, required: true, validate: {validator: (value) => validator.isEmail(value), message: '{VALUE} is not valid email' }},
    gender: {
        type: String,
        enum: {
            values: ['male', 'female'],
            message: `{VALUE} Gender value is required and it will be these two types value male, female`
        },
        required: true
    },
    dateOfBirth: {type: String},
    contactNo: {type: String, required: true},
    emmergencyContactNo: {type: String, required: true},
    bloodGroup: {
        type: String,
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
    },
    presentAddress: {type: String, required: true},
    parmanentAddress: {type: String, required: true},
    gardian: {
        type: guardianSchema,
        required: true
    },
    localGuardian: {
        type: localGuardianSchema,
        required: true
    },
    isActive: {type: String, enum: ['active', 'block'], default: 'active'}
})


studentSchema.statics.isUserExists = async function (id: string) {
    const existingUser = await Student.findOne({id})
    
}

studentSchema.pre('save', async function (next) {
    const user = this
    user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt_rounds),);
    next()
})

// studentSchema.post('save', function () {
//     console.log( this, 'we saved the data');
// })

// studentSchema.methods.isUserExists = async function (id: string) {
//     const existingUser = await Student.findOne({id})

//     return existingUser;
// }

export const Student = model<TStudent, StudentModel>('Student', studentSchema)




