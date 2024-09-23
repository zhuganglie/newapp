'use client'
import { useState } from 'react';
import SideBar from './SideBar';

export default function SidebarContainer() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button 
        onClick={toggleSidebar} 
        className="md:hidden p-2 text-white bg-blue-500 rounded"
      >
        {isOpen ? 'Close Menu' : 'Open Menu'}
      </button>
      <SideBar isOpen={isOpen} />
    </div>
  );
}
