import React from 'react';
import { Modal, Button } from 'antd';

function EndRentModal({
  children,
  // GENERIC
  handleEndRent,
  handleCancel,
  isModalVisible,
  confirmLoading,
  isButtonSaveOff,
}) {
  return (
    <Modal
      title={'END THIS RENT?'}
      width={500}
      closable={false}
      keyboard={true}
      visible={isModalVisible}
      footer={[
        <Button
          type="primary"
          disabled={isButtonSaveOff}
          onClick={handleEndRent}
          loading={confirmLoading}
        >
          CONFIRM
        </Button>,
        <Button
          onClick={() => {
            handleCancel();
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

export default EndRentModal;
