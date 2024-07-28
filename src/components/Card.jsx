import React from 'react'
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

function Card({ img, price, star }) {
    return (
        <div>
            <div className='bg-[#f2f2f2] w-fit px-10 py-5 rounded-2xl shadow-lg' >
                <div className='relative'>
                    <FaHeart className='absolute -right-9 -top-4 p-2 bg-orange-600 rounded-tr-2xl rounded-bl-2xl' color='#fff' size={35}/>
                    <img className='md:w-60 w-40 rounded-xl pt-4' src="https://cdn.loveandlemons.com/wp-content/uploads/2021/04/green-salad.jpg" alt="" />
                </div>
                <div className='flex flex-col gap-2 pt-3'>
                    <h1 className='font-semibold text-xl'>Name</h1>
                    <h1 className='font-semibold text-sm'>des</h1>
                    <div className='flex justify-between'>
                        <h1 className='font-semibold text-lg'><span className='text-red-600'>$</span> 25.00</h1>
                        <h1 className='flex items-center gap-2 font-semibold'><img src="/assets/star.png" alt="" />4.5</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card