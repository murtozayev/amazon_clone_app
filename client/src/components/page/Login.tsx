"use client"
import Image from 'next/image'
import React, { MouseEventHandler, useState } from 'react'
import { Input } from '../ui/input'
import { Label } from '@radix-ui/react-label'
import { Button } from '../ui/button'
import { Eye, EyeClosed } from 'lucide-react'

const Login = ({changeType}: {changeType: MouseEventHandler<HTMLElement>}) => {

    const [type, setType] = useState<"password" | "text">("password")

    return (
        <section className='flex justify-between'>
            <Image
                src="/icons/login.png"
                alt="Login"
                width={500}
                height={500}
                className='w-[40vw]'
                priority
            />

            <form className='w-[40vw]'>
                <h1 className='text-[3.5vw] text-[#4B3EC4] font-bold'>Ko'rib turganimdan xursandman</h1>
                <h2 className='text-[1.5vw] text-slate-500 font-light'>Davom etish uchun tizimga kiring</h2>
                <br />
                <Label className='text-[1.2vw]'>Emailinggizni kiriting</Label>
                <Input className='!text-[1.2vw] h-[3vw] !border-[#4B3EC4] placeholder:text-[1.2vw]' placeholder='user@example.com' type='email' />
                <br />
                <br />
                <Label className='text-[1.2vw]'>Parolni kiriting</Label>
                <div className='relative'>
                    <Input placeholder='********' className='!text-[1.2vw] !border-[#4B3EC4] placeholder:text-[1.2vw] h-[3vw]' type={type} />

                    {type === "password" ? (
                        <EyeClosed onClick={() => setType("text")} className='w-[2vw] h-[2vw] text-[#4B3EC4] absolute right-[1vw] top-[0.6vw] cursor-pointer' />
                    ) : (
                        <Eye onClick={() => setType("password")} className='w-[2vw] h-[2vw] text-[#4B3EC4] absolute right-[1vw] top-[0.6vw] cursor-pointer' />
                    )}
                </div>
                <div className='flex items-center gap-[2vw]'>
                    <Button className='mt-[1vw] w-[10vw] bg-[#4B3EC4] text-[1.2vw] h-[3vw]'>Kirish</Button>
                    <span className='text-[1vw] font-light'>Yoki</span>
                    <Button className='mt-[1vw] w-[20vw] bg-[#c43e97] text-[1.2vw] h-[3vw]'>Google bilan davom eting</Button>
                </div>
                <p className='text-[1vw]'>Akkaunt yo'qmi? <strong onClick={changeType} className='!text-[#4B3EC4] cursor-pointer'>Ro'yxatdan o'ting</strong></p>
            </form>
        </section>
    )
}

export default Login