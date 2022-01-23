import React from 'react';
import { Modal, Button } from 'antd';

function UniModal({
  modalFor,
  children,
  handleCancel,
  isModalVisible = true,
  confirmLoading,
  username,
  description,
  password,
  confirmpassword,
  permission,
  handleSubmit,
}) {
  const getValues = (value = modalFor) => {
    // USER
    if (value == 'addUser') {
      return { modalTitle: 'ADD USER', modalWidth: 470 };
    } else if (value == 'editUser') {
      return { modalTitle: 'EDIT USER', modalWidth: 420 };
    }
    // CUSTOMER
    if (value == 'addCustomer') {
      return ['ADD CUSTOMER', 500];
    } else if (value == 'editCustomer') {
      return 'EDIT CUSTOMER';
    }
    // GADGET
    if (value == 'addGadget') {
      return { modalTitle: 'ADD GADGET', modalWidth: 400 };
    } else if (value == 'editGadget') {
      return { modalTitle: 'EDIT GADGET', modalWidth: 400 };
    }
  };
  console.log(getValues().modalWidth);
  return (
    <Modal
      title={getValues().modalTitle}
      width={getValues().modalWidth}
      closable={false}
      keyboard={true}
      visible={isModalVisible}
      footer={[
        <Button
          type="primary"
          disabled={
            (modalFor == 'addUser' && !username) ||
            !description ||
            !password ||
            !confirmpassword ||
            !permission
          }
          onClick={modalFor == 'addUser' && handleSubmit}
          loading={confirmLoading}
        >
          {modalFor == 'addUser' && 'SAVE'}
        </Button>,
        <Button onClick={handleCancel}>CANCEL</Button>,
      ]}
    >
      {children}
    </Modal>
  );
}

export default UniModal;
