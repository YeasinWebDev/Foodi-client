import React, { useContext, useEffect, useState } from 'react'
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { AuthContext } from '../Auth/ContextProvider';
import Loading from '../components/Loading';
import { TiDeleteOutline } from "react-icons/ti";
import { useNavigate } from 'react-router-dom';

function Cart() {
    const axiosSecure = useAxiosSecure();
    const { setrefress, qty, refress, user } = useContext(AuthContext)
    const [allCart, setAllCart] = useState(null)
    const [loading, setLoading] = useState(false);
    
    // all cart
    const getData = async () => {
        if (user) {
            setLoading(true)
            const res = await axiosSecure.post('/allCartData', { email: user?.email })
            setAllCart(res.data)
            setLoading(false)
            setrefress(!refress)
        }
    }
    useEffect(() => {
        getData()
    }, [qty])

    // update a qty
    const incrementOrDecrement = async (type, num) => {
        const data = { type, num,email: user?.email}
        const result = await axiosSecure.post('/updateCart', { data })
        if (result.status === 200) {
            setrefress(!refress)
        }
    };

    // Delete a cart
    const handelDelete = async (num) => {
        const data = { num, email: user?.email }
        const result = await axiosSecure.post('/deleteCart', { data })
        setrefress(!refress)
    }


    if (loading) {
        return <Loading />
    }


    return (
        <div>
            <h1 className='flex items-center justify-center font-semibold text-xl md:text-4xl'>Your <span className='text-orange-600 px-2'>Food</span> Cart</h1>


            <div className='flex flex-col gap-5 pt-10 w-full lg:w-[80%] mx-auto'>
                {
                    allCart?.length > 0 ?
                        (
                            allCart?.map((item) => (
                                <div key={`${item?._id}`} className='flex md:flex-row gap-5 md:gap-0 flex-col justify-between border-2 p-2 rounded-xl border-orange-200'>
                                    <div className='flex gap-5'>
                                        <img className='w-28 rounded-xl' src={item?.img} alt="" />
                                        <div>
                                            <h1 className='font-semibold text-xl'>{item?.name}</h1>
                                            <p className='text-sm'>{item?.des?.slice(0, 40)}</p>
                                        </div>
                                    </div>

                                    <div className='relative flex flex-col gap-3'>
                                        <h1 onClick={() => handelDelete(item?.num)} className='absolute right-0 text-red-800 cursor-pointer'><TiDeleteOutline size={29} /></h1>  {/* delete btn */}
                                        <h1 className='font-semibold pt-8'>Price: <span className='text-red-800'>${item?.price}</span></h1>
                                        <div className='flex-nowrap'>
                                            <button onClick={() => incrementOrDecrement('dec', item?.num)} className='bg-orange-500 px-3 py-2 rounded-l-xl text-white font-semibold'>-</button>
                                            <span className='bg-white px-3 py-2 text-lg font-semibold border border-gray-300'>{item?.count}</span>
                                            <button onClick={() => incrementOrDecrement('inc', item?.num)} className='bg-orange-500 px-3 py-2 rounded-r-xl text-white font-semibold'>+</button>
                                        </div>
                                        <h1 className='font-semibold'>SubTotal: <span className='text-red-800'>${item?.count * item?.price}</span></h1>
                                    </div>
                                </div>
                            ))
                        ) :
                        <h1 className='flex items-center justify-center text-2xl font-semibold'>No <span className='text-orange-500 px-2 font-bold'>Food</span> Found</h1>
                }
            </div>

            {allCart?.length > 0 && <div className='flex items-end justify-center flex-col pt-10 w-full lg:w-[90%]'>
                <h1 className='font-semibold text-xl md:text-4xl'>Total Price: <span className='text-red-800'>${allCart?.reduce((acc, cur) => acc + (cur?.price * cur?.count), 0)}</span></h1>
                <button className='bg-orange-500 w-40 px-4 py-3 mt-4 rounded-xl text-white font-semibold '>Checkout</button>
            </div>}
        </div>
    )
}

export default Cart