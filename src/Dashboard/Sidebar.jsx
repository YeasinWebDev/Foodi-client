import React, { useContext } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { MdLogout } from "react-icons/md";
import toast from 'react-hot-toast';
import useRole from '../Hooks/useRole';
import { AuthContext } from '../Auth/ContextProvider';

function Sidebar() {
    const [role] = useRole()
    const { logOut } = useContext(AuthContext)
    const navigate = useNavigate()

    const handelLogout = () => {
        logOut()
        navigate('/')
        toast.success("LogOut successfully")
    }
    return (
        <div className='z-10 md:fixed flex flex-col overflow-x-hidden bg-orange-50 w-64  px-2 py-4 absolute inset-y-0 left-0 transform'>

            <div className='flex justify-center '>
                <div className='block cursor-pointer p-4 font-bold border-2 rounded-xl'>
                    <Link to='/'>
                        <img
                            className=''
                            src='/assets/logo.png'
                            alt='logo'
                            width='100'
                            height='100'
                        />
                    </Link>
                </div>
            </div>


            <div className='mt-14'>
                <div className='px-3 flex flex-col'>
                    {
                        role === 'admin' ?

                            <>
                                <NavLink to="/dashboard/profile" className={({ isActive }) => `border-2 px-5 py-2 mb-4 font-semibold text-lg rounded-xl ${isActive ? 'bg-orange-300' : ''}`}>
                                    Admin Profile
                                </NavLink>
                                <NavLink to="/dashboard/statistics" className={({ isActive }) => `border-2 px-5 py-2 mb-4 font-semibold text-lg rounded-xl ${isActive ? 'bg-orange-300' : ''}`}>
                                Statistics
                                </NavLink>
                                <NavLink to="/dashboard/allUsers" className={({ isActive }) => `border-2 px-5 py-2 mb-4 font-semibold text-lg rounded-xl ${isActive ? 'bg-orange-300' : ''}`}>
                                    All Users
                                </NavLink>
                            </>
                            :
                            <>
                                <NavLink to="/dashboard/profile" className={({ isActive }) => `border-2 px-5 py-2 mb-4 font-semibold text-lg rounded-xl ${isActive ? 'bg-orange-300' : ''}`}>
                                    Profile
                                </NavLink>
                                <NavLink to="/dashboard/addFood" className={({ isActive }) => `border-2 px-5 py-2 mb-4 font-semibold text-lg rounded-xl ${isActive ? 'bg-orange-300' : ''}`}>
                                    Add Food
                                </NavLink>
                                <NavLink to="/dashboard/myFood" className={({ isActive }) => `border-2 px-5 py-2 mb-4 font-semibold text-lg rounded-xl ${isActive ? 'bg-orange-300' : ''}`}>
                                    My Food
                                </NavLink>
                                <NavLink to="/dashboard/myTransition" className={({ isActive }) => `border-2 px-5 py-2 mb-4 font-semibold text-lg rounded-xl ${isActive ? 'bg-orange-300' : ''}`}>
                                    My Transition
                                </NavLink>
                                <NavLink to="/dashboard/myFav" className={({ isActive }) => `border-2 px-5 py-2 mb-4 font-semibold text-lg rounded-xl ${isActive ? 'bg-orange-300' : ''}`}>
                                    My Favorite
                                </NavLink>
                            </>

                    }
                </div>

            </div>

            <button onClick={handelLogout} className='py-3 bg-orange-600 mt-5 text-white flex items-center justify-center font-semibold rounded-lg'>LogOut <span className='pl-3'><MdLogout /></span></button>
        </div>
    )
}

export default Sidebar