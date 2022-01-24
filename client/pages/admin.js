import React from 'react';
import { Tabs } from 'antd';
import Users from './users';
import Gadgets from './gadgets';
import Customers from './customers';

export default function Admin() {
  const { TabPane } = Tabs;
  return (
    <Tabs tabPosition="left" size="large" centered="true">
      <TabPane tab="Users" key="1" style={{ minHeight: '75vh' }}>
        <Users />
      </TabPane>
      <TabPane tab="Gadgets" key="2" style={{ minHeight: '75vh' }}>
        <Gadgets />
      </TabPane>
      <TabPane tab="Customers" key="3" style={{ minHeight: '75vh' }}>
        <Customers />
      </TabPane>
    </Tabs>
  );
}
