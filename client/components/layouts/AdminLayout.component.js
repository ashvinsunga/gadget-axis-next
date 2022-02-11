import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, Layout } from 'antd';
import UserVerifier from '../routes/UserVerifier';

const { Content, Sider } = Layout;

export default function AdminLayout({ children }) {
  const [current, setCurrent] = useState('');

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);
  return (
    <UserVerifier>
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
              <Menu.Item key="/admin/users">
                <Link href="/admin/users">Users</Link>
              </Menu.Item>
              <Menu.Item key="/admin/gadgets">
                <Link href="/admin/gadgets">Gadgets</Link>
              </Menu.Item>
              <Menu.Item key="/admin/customers">
                <Link href="/admin/customers">Customers</Link>
              </Menu.Item>
            </Menu>
            <br />
            <br />
            <br />
            <br />

            <div className="container row text-warning">
              • Only users with full permission are allowed to edit and delete
              records
              <br />
              <br />• Highlighted record has an ongoing transaction and cannot
              be modified or deleted
            </div>
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
    </UserVerifier>
  );
}
