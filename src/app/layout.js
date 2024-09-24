'use client'
import './globals.css';
import SideBar from './components/SideBar';
import Breadcrumbs from './components/Breadcrumbs';
import { useState, useEffect } from 'react';

export default function RootLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

  return (
    <html lang="en" data-theme="garden">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <div className="w-full flex min-h-screen">
          <SideBar isOpen={isSidebarOpen} />
          <div className={`w-full ${isSidebarOpen ? 'ml-64' : ''} p-8 transition-all duration-300 ease-in-out`}>
            <button
              className="fixed top-4 left-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={toggleSidebar}
            >
              Toggle Sidebar
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
