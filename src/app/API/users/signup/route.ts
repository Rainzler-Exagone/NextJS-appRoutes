import User from "@/models/userModel";
import { NextRequest,NextResponse } from "next/server";
import axios from "axios";
import { connect } from "@/dbConfig/dbConfig";
import bcryptjs from "bcryptjs";

connect()
console.log("connected to "+ process.env.MONGO_URI)

export default async function POST (request : NextRequest){
 try {
    
    const reqBody = await request.json();
    const {username , email , password } = reqBody
    console.log(reqBody)
    //check user 
    const user = await User.findOne({email})
    if(user){
        return NextResponse.json({error : "user already exists"}, { status: 400})
    }
    
    //hash the password
    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password, salt)

   const newUser = new User({username , email , password : hashedPassword})
   const savedUser = await newUser.save()

   return NextResponse.json({
    message : "User created successfully",
        savedUser

   })

 } catch (error: any) {
    console.log(error)
    return NextResponse.json({error : error.message},{ status: 500})
 }

}


