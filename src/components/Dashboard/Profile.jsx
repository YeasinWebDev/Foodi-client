import React, { useContext } from 'react'
import useRole from '../../Hooks/useRole'
import { AuthContext } from '../../Auth/ContextProvider'

function Profile() {
  const [role] = useRole()
  const {user} = useContext(AuthContext)
  return (
    <div className='flex items-center justify-center flex-col pt-16'>
      <h1 className='font-semibold text-2xl'>My Profile</h1>
      <div className='pt-10 flex flex-col gap-3'>
          <img className='rounded-full w-40 mx-auto' src={user?.photoURL} alt="" />
          <h1 className='font-semibold  text-xl'>Name: <span className='px-2 font-semibold  text-orange-600'>{user?.displayName}</span></h1>
          <h1 className='font-semibold  text-xl'>Email: <span className='px-2 font-semibold  text-orange-600'>{user?.email}</span></h1>
          <h1 className='font-semibold  text-xl'>Role: <span className='px-2 font-semibold  text-orange-600'>{role}</span></h1>
      </div>
    </div>
  )
}

export default Profile