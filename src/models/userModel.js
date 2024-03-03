import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        type : String,
        required: true,
        unique: true

    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password : {
        type: String,
        required: true,
    },
    isVerified:{
        type: Boolean,
        default: false,
        required: true,
    },
    isAdmin:{
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
    verifiedToken: String,
    verifiedTokenExpiry: Date,

})
const User = mongoose.models.users || mongoose.model('users', userSchema);

export default User;

