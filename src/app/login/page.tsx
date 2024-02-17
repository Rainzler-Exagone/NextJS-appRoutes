"use client"
import React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { axios } from "axios"


export default function LoginPage() {

    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: "",
    })

    const onLogin = async () => {

    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="mb-4">Login</h1>
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
            <button className="text-white p-2 mb-2 rounded-lg border focus:border-gray-600">Login</button>
            <Link href="/signup">don't have account? signup here </Link>
        </div>
    )
}