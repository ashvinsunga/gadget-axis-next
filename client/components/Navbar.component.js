import { useContext, useEffect, useState } from 'react';
import React from 'react';
import { Avatar, Layout, Menu } from 'antd';
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
    setState(null);
    router.push('/');
  };
  return (
    <div>
      {state !== null && (
        <nav className="nav bg-dark d-flex justify-content-end fixed-top">
          <>
            <Link href="/rentnow/nintendo">
              <a className="navbar-brand text-light me-auto">
                <img
                  src="images/logo-white.png"
                  width="40"
                  height="30"
                  className="d-inline-block align-top h1 "
                  alt="System logo"
                />
                ADGET AXIS
              </a>
            </Link>

            <Link href="/rentnow/nintendo">
              <a
                className={`nav-link text-light ${
                  current === '/rentnow' && 'active'
                }`}
              >
                RENT NOW!
              </a>
            </Link>

            <Link href="/admin/users">
              <a
                className={`nav-link text-light ${
                  current === '/admin' && 'active'
                }`}
              >
                ADMIN
              </a>
            </Link>

            <div>
              <Avatar size={40} className="mt-1">
                {state.user.username}
              </Avatar>
            </div>
            {/* <h6 className="nav-link text-light">
            {'Current User: '}
            {state && state.user && state.user.username}
          </h6> */}

            <a onClick={logout} className="nav-link text-light">
              LOGOUT
            </a>
          </>
        </nav>
      )}
    </div>
  );
}
