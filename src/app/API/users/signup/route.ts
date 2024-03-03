import { connect } from "@/dbConfig/dbConfig";
import mongoose from "mongoose";
import User from "@/models/userModel";
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from "bcryptjs";






connect()

export async function POST(request :NextRequest){
    try {
       const reqBody = await request.json()
       const {username,email,password} = reqBody

       console.log(reqBody)

       //check if user already exists
       const user = await User.findOne({email})


       if(user){
        return NextResponse.json({message:"User already exists"}, {status:400})
       }

       //hash password
       const salt = await bcryptjs.genSalt(10)
       const hashedPassword = await bcryptjs.hash(password,salt)

      const newUser =  new User({
        username,
        email,
        password:hashedPassword
       })
        //maybe the error is here
      const savedUser = await newUser.save()
      console.log(savedUser);

      return NextResponse.json(
        savedUser,
         {status:201})

      
    } catch (error : any) {
      return NextResponse.json({message:error.message},{status:500})  
    }
}

