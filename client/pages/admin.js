import React from 'react';
import { Tabs } from 'antd';
import Users from './users';
import Gadgets from './gadgets';
import Customers from './customers';
import UserVerifier from '../components/routes/UserVerifier';

export default function Admin() {
  const { TabPane } = Tabs;
  return (
    <UserVerifier>
      <Tabs tabPosition="left" size="large" centered="true" type="card">
        <TabPane tab="Users" key="1" style={{ minHeight: '75vh' }}>
          <Users key={1} />
        </TabPane>
        <TabPane tab="Gadgets" key="2" style={{ minHeight: '75vh' }}>
          <Gadgets key={2} />
        </TabPane>
        <TabPane tab="Customers" key="3" style={{ minHeight: '75vh' }}>
          <Customers key={3} />
        </TabPane>
      </Tabs>
    </UserVerifier>
  );
}
