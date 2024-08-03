import React from 'react'
import { Outlet } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'

function Root() {
    return (
        <div className='px-4 py-5 lg:px-10 lg:py-6'>
            <Nav />
            <div className='min-h-[60vh]'>
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default Root