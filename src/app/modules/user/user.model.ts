import { model, Schema } from 'mongoose';
import { TUser } from './user.interface';
import bcrypt from 'bcrypt'
import config from '../../config';
const userSchema = new Schema<TUser>(
  {
    id: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['student', 'faculty', 'admin'],
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress'
    },
    password: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);



userSchema.pre('save', async function (next) {
  const user = this
  user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt_rounds),);
  next()
})


export const User = model<TUser>('User', userSchema);
