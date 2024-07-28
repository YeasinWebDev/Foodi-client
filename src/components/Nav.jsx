import React from 'react'
import { Link, NavLink } from 'react-router-dom'

function Nav() {
    return (
        <div className=' border-b-2 border-orange-400 mb-10'>
            <div className="navbar">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content  rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <NavLink to={'/'} className={({ isActive }) => `p-2 lg:text-lg text-sm hover:text-orange-600 font-semibold ease-in-out duration-300 ${isActive ? 'text-[#EC5C53]' : 'p-2'}`}>
                                Home
                            </NavLink>
                            <NavLink to={'/menu'} className={({ isActive }) => `p-2 lg:text-lg text-sm hover:text-orange-600 font-semibold ease-in-out duration-300 ${isActive ? 'text-orange-800' : 'p-2'}`}>
                                Menu
                            </NavLink>
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl"><img className='w-20 md:w-28' src="/assets/logo.png" alt="" /></a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <NavLink to={'/'} className={({ isActive }) => `p-2 lg:text-lg text-sm hover:text-orange-600 font-semibold ease-in-out duration-300 ${isActive ? 'text-[#EC5C53]' : 'p-2'}`}>
                            Home
                        </NavLink>
                        <NavLink to={'/menu'} className={({ isActive }) => `p-2 lg:text-lg text-sm hover:text-orange-600 font-semibold ease-in-out duration-300 ${isActive ? 'text-orange-800' : 'p-2'}`}>
                            Menu
                        </NavLink>
                    </ul>
                </div>
                <div className="navbar-end">
                    <div className='flex items-center justify-center gap-5'>
                        <Link className='cursor-pointer'>
                            <img src="/assets/bag.png" alt="" />
                            <div className='absolute top-10 right-[8.5rem] bg-red-600 rounded-xl text-white w-5  h-5 flex items-center justify-center'>2</div>
                        </Link>
                        <button className='bg-orange-600 text-white px-4 py-2 font-semibold rounded-xl'>Sign In</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Nav