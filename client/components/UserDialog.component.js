import React from 'react';
import { Modal, Button } from 'antd';
import UserForm from './UserForm.component';

export default function UserDialog({
  handleSubmit,
  handleCancel,
  isModalVisible,
  formData,
  onChange,
  confirmLoading,
}) {
  const { username, description, password, confirmpassword, permission } =
    formData;

  return (
    <Modal
      title="ADD USER"
      width={470}
      closable={false}
      keyboard={true}
      visible={isModalVisible}
      footer={[
        <Button
          type="primary"
          disabled={
            !username ||
            !description ||
            !password ||
            !confirmpassword ||
            !permission
          }
          onClick={handleSubmit}
          loading={confirmLoading}
        >
          SAVE
        </Button>,
        <Button onClick={handleCancel}>CANCEL</Button>,
      ]}
    >
      <UserForm formData={formData} onChange={onChange} />
    </Modal>
  );
}
