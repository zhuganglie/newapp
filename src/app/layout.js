import './globals.css';
import SideBar from './components/SideBar';
import Breadcrumbs from './components/Breadcrumbs';

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="garden">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <div className="flex flex-col min-h-screen">
          <SideBar />
          <div className="ml-64 p-8">
            <Breadcrumbs />
            <main className="container mx-auto px-4 py-8 flex-grow">
              {children}
            </main>
          </div>
        
        </div>
      </body>
    </html>
  )
}
