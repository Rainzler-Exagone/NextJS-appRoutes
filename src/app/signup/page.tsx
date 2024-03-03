"use client"
import React, { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import axios, { Axios } from "axios"
import toast from "react-hot-toast"
import { Spinner } from '@chakra-ui/react'



export default function SignupPage() {

      const router = useRouter();

    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: "",
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const onSignup = () => {
        try {
            setLoading(true)
            axios.post("/API/users/signup", user)
            console.log("user added succefully")
           router.push("/login")}
        
        catch (error : any) {
            toast.error(error)
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (user.email.length == 0 || user.username.length == 0 || user.password.length == 0) {
            setButtonDisabled(true)
        }
        else {
            setButtonDisabled(false)
        }

    })
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="mb-4">{loading ? <Spinner color="red" size="14"/> : "Sign up"}</h1>
            <hr />
            <label htmlFor="username">username</label>
            <input
                id="username"
                type="text"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                placeholder="username"
                className="text-black w-1/5 p-2 mb-4 rounded-md border-none focus:outline-none focus:border-gray-600"
            />
            <hr />
            <label htmlFor="email">email</label>
            <input
                id="email"
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="email"
                className="text-black w-1/5 p-2 mb-4 rounded-md border-none focus:outline-none focus:border-gray-600"
            />
            <hr />
            <label htmlFor="password">password</label>
            <input
                id="password"
                type="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="password"
                className="text-black w-1/5 p-2 rounded-md border-none focus:outline-none focus:border-gray-600"
            />
            <button onClick={onSignup} className="p-2 mt-8 border rounded-lg mb-4 focus:outline-none focus:border-gray-600 ">{buttonDisabled ? "No Signup" : "Signup"}</button>
            <Link href="/login">visit login page</Link>
        </div>
    )
}