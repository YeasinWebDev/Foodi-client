import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../Auth/ContextProvider'
import useAxiosSecure from '../../Hooks/useAxiosSecure'
import Card from '../Card'

function MyFood() {
  const {user} = useContext(AuthContext)
  const [data, setdata] = useState('')
  const axiosSecure = useAxiosSecure()
  const [reload, setReload] = useState(false)

  useEffect(() =>{
    const fetchData = async () => {
      const res = await axiosSecure.get(`/myFood`, { params: { email: user?.email } })
      setdata(res.data)
    }
    fetchData()
  },[reload])

  return (
    <div>
      <h1 className='flex items-center justify-center font-semibold text-2xl pt-16 pb-10'>My Food</h1>
        {
          data ? 
          <div className='md:w-[90%] mx-auto w-full flex flex-wrap gap-6'>
            {
              data.map(item =>(
                <Card setReload={setReload} reload={reload} email={item.addedByEmail} key={item._id} id={item._id} img={item.img} price={item.price} star={item.rating} name={item.name} des={item.des} items={item.items} category={item.category}/>
              ))
            }
          </div>
          :
          <h1 className='flex items-center justify-center font-semibold text-xl'>No data Found</h1>
        }
    </div>
  )
}

export default MyFood