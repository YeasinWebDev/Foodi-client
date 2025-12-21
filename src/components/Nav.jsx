// import { useContext, useEffect, useState } from 'react';
// import { Link, NavLink, useNavigate } from 'react-router-dom';
// import { AuthContext } from '../Auth/ContextProvider';
// import useAxiosCommon from '../Hooks/useAxiosCommon';
// import gsap from 'gsap';
// import { useGSAP } from '@gsap/react';


// function Nav() {
//     const { user, logOut, qty, setQty, refresh } = useContext(AuthContext);
//     const axiosCommon = useAxiosCommon()
//     const navigate = useNavigate();
//     const [open, setOpen] = useState(false);


//     const countNum = async () => {
//         if (user) {
//             const res = await axiosCommon.post('/allCart', { email: user?.email })
//             return setQty(res.data.totalCount)
//         }
//     }

//     useEffect(() => {
//         countNum()
//     }, [refresh, user])

//     const handelLogOut = async () => {
//         await logOut();
//         setQty(0)
//         navigate('/');
//     }


//     useGSAP(() => {
//         gsap.fromTo(
//             '.navLink',
//             { opacity: 0, y: -20 },
//             {
//                 opacity: 1,
//                 y: 0,
//                 duration: 1.5,
//                 ease: 'power3.out',
//                 stagger: 0.3,
//             }
//         );
//     }, []);

//     console.log(user)

//     return (
//         <div className='border-b-2 border-orange-400 mb-10'>
//             <div className="navbar">
//                 <div className="navbar-start">
//                     <div className="dropdown">
//                         <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
//                             <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 className="h-5 w-5"
//                                 fill="none"
//                                 viewBox="0 0 24 24"
//                                 stroke="currentColor">
//                                 <path
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     strokeWidth="2"
//                                     d="M4 6h16M4 12h8m-8 6h16" />
//                             </svg>
//                         </div>
//                         <ul
//                             tabIndex={0}
//                             className="menu menu-sm dropdown-content rounded-box z-[1] mt-3 w-52 p-2 bg-gray-100 z-40">
//                             <li >
//                                 <NavLink to={'/'} className={({ isActive }) => `p-2 lg:text-lg text-sm hover:text-orange-600 font-semibold ease-in-out duration-300 cursor-pointer ${isActive ? 'text-[#EC5C53]' : ''}`}>
//                                     Home
//                                 </NavLink>
//                             </li>
//                             <li >
//                                 <NavLink to={'/menu'} className={({ isActive }) => `p-2 lg:text-lg text-sm hover:text-orange-600 font-semibold ease-in-out duration-300 cursor-pointer ${isActive ? 'text-[#EC5C53]' : ''}`}>
//                                     Menu
//                                 </NavLink>
//                             </li>
//                             <li>
//                                 <NavLink to={'/about'} className={({ isActive }) => `p-2 lg:text-lg text-sm hover:text-orange-600 font-semibold ease-in-out duration-300 cursor-pointer ${isActive ? 'text-[#EC5C53]' : ''}`}>
//                                     About Us
//                                 </NavLink>
//                             </li>
//                             <li >
//                                 <NavLink to={'/contact'} className={({ isActive }) => `p-2 lg:text-lg text-sm hover:text-orange-600 font-semibold ease-in-out duration-300 cursor-pointer ${isActive ? 'text-[#EC5C53]' : ''}`}>
//                                     Contact Us
//                                 </NavLink>
//                             </li>
//                             <li>
//                                 <NavLink to={'/dashboard/profile'} className={({ isActive }) => `p-2 lg:text-lg text-sm hover:text-orange-600 font-semibold ease-in-out duration-300 cursor-pointer ${isActive ? 'text-[#EC5C53]' : ''}`}>
//                                     Dashboard
//                                 </NavLink>
//                             </li>
//                         </ul>
//                     </div>
//                     <Link to={'/'} className="btn btn-ghost text-xl"><img className='w-20 md:w-28' src="/assets/logo.png" alt="" /></Link>
//                 </div>
//                 <div className="navbar-center hidden lg:flex">
//                     <ul className="menu menu-horizontal z-[1]">
//                         <li className='navLink'>
//                             <NavLink to={'/'} className={({ isActive }) => `p-2 lg:text-lg text-sm hover:text-orange-600 font-semibold ease-in-out duration-300 cursor-pointer ${isActive ? 'text-[#EC5C53]' : ''}`}>
//                                 Home
//                             </NavLink>
//                         </li>
//                         <li className='navLink'>
//                             <NavLink to={'/menu'} className={({ isActive }) => `p-2 lg:text-lg text-sm hover:text-orange-600 font-semibold ease-in-out duration-300 cursor-pointer ${isActive ? 'text-[#EC5C53]' : ''}`}>
//                                 Menu
//                             </NavLink>
//                         </li>
//                         <li className='navLink'>
//                             <NavLink to={'/about'} className={({ isActive }) => `p-2 lg:text-lg text-sm hover:text-orange-600 font-semibold ease-in-out duration-300 cursor-pointer ${isActive ? 'text-[#EC5C53]' : ''}`}>
//                                 About Us
//                             </NavLink>
//                         </li>
//                         <li className='navLink'>
//                             <NavLink to={'/contact'} className={({ isActive }) => `p-2 lg:text-lg text-sm hover:text-orange-600 font-semibold ease-in-out duration-300 cursor-pointer ${isActive ? 'text-[#EC5C53]' : ''}`}>
//                                 Contact Us
//                             </NavLink>
//                         </li>
//                     </ul>
//                 </div>
//                 <div className="navbar-end">
//                     <div className='flex items-center justify-center gap-2'>
//                         <Link to={'/cart'} className='cursor-pointer relative flex gap-1 navLink'>
//                             <img src="/assets/bag.png" alt="" />
//                             <div className=' bg-red-600 rounded-xl text-white w-5  h-5 flex items-center justify-center mb-2'>{qty}</div>
//                         </Link>
//                         {user ? (
//                             <div className="relative flex items-center gap-4">
//                                 {/* Avatar */}
//                                 <div className='navLink'>
//                                     {user?.photoURL !== null ? <img
//                                         onClick={() => setOpen(!open)}
//                                         className="w-10 h-10 rounded-full cursor-pointer border-2 border-orange-600"
//                                         src={user?.photoURL}
//                                         alt="profile"
//                                     /> : <h1 className='border rounded-full w-10 h-10 flex items-center justify-center font-semibold text-xl cursor-pointer' onClick={() => setOpen(!open)} >
//                                         {user?.email?.charAt(0).toUpperCase()}
//                                     </h1>}
//                                 </div>

