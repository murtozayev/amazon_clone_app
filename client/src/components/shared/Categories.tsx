import { MoveRight, PlaySquare } from 'lucide-react'
import React from 'react'

const Categories = () => {
    return (
        <div>
            <article className='flex justify-between items-center'>
                <h1 className='text-[2vw] font-light'>Kategoriyalar</h1>
                <div className='flex items-center gap-[1vw] cursor-pointer'>
                    <span className='text-[1vw]'>Hammasini ko'rish</span>
                    <MoveRight className='w-[1vw] h-[1vw]' />
                </div>
            </article>
            <div className='mt-[3vw] flex gap-[2vw] flex-wrap'>
                <div className='flex flex-col items-center w-[7vw]'>
                    <div className='w-[7vw] h-[7vw] bg-slate-400 rounded-full flex items-center justify-center'>
                        <PlaySquare className='text-white' />
                    </div>
                    <strong className='mt-[1vw] text-[1vw] font-light'>Gaming</strong>
                </div>
            </div>
        </div>
    )
}

export default Categories