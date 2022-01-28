import { useContext, useState } from 'react';
import { UserContext } from '../context';
import UserVerifier from '../components/routes/UserVerifier';
import UniModal from '../components/UniModal.component';
import UniForm from '../components/UniForm.component';
import GadgetCard from '../components/GadgetCard.component';
import { Tabs, Layout } from 'antd';
const { TabPane } = Tabs;
const { Content } = Layout;
export default function RentNow() {
  const [state, setState] = useContext(UserContext);
  const [modalFor, setModalFor] = useState('addUser');

  return (
    <UserVerifier>
      <div>
        <Tabs
          defaultActiveKey="1"
          type="card"
          size="large"
          tabPosition="left"
          centered
          style={{ height: 470 }}
        >
          <TabPane tab="Nintendo" key="1">
            <Layout>
              <Layout className="site-layout" style={{ marginLeft: 200 }}>
                {/* <Header className="site-layout-background" style={{ padding: 0 }} /> */}
                <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                  <div
                    className="site-layout-background"
                    style={{ padding: 24, textAlign: 'center' }}
                  >
                    <GadgetCard />
                    <GadgetCard />
                    <GadgetCard />
                    <GadgetCard />
                    <GadgetCard />
                    <GadgetCard />
                    <GadgetCard />
                    <GadgetCard />
                    <GadgetCard />
                    <GadgetCard />
                    <GadgetCard />
                    <GadgetCard />
                    <GadgetCard />
                  </div>
                </Content>
              </Layout>
            </Layout>
          </TabPane>
          <TabPane tab="Sony" key="2"></TabPane>
          <TabPane tab="Microsoft" key="3"></TabPane>
        </Tabs>
        <UniModal modalFor={modalFor}>
          <UniForm formFor={modalFor} />
        </UniModal>
      </div>
    </UserVerifier>
  );
}
