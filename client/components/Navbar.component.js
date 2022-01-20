import { useContext } from 'react';
import React from 'react';
import Link from 'next/link';
import { UserContext } from '../context';
import { useRouter } from 'next/router';
import { Divider } from 'antd';

export default function Navbar() {
  const [state, setState] = useContext(UserContext);
  const router = useRouter();

  const logout = () => {
    window.localStorage.removeItem('axistoken');
    setState(null);
    router.push('/');
  };
  return (
    <nav className="nav bg-dark d-flex justify-content-end">
      {state !== null && (
        <>
          <Link href="/">
            <a className="navbar-brand text-light me-auto">
              <img
                src="images/logo-white.png"
                width="40"
                height="30"
                class="d-inline-block align-top h1 "
                alt=""
              />
              ADGET AXIS
            </a>
          </Link>

          <Link href="/users">
            <a className="nav-link text-light">User list</a>
          </Link>

          <a onClick={logout} className="nav-link text-light">
            Logout
          </a>
        </>
      )}
    </nav>
  );
}
