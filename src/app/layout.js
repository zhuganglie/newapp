import './globals.css';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  )
}
