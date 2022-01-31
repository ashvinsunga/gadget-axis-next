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
  nintendostatus,
  nintendorate,

}) {
  return (
    <Modal
      title={`PHP ${nintendorate} / DAY`}
      width={500}
      closable={false}
      keyboard={true}
      visible={nintendostatus == 'Available' && isModalVisible}
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
