import { Card } from 'antd';

export default function GadgetCard({
  id,
  product,
  model,
  color,
  rate,
  image_url,
  status,
  currentuserpermission,
  setIsModalVisible,
  setGadgetrate,
  setGadgetstatus,
  setGadgetid,
}) {
  return (
    <>
      <Card
        onClick={() => {
          setGadgetrate(rate);
          setGadgetstatus(status);
          setIsModalVisible(true);
          setGadgetid(id);
        }}
        hoverable={
          currentuserpermission == 'Full' && status == 'Available' && true
        }
        style={
          currentuserpermission == 'Full' && status == 'Available'
            ? {
                marginTop: 10,
                marginRight: 15,
                width: '20%',
                height: '40%',
              }
            : {
                marginTop: 10,
                marginRight: 15,
                width: '20%',
                height: '40%',
                backgroundColor: 'grey',
                opacity: 0.5,
              }
        }
        // style={status != 'Available' && { backgroundColor: 'grey' }}
        // cover={<img alt="example" src={image_url} />}

        // actions={[
        //   <SettingOutlined key="setting" />,
        //   <EditOutlined key="edit" />,
        //   <EllipsisOutlined key="ellipsis" />,
        // ]}
      >
        <div
          style={{
            backgroundImage: 'url(' + image_url + ')',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
            height: '150px',
          }}
        >
          <br />
          <h3>{status != 'Available' && status.toUpperCase()}</h3>
        </div>
        <br />
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
        <h6>PHP {rate} / DAY</h6>
      </Card>
    </>
  );
}
