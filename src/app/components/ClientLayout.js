'use client'

import SideBar from './SideBar';
import Breadcrumbs from '@/app/components/breadcrumbs';
import { useState, useEffect, useRef, useCallback } from 'react';
import { FaMugSaucer } from "react-icons/fa6";

export default function ClientLayout({ children }) {
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
        <div className="w-full min-h-screen bg-background text-text-main selection:bg-primary/30 selection:text-primary-light">
            <SideBar isOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} ref={sidebarRef} />
            <div className={`w-full ${isSidebarOpen ? 'md:pl-72' : ''} transition-all duration-500 ease-out min-h-screen flex flex-col`}>
                <div className="p-8 flex-grow">
                    <button
                        className="md:hidden mb-8 text-text-muted hover:text-primary transition-colors"
                        onClick={toggleSidebar}
                    >
                        <FaMugSaucer size={28} />
                    </button>
                    <Breadcrumbs />
                    <main className="container mx-auto flex-grow mt-8">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}
