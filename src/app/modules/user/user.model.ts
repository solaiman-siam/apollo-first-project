import { model, Schema } from 'mongoose';
import { TUser } from './user.interface';
import bcrypt, { hash } from 'bcrypt'
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


// userSchema.pre('save', async function (next) {
//   const user = this;

//   if (user.isModified('password')) { // Hash the password only if it has been modified
//       try {
//           user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt_rounds));
//       } catch (err) {
//           return next(err); // Pass any error to the next middleware
//       }
//   }

//   next();
// });



// post save middleware
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next()
})





export const User = model<TUser>('User', userSchema);
