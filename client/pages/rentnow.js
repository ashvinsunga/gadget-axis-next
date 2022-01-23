import { useContext, useState } from 'react';
import { UserContext } from '../context';
import UserVerifier from '../components/routes/UserVerifier';
import UniModal from '../components/UniModal.component';
import UniForm from '../components/UniForm.component';
import { Tabs } from 'antd';
const { TabPane } = Tabs;

export default function RentNow() {
  const [state, setState] = useContext(UserContext);
  const [modalFor, setModalFor] = useState('editUser');

  return (
    <UserVerifier>
      {state !== null && <h6> {JSON.stringify(state)} Rent now!</h6>}

      <Tabs
        defaultActiveKey="1"
        type="card"
        size="large"
        tabPosition="left"
        tabBarGutter={5}
      >
        <TabPane tab="Nintendo" key="1"></TabPane>
        <TabPane tab="Sony" key="2"></TabPane>
        <TabPane tab="Microsoft" key="3"></TabPane>
      </Tabs>
      <UniModal modalFor={modalFor}>
        <UniForm formFor={modalFor} />
      </UniModal>
    </UserVerifier>
  );
}
