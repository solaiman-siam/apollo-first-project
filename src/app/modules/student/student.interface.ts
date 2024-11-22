import { Schema, model, connect } from 'mongoose';
import { Url } from 'url';

export type Guardian = {
  fatherName: string;
  fatherOccupassion: string;
  motherName: string;
  motherOccupation: string;
};

export type UserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type LocalGuardian= {
  name: string;
  occupassion: string;
  contactInfo: string;
}

export type Student = {
  id: string;
  name: UserName;
  email: string;
  gender: string;
  dateOfBirth: string;
  contactNo: string;
  emmergencyContactNo: string;
  bloodGroup: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  presentAddress: string;
  parmanentAddress: string;
  gardian: Guardian;
  localGuardian: LocalGuardian;
  profileImage? : string;
  isActive: 'active' | 'block'
};
