"use client"
import React, { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import axios from "axios"
import toast from "react-hot-toast"
import { Spinner } from '@chakra-ui/react'


export default function LoginPage() {

    const [user, setUser] = useState({
        email: "",
        password: "",
    })

    const router = useRouter()

    const[loading,setLoading] =useState(false)
    const [buttonDisabled,setButtonDisabled] = useState(false)

    const onLogin = async () => {
        try {
            setLoading(true)
             await axios.post("/API/users/login",
             user)
            console.log("Login success")
            router.push("/profile")
            
        } catch (error: any) {
            console.log("Login failed");
            toast.error(error.response.data.toJson())
          
        }finally{
            setLoading(false)
        }
        }
      useEffect(() => {
        if (user.email.length == 0 || user.password.length == 0) {
            setButtonDisabled(true)
        }
        else {
            setButtonDisabled(false)
        }
        
      },[user])
    
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="mb-4">{loading?(<Spinner className="h-20 w-20"/>):"Login"}</h1>
            <hr />
            <label htmlFor="email">email</label>
            <input 
            id="email"
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="Email"
            className="w-1/5 p-2 border-none mb-4 text-black rounded-md focus:outline-none"
            />
             <label htmlFor="password">password</label>
            <input 
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="password"
            className="w-1/5 p-2 border-none mb-4 text-black rounded-md focus:outline-none"
            />
            <button onClick={onLogin} className="text-white p-2 mb-2 rounded-lg border focus:border-gray-600">{buttonDisabled?"No Login" : "Login"}</button>
            <Link href="/signup">dont have account? signup here </Link>
        </div>
    )
}