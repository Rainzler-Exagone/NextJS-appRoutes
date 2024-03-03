import { connect } from "@/dbConfig/dbConfig";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "@/models/userModel";

connect();

export async function POST(request : NextRequest) {
    try {
        const reqBody = await request.json()
        const {email,password} = reqBody

        console.log(reqBody)
        //check if user already exists
       const user = await User.findOne({email})
       if (!user) {
        return NextResponse.json({message : "user doesn't exist"},{status: 400});
       }
       console.log("user exists")

      

       const validPassowrd = await bcryptjs.compare(password,user.password)
       if (!validPassowrd) {
        return NextResponse.json({message : "invalid password"}, {status: 400});
       
       }
       const tokenData = {
        id: user._id,
        username: user.username,
        email: user.email
    }
       const token = await jwt.sign({id : user._id}, process.env.TOKEN_SECRET!, {expiresIn : "1d"})

       const response = NextResponse.json({
        message : "login succefull",
        success:true});

        response.cookies.set("token", token, {
            httpOnly: true,
        })

        return response;

    } catch (error) {
        return NextResponse.json({message : "something went wrong"}, {status: 400});
    }
}