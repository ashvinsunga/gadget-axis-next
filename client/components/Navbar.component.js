import { useContext, useEffect, useState } from 'react';
import React from 'react';
import Link from 'next/link';
import { UserContext } from '../context';
import { useRouter } from 'next/router';

export default function Navbar() {
  const [current, setCurrent] = useState('');
  const [state, setState] = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  const logout = () => {
    window.localStorage.removeItem('axistoken');
    router.push('/');
    setState(null);
  };
  return (
    <nav className="nav bg-dark d-flex justify-content-end">
      {state !== null && (
        <>
          <Link href="/rentnow">
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
            <a
              className={`nav-link text-light ${
                current === '/users' && 'active'
              }`}
            >
              USERS
            </a>
          </Link>

          <h6 className="nav-link text-light">
            {'Current User: '}
            {state && state.user && state.user.username}
          </h6>

          <a onClick={logout} className="nav-link text-light">
            LOGOUT
          </a>
        </>
      )}
    </nav>
  );
}
