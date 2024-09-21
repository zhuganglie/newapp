import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Header() {
  const router = useRouter();
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link href="/" className={router.pathname === '/' ? 'active' : ''}>Home</Link>
          </li>
          <li>
            <Link href="/about" className={router.pathname === '/about' ? 'active' : ''}>About</Link>
          </li>
          <li>
            <Link href="/tags" className={router.pathname === '/tags' ? 'active' : ''}>Tags</Link>
          </li>
        </ul>
      </nav>
      <style jsx>{`
        .active {
          font-weight: bold;
        }
      `}</style>
    </header>
  );
}
