import React from 'react';
import Link from 'next/link';
import { Menu, Layout } from 'antd';
import UserVerifier from '../routes/UserVerifier';

const { Content, Sider } = Layout;

export default function RentNowLayout({ children }) {
  return (
    <UserVerifier>
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
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
              <Menu.Item key="1">
                <Link href="/rentnow/nintendo">Nintendo</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link href="/rentnow/sony">Sony</Link>
              </Menu.Item>
              <Menu.Item key="3">
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
    </UserVerifier>
  );
}
