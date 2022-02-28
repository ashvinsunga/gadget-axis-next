import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, Layout } from 'antd';
import { UserContext } from '../../context';

const { Content, Sider } = Layout;

export default function RentStatusLayout({ children }) {
  const [current, setCurrent] = useState('');
  const [state, setState] = useState(UserContext);

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
            top: 44,
            bottom: 0,
          }}
        >
          <Menu theme="dark" mode="inline" defaultSelectedKeys={[current]}>
            <Menu.Item key="/rentstatus/current">
              <Link href="/rentstatus/current">Current</Link>
            </Menu.Item>
            <Menu.Item key="/rentstatus/history">
              <Link href="/rentstatus/history">History</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout" style={{ marginLeft: 160 }}>
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
