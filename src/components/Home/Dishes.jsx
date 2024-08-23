import React, { useState, useEffect } from 'react'
import Card from '../Card'
import useAxiosCommon from '../../Hooks/useAxiosCommon'

function Dishes() {
    const axiosCommon = useAxiosCommon()
    const [category, setCategory] = useState('')
    const [data, setData] = useState([]) // Set initial state as an empty array

    useEffect(() => {
        const categoryArray = ['Pizza', 'Salad', 'Desserts', 'Drinks']
        const randomCategory = categoryArray[Math.floor(Math.random() * categoryArray.length)]
        setCategory(randomCategory)
    }, [])

    useEffect(() => {
        if (category) {
            fetchData()
        }
    }, [category])

    const fetchData = async () => {
        try {
            const res = await axiosCommon.post('/subCategory', { category })
            setData(res.data) // Ensure res.data is an array
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }

    return (
        <div className='lg:w-[90%] w-full mx-auto mt-20'>
            <h1 className='text-[#FF6868] font-semibold text-lg '>Special Dishes</h1>
            <h1 className='font-bold text-2xl md:text-4xl lg:text-5xl  py-5'>Standout Dishes <br /> From Our Menu</h1>
            <div className='flex items-center justify-start gap-5 overflow-auto 2xl:overflow-hidden'>
                {
                    data.length > 0 ?
                        data.slice(0, 4).map((item, index) => (
                            <div key={index} className="flex-shrink-0">
                                <Card id={item._id} img={item.img} name={item.name} des={item.des} star={item.rating} price={item.price} />
                            </div>
                        ))
                        :
                        <h1 className='text-center text-xl'>No data found for this category.</h1>
                }
            </div>
        </div>
    )
}

export default Dishes
