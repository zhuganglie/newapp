'use client'
import './globals.css';
import 'prism-themes/themes/prism-dracula.css';
import SideBar from './components/SideBar';
import Breadcrumbs from '@/app/components/breadcrumbs';
import { useState, useEffect, useRef, useCallback } from 'react';
import { FaMugSaucer } from "react-icons/fa6";
import Script from 'next/script'

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

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen(prevIsOpen => !prevIsOpen);
  }, []);

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
    <html lang="zh" > 
      <head>
        <title>Why? 为什么？</title>
        <meta name="description" content="Why? 我的好奇心" />
        <meta name="keywords" content="杂记" />
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-C61DTYKQV6"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-C61DTYKQV6', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
      </head>
      <body>
        <div className="w-full md:w-5/6 flex min-h-screen">
          <SideBar isOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} ref={sidebarRef} />
          <div className={`w-full ${isSidebarOpen ? 'ml-72' : ''} p-8 transition-all duration-300 ease-in-out`}>
            <button
              className="md:hidden"
              onClick={toggleSidebar}
            >
              <FaMugSaucer size={28} />
            </button>
            <Breadcrumbs />
            <main className="container mx-auto flex-grow">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
