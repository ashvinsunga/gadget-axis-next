import React from 'react';
import { Modal, Button, DatePicker } from 'antd';

function RentModal({
  children,
  // GENERIC
  modalFor,
  handleCancel,
  isModalVisible,
  setIsModalVisible,
  clearRentForm,
  confirmLoading,
  confirmFunction,
  isButtonSaveOff,
  setDays,
  nintendostatus,
  nintendorate,
  setCustomername,
  setStartdate,
  setEnddate,
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
          onClick={confirmFunction}
          loading={confirmLoading}
        >
          CONFIRM
        </Button>,
        <Button
          onClick={(e) => {
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
