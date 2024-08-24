import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../Auth/ContextProvider'
import useAxiosSecure from '../../Hooks/useAxiosSecure'
import Card from '../Card'

function MyFav() {
    const { user } = useContext(AuthContext)
    const [favData, setFavData] = useState(null)
    const axiosSecure = useAxiosSecure()

    useEffect(() => {

        const fetchData = async () => {
            const res = await axiosSecure.get(`/myFav`, { params: { email: user?.email } })
            setFavData(res.data)
        }
        fetchData()

        return () => {
            setFavData(null)
        }
    }, [])


    return (
        <>
            <h1 className='font-semibold text-2xl flex items-center justify-center pt-16 pb-10'>My Favorite</h1>
                {
                    favData?.length > 0?
                        <div className='flex items-center justify-center flex-wrap gap-5'>
                            {
                                favData.map(item => (
                                    <Card fav={"no"} id={item._id}  email={item.addedByEmail} key={item._id} img={item.img} price={item.price} star={item.rating} name={item.name} des={item.des} items={item.items} category={item.category}/>
                                ))
                            }
                        </div>
                        :
                        <h1 className='flex items-center justify-center font-semibold text-2xl'>No Food Found</h1>
                }
        </>
    )
}

export default MyFav