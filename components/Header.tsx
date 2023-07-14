import Image from 'next/image'
import React from 'react'

function Header() {
    return (
        <div className='bg-[#0D0D0D] p-20'>
            <div className='flex justify-center items-center mx-auto gap-3'>
                <Image alt="Todo" src='..\img\rocket.png' className='w-6 mt-2' />
                <div className='flex'>
                    <h1 className='text-[#4EA8DE] text-5xl font-bold '>to</h1>
                    <h1 className='text-[#5E60CE] text-5xl font-bold '>do</h1>
                    </div>
            </div>
        </div>
    )
}

export default Header
