import React from 'react';
import { Modal, Button } from 'antd';

function UniModal({
  children,
  // GENERIC
  modalFor,
  modalButtonText,
  handleCancel,
  isModalVisible,
  confirmLoading,
  handleSaveUser,
  isButtonSaveOff,
  // USER > UniForm
  // username,
  // setUsername,
  // description,
  // setDescription,
  // phone,
  // setPhone,
  // password,
  // setPassword,
  // confirmpassword,
  // setConfirmpassword,
  // permission,
  // setPermission,
}) {
  const getValues = (value = modalFor) => {
    // USER
    if (value == 'addUser') {
      return { modalTitle: 'ADD USER', modalWidth: 412 };
    } else if (value == 'editUser') {
      return { modalTitle: 'EDIT USER', modalWidth: 412 };
    }
    // CUSTOMER
    if (value == 'addCustomer') {
      return { modalTitle: 'ADD CUSTOMER', modalWidth: 380 };
    } else if (value == 'editCustomer') {
      return { modalTitle: 'EDIT CUSTOMER', modalWidth: 380 };
    }
    // GADGET
    if (value == 'addGadget') {
      return { modalTitle: 'ADD GADGET', modalWidth: 340 };
    } else if (value == 'editGadget') {
      return { modalTitle: 'EDIT GADGET', modalWidth: 340 };
    }
  };

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
          disabled={isButtonSaveOff}
          onClick={handleSaveUser}
          loading={confirmLoading}
        >
          SAVE
        </Button>,
        <Button onClick={handleCancel}>CANCEL</Button>,
      ]}
    >
      {children}
    </Modal>
  );
}

export default UniModal;
