"use client"

import Login from '@/components/page/Login'
import Register from '@/components/page/Register'
import React, { useState } from 'react'

const page = () => {

    const [authType, setAuthType] = useState<"login" | "register">("login")

    return (
        <div className='py-[4vw]'>
            {authType === "login" ? (
                <Login changeType={() => setAuthType("register")} />
            ) : (
                <Register changeType={() => setAuthType("login")} />
            )}
        </div>
    )
}

export default page