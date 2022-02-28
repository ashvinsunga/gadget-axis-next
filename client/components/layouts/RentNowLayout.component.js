import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, Layout } from 'antd';

const { Content, Sider } = Layout;

export default function RentNowLayout({ children }) {
  const [current, setCurrent] = useState('');

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);
  return (
    <div>
      <Layout hasSider>
        <Sider
          style={{
            height: '100vh',
            position: 'fixed',
            left: 0,
            top: 48,
            bottom: 0,
          }}
        >
          <br />
          <div className="container text-light">WHICH GADGET?</div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={[current]}>
            <Menu.Item key="/rentnow/nintendo">
              <Link href="/rentnow/nintendo">Nintendo</Link>
            </Menu.Item>
            <Menu.Item key="/rentnow/sony">
              <Link href="/rentnow/sony">Sony</Link>
            </Menu.Item>
            <Menu.Item key="/rentnow/microsoft">
              <Link href="/rentnow/microsoft">Microsoft</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout" style={{ marginLeft: 200 }}>
          {/* <Header className="site-layout-background" style={{ padding: 0 }} /> */}
          <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            <div
              className="site-layout-background"
              style={{ padding: 24, textAlign: 'center' }}
            >
              {children}
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}
