'use client'

import SideBar from './SideBar';
import Breadcrumbs from '@/app/components/breadcrumbs';
import { useState, useEffect, useRef, useCallback } from 'react';
import { FiMenu } from "react-icons/fi";

export default function ClientLayout({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const sidebarRef = useRef(null);

    useEffect(() => {
        const handleResize = () => {
            setIsSidebarOpen(window.innerWidth >= 768);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

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
        <div className="w-full min-h-screen bg-white text-text-main selection:bg-primary-light selection:text-primary-dark">
            <SideBar isOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} ref={sidebarRef} />
            <div className={`w-full ${isSidebarOpen ? 'md:pl-64' : ''} transition-all duration-300 ease-out min-h-screen flex flex-col`}>
                <div className="px-6 py-6 md:px-12 md:py-8 flex-grow">
                    <button
                        className="md:hidden mb-6 text-text-muted hover:text-text-main transition-colors p-1 rounded-md hover:bg-surface-hover"
                        onClick={toggleSidebar}
                    >
                        <FiMenu size={22} />
                    </button>
                    <Breadcrumbs />
                    <main className="container mx-auto flex-grow mt-4 max-w-4xl">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}
