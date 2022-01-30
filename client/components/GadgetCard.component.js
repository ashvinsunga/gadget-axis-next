import { Card, Button } from 'antd';

const { Meta } = Card;

export default function GadgetCard({
  product,
  model,
  serial,
  color,
  rate,
  image_url,
  status,
}) {
  return (
    // <Card
    //   hoverable
    //   type="inner"
    //   title={
    //     <h5>
    //       {product} : {color}
    //     </h5>
    //   }
    //   size="small"
    // >
    <Card
      hoverable
      style={{ marginTop: 10, marginRight: 15, width: '20%', height: '40%' }}
      cover={<img alt="example" src={image_url} />}
      onClick={(e) => console.log('BOOM!!!')}
      // actions={[
      //   <SettingOutlined key="setting" />,
      //   <EditOutlined key="edit" />,
      //   <EllipsisOutlined key="ellipsis" />,
      // ]}
    >
      {/* <Meta title={`${product}`} style={{ textAlign: 'left' }} /> */}
      <h6> {product}</h6>
      {
        <div style={{ textAlign: 'left' }}>
          <ul>
            <li>Color: {color}</li>
            <li>Model: {model}</li>
          </ul>
        </div>
      }
      <h6>PHP{rate} / DAY</h6>
    </Card>
  );
}
