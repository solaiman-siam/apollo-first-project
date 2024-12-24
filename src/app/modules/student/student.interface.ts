import { Schema, model, connect, Model, Types } from 'mongoose';
import { Url } from 'url';

export type TGuardian = {
  fatherName: string;
  fatherOccupassion: string;
  motherName: string;
  motherOccupation: string;
};

export type TUserName = {
  firstName: string;
  middleName?: string;
  lastName: string; 
};

type BloodGroup = "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";

export type TLocalGuardian= {
  name: string;
  occupassion: string;
  contactInfo: string;
}

export type TStudent = {
  id: string;
  user: Types.ObjectId
  password: string;
  name: TUserName;
  email: string;
  gender: string;
  dateOfBirth?: Date;
  contactNo: string;
  emmergencyContactNo: string;
  bloodGroup?: BloodGroup;
  presentAddress: string;
  parmanentAddress: string;
  addmissionSemister: Types.ObjectId;
  gardian: TGuardian;
  localGuardian: TLocalGuardian;
  profileImage? : string;
};


// for statics

export interface StudentModel extends Model<TStudent> {
  isUserExists(id: string): Promise<TStudent | null>
}



// for intance
// export type StudentMethods = {
//   isUserExists(id: string): Promise<TStudent | null>
// }



// export type StudentModel = Model<TStudent, {}, StudentMethods>;