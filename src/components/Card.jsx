import React from 'react'
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

function Card({ img, price, star,name,des }) {

    return (
        <div>
            <div className='bg-[#f2f2f2] w-fit px-10 py-5 rounded-2xl shadow-lg' >
                <div className='relative'>
                    <FaHeart className='absolute -right-9 -top-4 p-2 bg-orange-600 rounded-tr-2xl rounded-bl-2xl' color='#fff' size={35}/>
                    <img 
                        className='w-40 h-40 md:w-60 md:h-60 rounded-xl pt-4 object-cover' 
                        src={img} 
                        alt="Product" 
                    />
                </div>
                <div className='flex flex-col gap-2 pt-3'>
                    <h1 className='font-semibold text-xl'>{name}</h1>
                    <h1 className='font-semibold text-sm'>{des?.slice(0,40)}</h1>
                    <div className='flex justify-between'>
                        <h1 className='font-semibold text-lg'><span className='text-red-600'>$</span> {price}</h1>
                        <h1 className='flex items-center gap-2 font-semibold'><img src="/assets/star.png" alt="" />{star}</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card