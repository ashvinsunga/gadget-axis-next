import React from 'react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="nav bg-dark d-flex justify-content-end">
      <Link href="/">
        <a className="nav-link text-light">Login</a>
      </Link>

      <Link href="/users">
        <a className="nav-link text-light">User list</a>
      </Link>
    </nav>
  );
}
