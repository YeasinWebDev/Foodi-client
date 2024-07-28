import React from 'react'
import Card from '../Card'

function Dishes() {
    return (
        <div>
            <div className='w-[80%] mx-auto mt-20'>
                <h1 className='text-[#FF6868] font-semibold text-lg '>Special Dishes</h1>
                <h1 className='font-bold text-5xl  py-5'>Standout Dishes <br /> From Our Menu</h1>
            </div>
            <Card/>
        </div>
    )
}

export default Dishes