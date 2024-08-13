import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useAxiosSecure from '../Hooks/useAxiosSecure'
import Loading from '../components/Loading'
import Card from '../components/Card'

function Catagories() {
    const { name } = useParams()
    const [foods, setFoods] = useState(null)
    const [loading, setLoading] = useState(true)
    const axiosSecure = useAxiosSecure()

    const data = async () => {
        setLoading(true)
        const response = await axiosSecure.get(`/foods`, { params: { category: name } })
        setFoods(response.data)
        setLoading(false)
    }

    useEffect(() => {
        data()
    }, [])

    if (loading) return <Loading />

    return (
        <div>
            <h1 className='flex items-center justify-center font-semibold text-2xl'>Food Related <span className='px-2 text-orange-700 font-bold'>{name}</span></h1>

            <>
                {
                    foods?.length > 0 ?
                        <div className='flex items-center justify-center flex-wrap gap-10 w-full md:w-[80%] mx-auto mt-10'>
                            {
                                foods?.map(item => (
                                    <Card key={item._id} id={item._id} img={item.img} name={item.name} des={item.des} star={item.rating} price={item.price} />
                                ))
                            }
                        </div>
                        :
                        <h1 className='flex items-center justify-center text-2xl font-semibold pt-10'>No <span className='text-orange-500 px-2 font-bold'>Food</span> Found</h1>
                }
            </>
        </div>
    )
}

export default Catagories