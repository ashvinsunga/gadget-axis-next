import React from 'react';
import { Modal, Button } from 'antd';

function UniModal({
  children,
  // GENERIC
  modalFor,
  handleCancel,
  isModalVisible,
  confirmLoading,
  saveFunction,
  isButtonSaveOff,
  deleteFunction,
}) {
  const getValues = (value = modalFor) => {
    // USER
    if (value == 'addUser') {
      return { modalTitle: 'ADD USER', modalWidth: 412 };
    } else if (value == 'editUser') {
      return { modalTitle: 'EDIT USER', modalWidth: 412 };
    } else if (value == 'delete') {
      return { modalTitle: 'DELETE USER', modalWidth: 412 };
    }
    // CUSTOMER
    if (value == 'addCustomer') {
      return { modalTitle: 'ADD CUSTOMER', modalWidth: 380 };
    } else if (value == 'editCustomer') {
      return { modalTitle: 'EDIT CUSTOMER', modalWidth: 380 };
    }
    // GADGET
    if (value == 'addGadget') {
      return { modalTitle: 'ADD GADGET', modalWidth: 430 };
    } else if (value == 'editGadget') {
      return { modalTitle: 'EDIT GADGET', modalWidth: 430 };
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
          onClick={modalFor == 'delete' ? deleteFunction : saveFunction}
          loading={confirmLoading}
        >
          {modalFor != 'delete' ? 'SAVE' : 'DELETE'}
        </Button>,
        <Button
          onClick={() => {
            handleCancel();
            const inputs = document.querySelectorAll('input[name]');
            inputs.forEach((input) => {
              input.classList.remove('invalid');
            });
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

export default UniModal;
