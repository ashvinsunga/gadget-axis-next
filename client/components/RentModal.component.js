import React from 'react';
import { Modal, Button, DatePicker } from 'antd';

function RentModal({
  children,
  // GENERIC
  isModalVisible,
  setIsModalVisible,
  clearRentForm,
  confirmLoading,
  confirmFunction,
  currentuserpermission,
  isbuttonsaveoff,
  gadgetstatus,
  gadgetrate,
}) {
  return (
    <Modal
      title={`PHP ${gadgetrate} / DAY `}
      width={500}
      closable={false}
      keyboard={true}
      visible={
        currentuserpermission == 'Full' &&
        gadgetstatus == 'Available' &&
        isModalVisible
      }
      footer={[
        <Button
          type="primary"
          disabled={isbuttonsaveoff}
          onClick={confirmFunction}
          loading={confirmLoading}
        >
          CONFIRM
        </Button>,
        <Button
          onClick={() => {
            setIsModalVisible(false);
            clearRentForm();
          }}
        >
          CANCEL
        </Button>,
      ]}
    >
      {children}
    </Modal>
  );
}

export default RentModal;
