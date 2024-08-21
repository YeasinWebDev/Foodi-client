import React from 'react'
import { Link } from 'react-router-dom'

function SuccessPage() {
    return (
        <div className='flex items-center justify-center flex-col gap-5'>
            <h1 className='font-semibold text-3xl'>
                Order Placed Successfully!
            </h1>
            <p>
                Your order has been successfully placed. We will deliver it to your address as soon as possible.
            </p>
            <Link to={'/'}> <button className='bg-orange-700 text-white px-4 py-2 rounded-xl'>
                Go Back 
            </button></Link>
        </div>
    )
}

export default SuccessPage