import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Auth/ContextProvider';
import useAxiosCommon from '../Hooks/useAxiosCommon';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';


function Nav() {
    const { user, logOut, qty, setQty, refress } = useContext(AuthContext);
    const axiosCommon = useAxiosCommon()
    const navigate = useNavigate();


    const countNum = async () => {
        if (user) {
            const res = await axiosCommon.post('/allCart', { email: user?.email })
            return setQty(res.data.totalCount)
        }
    }

    useEffect(() => {
        countNum()
    }, [refress, user])

    const handelLogOut = async () => {
        await logOut();
        setQty(0)
        navigate('/');
    }


    useGSAP(() => {
        gsap.fromTo(
            '.navLink',
            { opacity: 0, y: -20 },
            {
                opacity: 1,
                y: 0,
                duration: 1.5,
                ease: 'power3.out',
                stagger: 0.3,
            }
        );
    }, []);

    return (
        <div className='border-b-2 border-orange-400 mb-10'>
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
                            className="menu menu-sm dropdown-content rounded-box z-[1] mt-3 w-52 p-2 bg-[#f2f2f2]">
                            <li >
                                <NavLink to={'/'} className={({ isActive }) => `p-2 lg:text-lg text-sm hover:text-orange-600 font-semibold ease-in-out duration-300 cursor-pointer ${isActive ? 'text-[#EC5C53]' : ''}`}>
                                    Home
                                </NavLink>
                            </li>
                            <li >
                                <NavLink to={'/menu'} className={({ isActive }) => `p-2 lg:text-lg text-sm hover:text-orange-600 font-semibold ease-in-out duration-300 cursor-pointer ${isActive ? 'text-[#EC5C53]' : ''}`}>
                                    Menu
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={'/about'} className={({ isActive }) => `p-2 lg:text-lg text-sm hover:text-orange-600 font-semibold ease-in-out duration-300 cursor-pointer ${isActive ? 'text-[#EC5C53]' : ''}`}>
                                    About Us
                                </NavLink>
                            </li>
                            <li >
                                <NavLink to={'/contact'} className={({ isActive }) => `p-2 lg:text-lg text-sm hover:text-orange-600 font-semibold ease-in-out duration-300 cursor-pointer ${isActive ? 'text-[#EC5C53]' : ''}`}>
                                    Contact Us
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={'/dashboard/profile'} className={({ isActive }) => `p-2 lg:text-lg text-sm hover:text-orange-600 font-semibold ease-in-out duration-300 cursor-pointer ${isActive ? 'text-[#EC5C53]' : ''}`}>
                                    Dashboard
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                    <Link to={'/'} className="btn btn-ghost text-xl"><img className='w-20 md:w-28' src="/assets/logo.png" alt="" /></Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal z-[1]">
                        <li className='navLink'>
                            <NavLink to={'/'} className={({ isActive }) => `p-2 lg:text-lg text-sm hover:text-orange-600 font-semibold ease-in-out duration-300 cursor-pointer ${isActive ? 'text-[#EC5C53]' : ''}`}>
                                Home
                            </NavLink>
                        </li>
                        <li className='navLink'>
                            <NavLink to={'/menu'} className={({ isActive }) => `p-2 lg:text-lg text-sm hover:text-orange-600 font-semibold ease-in-out duration-300 cursor-pointer ${isActive ? 'text-[#EC5C53]' : ''}`}>
                                Menu
                            </NavLink>
                        </li>
                        <li className='navLink'>
                            <NavLink to={'/about'} className={({ isActive }) => `p-2 lg:text-lg text-sm hover:text-orange-600 font-semibold ease-in-out duration-300 cursor-pointer ${isActive ? 'text-[#EC5C53]' : ''}`}>
                                About Us
                            </NavLink>
                        </li>
                        <li className='navLink'>
                            <NavLink to={'/contact'} className={({ isActive }) => `p-2 lg:text-lg text-sm hover:text-orange-600 font-semibold ease-in-out duration-300 cursor-pointer ${isActive ? 'text-[#EC5C53]' : ''}`}>
                                Contact Us
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <div className="navbar-end">
                    <div className='flex items-center justify-center gap-2'>
                        <Link to={'/cart'} className='cursor-pointer relative flex gap-1 navLink'>
                            <img src="/assets/bag.png" alt="" />
                            <div className=' bg-red-600 rounded-xl text-white w-5  h-5 flex items-center justify-center mb-2'>{qty}</div>
                        </Link>
                        {user ?
                            <>
                                <Link to={'/dashboard/profile'} className='bg-orange-600 text-white px-4 py-2 font-semibold rounded-xl hidden lg:flex navLink'>Dashboard</Link>
                                <button onClick={() => handelLogOut()} className='bg-orange-600 text-white px-4 py-2 font-semibold rounded-xl navLink'>Log Out</button>
                                <img className='w-10 rounded-full hidden md:block md:mr-10 mr-0 navLink' src={user?.photoURL} alt="img" />
                            </>
                            : <Link to={'/signin'}><button className='bg-orange-600 text-white px-4 py-2 font-semibold rounded-xl navLink'>Sign In</button></Link>}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Nav;
