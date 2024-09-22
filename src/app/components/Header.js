"use client"



export default function Header() {

  return (
    <header className="bg-gray-900">
      <nav className="container mx-auto px-4 py-6 flex items-center justify-between">
        <ul className="flex space-x-6">
          <li>
            <Link href="/" className="text-white hover:text-gray-300 font-medium">
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" className="text-white hover:text-gray-300 font-medium">
              About
            </Link>
          </li>
          <li>
            <Link href="/contact" className="text-white hover:text-gray-300 font-medium">
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
