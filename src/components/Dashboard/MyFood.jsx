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
          data.length >0 ? 
          <div className='lg:w-[90%] mx-auto w-full flex flex-wrap gap-6 lg:pl-2'>
            {
              data.map(item =>(
                <Card fav={'no'} setReload={setReload} reload={reload} email={item.addedByEmail} key={item._id} id={item._id} img={item.img} price={item.price} star={item.rating} name={item.name} des={item.des} items={item.items} category={item.category}/>
              ))
            }
          </div>
          :
          <h1 className='flex items-center justify-center font-semibold text-xl'>No <span className='px-2 text-orange-500'>Food</span> Found</h1>
        }
    </div>
  )
}

export default MyFood