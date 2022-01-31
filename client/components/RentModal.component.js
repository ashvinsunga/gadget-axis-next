import React from 'react';
import { Modal, Button } from 'antd';

function RentModal({
  children,
  // GENERIC
  modalFor,
  handleCancel,
  isModalVisible,
  setIsModalVisible,
  confirmLoading,
  saveFunction,
  isButtonSaveOff,
}) {
  return (
    <Modal
      title="PHP250 / DAY"
      width={500}
      closable={false}
      keyboard={true}
      visible={isModalVisible}
      footer={[
        <Button
          type="primary"
          disabled={isButtonSaveOff}
          onClick={saveFunction}
          loading={confirmLoading}
        >
          CONFIRM
        </Button>,
        <Button onClick={(e) => setIsModalVisible(false)}>CANCEL</Button>,
      ]}
    >
      {children}
    </Modal>
  );
}

export default RentModal;