//                                 {/* Dropdown with transitions */}
//                                 <div
//                                     className={`absolute right-0 top-12 w-44 bg-gray-50 shadow-xl rounded-xl overflow-hidden z-50 transition-all duration-300 ease-in-out ${open
//                                         ? "opacity-100 transform translate-y-0"
//                                         : "opacity-0 transform -translate-y-2 pointer-events-none"
//                                         }`}
//                                 >
//                                     <Link
//                                         to="/dashboard/profile"
//                                         className="block px-4 py-2 hover:text-orange-600 text-gray-700 transition-colors"
//                                         onClick={() => setOpen(false)}
//                                     >
//                                         Dashboard
//                                     </Link>
//                                     <button
//                                         onClick={() => {
//                                             handelLogOut();
//                                             setOpen(false);
//                                         }}
//                                         className="w-full text-left px-4 py-2 hover:text-orange-600 text-red-600 transition-colors"
//                                     >
//                                         Log Out
//                                     </button>
//                                 </div>
//                             </div>
//                         ) : (
//                             <Link to="/signin">
//                                 <button className="bg-orange-600 text-white px-4 py-2 font-semibold rounded-xl hover:bg-orange-700 transition-colors">
//                                     Sign In
//                                 </button>
//                             </Link>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }
// export default Nav;



import { useContext, useEffect, useRef, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Auth/ContextProvider';
import useAxiosCommon from '../Hooks/useAxiosCommon';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Menu } from 'lucide-react';

