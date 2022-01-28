import { Card, Avatar } from 'antd';

const { Meta } = Card;

export default function GadgetCard() {
  return (
    <Card
      hoverable
      style={{ width: 200 }}
      cover={
        <img
          alt="example"
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        />
      }
      //   actions={[
      //     <SettingOutlined key="setting" />,
      //     <EditOutlined key="edit" />,
      //     <EllipsisOutlined key="ellipsis" />,
      //   ]}
    >
      <Meta title="Card title" description="This is the description" />
    </Card>
  );
}
