import React from 'react';
import Link from 'next/link';
import { Menu, Layout } from 'antd';

const { Content, Sider } = Layout;

export default function AdminLayout({ children }) {
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
          <Menu theme="dark" mode="inline">
            <Menu.Item key="1">
              <Link href="/admin/users">Users</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link href="/admin/gadgets">Gadgets</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link href="/admin/customers">Customers</Link>
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