function Nav() {
    const { user, logOut, qty, setQty, refress } = useContext(AuthContext);
    const axiosCommon = useAxiosCommon()
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const mobileMenuRef = useRef(null);

    // Close mobile menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
                setMobileMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        }
    }, []);

    // Add animation for mobile menu
    useEffect(() => {
        if (mobileMenuOpen) {
            gsap.to('.mobile-menu', {
                opacity: 1,
                y: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
            // Prevent body scroll when menu is open
            document.body.style.overflow = 'hidden';
        } else {
            gsap.to('.mobile-menu', {
                opacity: 0,
                y: -10,
                duration: 0.2,
                ease: 'power2.in'
            });
            // Re-enable body scroll
            document.body.style.overflow = 'auto';
        }
    }, [mobileMenuOpen]);

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

    // Handle link click in mobile menu
    const handleMobileLinkClick = () => {
        setMobileMenuOpen(false);
    };

    return (
        <div className='border-b-2 border-orange-400 mb-10 relative'>
            <div className="navbar">
                <div className="navbar-start">
                    {/* Custom Mobile Menu Toggle */}
                    <div className="lg:hidden" ref={mobileMenuRef}>
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="btn btn-ghost p-2 z-50"
                        >
                            <Menu />
                        </button>
                    </div>

                    <Link to={'/'} className="btn btn-ghost text-xl p-0">
                        <img className='w-20 md:w-28' src="/assets/logo.png" alt="" />
                    </Link>
                </div>

                {/* Desktop Navigation */}
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

                {/* Right side content (cart, user profile, sign in) */}
                <div className="navbar-end">
                    <div className='flex items-center justify-center gap-2'>
                        <Link to={'/cart'} className='cursor-pointer relative flex gap-1 navLink'>
                            <img src="/assets/bag.png" alt="" />
                            <div className=' bg-red-600 rounded-xl text-white w-5  h-5 flex items-center justify-center mb-2'>{qty}</div>
                        </Link>
                        {user ? (
                            <div className="relative flex items-center gap-4">
                                {/* Avatar */}
                                <div className='navLink'>
                                    {user?.photoURL !== null ? <img
                                        onClick={() => setOpen(!open)}
                                        className="w-10 h-10 rounded-full cursor-pointer border-2 border-orange-600"
                                        src={user?.photoURL}
                                        alt="profile"
                                    /> : <h1 className='border rounded-full w-10 h-10 flex items-center justify-center font-semibold text-xl cursor-pointer' onClick={() => setOpen(!open)} >
                                        {user?.email?.charAt(0).toUpperCase()}
                                    </h1>}
                                </div>

                                {/* Dropdown with transitions */}
                                <div
                                    className={`absolute right-0 top-12 w-44 bg-gray-50 shadow-xl rounded-xl overflow-hidden z-50 transition-all duration-300 ease-in-out ${open
                                        ? "opacity-100 transform translate-y-0"
                                        : "opacity-0 transform -translate-y-2 pointer-events-none"
                                        }`}
                                >
                                    <Link
                                        to="/dashboard/profile"
                                        className="block px-4 py-2 hover:text-orange-600 text-gray-700 transition-colors"
                                        onClick={() => setOpen(false)}
                                    >
                                        Dashboard
                                    </Link>
                                    <button
                                        onClick={() => {
                                            handelLogOut();
                                            setOpen(false);
                                        }}
                                        className="w-full text-left px-4 py-2 hover:text-orange-600 text-red-600 transition-colors"
                                    >
                                        Log Out
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <Link to="/signin">
                                <button className="bg-orange-600 text-white px-4 py-2 font-semibold rounded-xl hover:bg-orange-700 transition-colors">
                                    Sign In
                                </button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            {/* Custom Mobile Menu Dropdown - Moved outside navbar for proper positioning */}
            {mobileMenuOpen && (
                <div className="lg:hidden">                    
                    {/* Mobile Menu */}
                    <div
                        ref={mobileMenuRef}
                        className="mobile-menu fixed left-0 top-20 bg-gray-50 shadow-lg z-50 w-[50%] border"
                        style={{ opacity: 0, transform: 'translateY(-10px)' }}
                    >
                        <ul className="w-full p-3">
                            <li className='navLink'>
                                <NavLink
                                    to={'/'}
                                    onClick={handleMobileLinkClick}
                                    className={({ isActive }) => `block p-3 text-lg hover:text-orange-600 font-semibold transition-colors duration-300 ${isActive ? 'text-[#EC5C53]' : 'text-gray-700'}`}
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li className='navLink'>
                                <NavLink
                                    to={'/menu'}
                                    onClick={handleMobileLinkClick}
                                    className={({ isActive }) => `block p-3 text-lg hover:text-orange-600 font-semibold transition-colors duration-300 ${isActive ? 'text-[#EC5C53]' : 'text-gray-700'}`}
                                >
                                    Menu
                                </NavLink>
                            </li>
                            <li className='navLink'>
                                <NavLink
                                    to={'/about'}
                                    onClick={handleMobileLinkClick}
                                    className={({ isActive }) => `block p-3 text-lg hover:text-orange-600 font-semibold transition-colors duration-300 ${isActive ? 'text-[#EC5C53]' : 'text-gray-700'}`}
                                >
                                    About Us
                                </NavLink>
                            </li>
                            <li className='navLink'>
                                <NavLink
                                    to={'/contact'}
                                    onClick={handleMobileLinkClick}
                                    className={({ isActive }) => `block p-3 text-lg hover:text-orange-600 font-semibold transition-colors duration-300 ${isActive ? 'text-[#EC5C53]' : 'text-gray-700'}`}
                                >
                                    Contact Us
                                </NavLink>
                            </li>
                            {user && (
                                <li className='navLink'>
                                    <NavLink
                                        to={'/dashboard/profile'}
                                        onClick={handleMobileLinkClick}
                                        className={({ isActive }) => `block p-3 text-lg hover:text-orange-600 font-semibold transition-colors duration-300 ${isActive ? 'text-[#EC5C53]' : 'text-gray-700'}`}
                                    >
                                        Dashboard
                                    </NavLink>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    )
}
export default Nav;