"use client";

import React, { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto px-4 py-6 sm:flex sm:items-center sm:justify-between">
        <a href="#" className="text-xl font-bold text-gray-800 dark:text-white">
          Your Brand
        </a>
        <button
          className="sm:hidden focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            )}
          </svg>
        </button>
        <nav
          className={`${
            isMenuOpen ? 'block' : 'hidden'
          } sm:block absolute sm:relative w-full sm:w-auto mt-2 sm:mt-0 bg-gray-100 dark:bg-gray-800 sm:bg-transparent shadow-md sm:shadow-none`}
        >
          <ul className="px-4 py-6 space-y-4 sm:flex sm:space-y-0 sm:space-x-8">
            <li>
              <a
                href="#"
                className="block text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300"
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
