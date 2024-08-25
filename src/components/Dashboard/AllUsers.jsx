import React, { useEffect, useState } from 'react'
import useAxiosSecure from '../../Hooks/useAxiosSecure'

function AllUsers() {
  const [data, setData] = useState(null)
  const axiosSecure = useAxiosSecure()

  useEffect(() => {
    const fetchData = async () => {
      const result = await axiosSecure.get('/allUsers')
      setData(result.data)
    }
    fetchData()
  }, [])

  console.log(data)
  return (
    <div className='flex flex-col items-center justify-center gap-10 pt-16'>
      <h1 className='font-semibold text-2xl'>All Users</h1>
      <div className="overflow-x-auto w-full 2xl:w-[80%] mx-auto p-10 rounded-xl shadow-xl">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Email</th>
              <th>Name</th>
              <th>Role</th>
              <th>Id</th>
            </tr>
          </thead>
          <tbody className="font-semibold">
            {data?.length > 0 &&
              data.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.email}</td>
                  <td className="text-red-600">{item.name}</td>
                  <td className="text-green-500">{item.role}</td>                  
                  <td className="text-green-500">{item._id}</td>                  
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AllUsers