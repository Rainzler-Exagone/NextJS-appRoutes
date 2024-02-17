import { verify } from 'crypto';
import mongoose from 'mongoose'
import { unique } from 'next/dist/build/utils';
import { type } from 'os';

const userSchema = mongoose.Schema({
    username : {
        type: String,
        required: true ['please provide a username'],
        unique:true
    },
    email : {
        type: String,
        required: true ['please provide a email'],
        unique:true
    },
    password : {
        type: String,
        required: true ['please provide a password'],
        unique:true
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    forgotPasswordToken:String,
    forgotPasswordTokenExpiry:Date,
    verifyToken:String,
    verifyTokenExpiry:Date,


})

const User  = mongoose.models.users || mongoose.model('User', userSchema);

export default User