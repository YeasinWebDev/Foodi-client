import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { IoMdMenu } from "react-icons/io";
import Sidebar from '../Dashboard/Sidebar';

function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className='relative'>
      <div className='lg:hidden absolute right-5 top-5'>
        <IoMdMenu size={35} onClick={toggleSidebar} />
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {isSidebarOpen && (
        <div
          className='fixed inset-0 bg-gray-600 bg-opacity-50 z-10 lg:hidden'
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar for mobile */}
      <div
        className={`fixed top-0 left-0 h-full z-20 bg-white shadow-lg transition-transform duration-300 lg:transform-none ${
          isSidebarOpen ? 'transform translate-x-0' : 'transform -translate-x-full'
        } lg:translate-x-0`}
        style={{ width: '100%', maxWidth: '16rem' }}
      >
        <Sidebar />
      </div>

      {/* Main content area */}
      <div className='lg:ml-64 mx-5 py-10 lg:py-0  min-h-screen'>
        <Outlet />
      </div>
    </div>
  );
}

export default DashboardLayout;
