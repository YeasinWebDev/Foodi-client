import React, { useEffect, useState } from 'react'
import {useParams } from 'react-router-dom'
import useAxiosSecure from '../Hooks/useAxiosSecure'
import Card from '../components/Card'

function Details() {
    const { id } = useParams()
    const [item, setItem] = useState('')
    const [loading, setLoading] = useState(false);
    const [relatedData, setRelatedData] = useState([])
    const axiosSecure = useAxiosSecure()

    const details = async () => {
        setLoading(true)
        try {
            const response = await axiosSecure.get(`/food-item/${id}`)
            setItem(response.data.result)
            setRelatedData(response.data.categoryData)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.error('Error fetching item:', error)
        }
    }

    const filtertedCategory = relatedData.filter(item => item._id !== id)

    useEffect(() => {
        details()
        window.scrollTo(0, 0)
    }, [id])

    if (loading) {
        return <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-black"></div>
        </div>
    }

    const handelAddCart = (id) => {
        console.log(id)
    }

    return (
        <>
            <div className='flex items-center flex-col md:flex-row justify-center gap-10 w-full lg:w-[80%] xl:w-[50%] mx-auto'>
                <img className='w-40 h-40 md:w-80 md:h-80 rounded-xl object-cover' src={item?.img} alt="" />
                <div className='w-full md:w-[60%]'>
                    <div className='flex items-center justify-between'>
                        <h1 className='font-semibold text-2xl  lg:text-4xl'>{item?.name}</h1>
                        <button onClick={() => handelAddCart(item?._id)} className='bg-orange-500 px-3 py-2 rounded-xl text-white font-semibold'>Add to Cart</button>
                    </div>
                    <p className='text-sm text-gray-500 py-3'>
                        {item?.des}
                    </p>
                    <h1 className='font-semibold text-lg'>Category: <span className='bg-orange-500 px-3 py-2 rounded-xl text-white text-sm'>{item?.category}</span></h1>

                    <div className='mt-4'>
                        <h1 className='font-semibold text-lg'>Ingredients:</h1>
                        <ul className='list-disc list-inside'>
                            {item?.items?.map((ingredient, index) => (
                                <li key={index} className='text-gray-700'>{ingredient}</li>
                            ))}
                        </ul>
                    </div>
                    <div className='flex items-center justify-start gap-10 mt-5'>
                        <h1 className='font-semibold'>
                            Price:
                            <span className='text-orange-700'> $ {item?.price}</span>
                        </h1>

                        <h1 className='font-semibold'>
                            Rating:
                            <span className='text-yellow-500'> {item?.rating} ★</span>
                        </h1>
                    </div>
                </div>
            </div>
            <div className='pt-20 w-full md:w-[80%] mx-auto'>
                <h1 className='font-semibold text-2xl'>
                    More Food Related <span className='text-orange-600'>{item?.category}</span>
                </h1>
                <div className='flex items-center justify-center gap-5 flex-wrap pt-5'>
                    {
                        filtertedCategory?.map(item => (
                            
                                <Card key={item?._id} id={item?._id} img={item?.img} name={item?.name} des={item?.des} star={item?.rating} price={item?.price}/>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default Details