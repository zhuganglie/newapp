'use client'
import './globals.css';
import SideBar from './components/SideBar';
import Breadcrumbs from './components/Breadcrumbs';
import { useState, useEffect, useRef } from 'react';
import { FaMugSaucer } from "react-icons/fa6";

export default function RootLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  useEffect(() => {
    // Check screen size on component mount and resize
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 768); // Adjust breakpoint as needed
    };

    handleResize(); // Set initial state
    window.addEventListener('resize', handleResize);

    // Clean up event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target) && isSidebarOpen && window.innerWidth < 768) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSidebarOpen]);

  return (
    <html lang="en" data-theme="garden">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <div className="w-full flex min-h-screen">
          <SideBar isOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} ref={sidebarRef} />
          <div className={`w-full ${isSidebarOpen ? 'ml-72' : ''} p-8 transition-all duration-300 ease-in-out`}>
            <button
              className="md:hidden font-bold py-1 px-2 rounded"
              onClick={toggleSidebar}
            >
              <FaMugSaucer size={28} />
            </button>
            <Breadcrumbs />
            <main className="container mx-auto px-4 py-8 flex-grow">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
