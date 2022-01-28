import { useContext, useEffect, useState } from 'react';
import React from 'react';
import { Avatar, Layout, Menu } from 'antd';
import Link from 'next/link';
import { UserContext } from '../context';
import { useRouter } from 'next/router';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

export default function Navbar() {
  const [current, setCurrent] = useState('');
  const [state, setState] = useContext(UserContext);
  const router = useRouter();
  const { Content, Sider } = Layout;

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
            <Link href="/rentnow">
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

            <Link href="/rentnow">
              <a
                className={`nav-link text-light ${
                  current === '/rentnow' && 'active'
                }`}
              >
                RENT NOW!
              </a>
            </Link>

            <Link href="/users">
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
      {current === '/rentnow' && (
        <Router>
          <Layout hasSider>
            <Sider
              style={{
                overflow: 'auto',
                height: '100vh',
                position: 'fixed',
                left: 0,
                top: 48,
                bottom: 0,
              }}
            >
              <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                <Menu.Item key="1">Nintendo</Menu.Item>
                <Menu.Item key="2">Sony</Menu.Item>
                <Menu.Item key="3">Microsoft</Menu.Item>
              </Menu>
            </Sider>
            <Layout className="site-layout" style={{ marginLeft: 200 }}>
              {/* <Header className="site-layout-background" style={{ padding: 0 }} /> */}
              <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                <div
                  className="site-layout-background"
                  style={{ padding: 24, textAlign: 'center' }}
                >
                  {/* <Routes>
                    <Route path="/test" element={test} />
                  </Routes> */}
                </div>
              </Content>
            </Layout>
          </Layout>
        </Router>
      )}

      {(current === '/users' ||
        current === '/gadgets' ||
        current === '/customers') && (
        <Layout hasSider>
          <Sider
            style={{
              overflow: 'auto',
              height: '100vh',
              position: 'fixed',
              left: 0,
              top: 48,
              bottom: 0,
            }}
          >
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
              <Menu.Item key="1">
                <Link href="/users">Users </Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link href="/gadgets">Gadgets </Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link href="/customers">Customers </Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout className="site-layout" style={{ marginLeft: 200 }}>
            {/* <Header className="site-layout-background" style={{ padding: 0 }} /> */}
            <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
              <div
                className="site-layout-background"
                style={{ padding: 12, textAlign: 'center' }}
              ></div>
            </Content>
          </Layout>
        </Layout>
      )}
    </div>
  );
}
