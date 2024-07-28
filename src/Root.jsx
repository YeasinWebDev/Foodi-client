import React from 'react'
import { Outlet } from 'react-router-dom'
import Nav from './components/Nav'

function Root() {
    return (
        <div className='px-4 py-5 lg:px-10 lg:py-6'>
            <Nav />
            <Outlet />
        </div>
    )
}

export default Root