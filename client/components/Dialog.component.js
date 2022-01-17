import React from 'react';
import { Modal } from 'antd';

export default function Dialog({
  handleSubmit,
  handleCancel,
  isModalVisible,
  formData,
  onChange,
}) {
  const {
    username,
    description,
    phone,
    password,
    confirmpassword,
    permission,
  } = formData;

  return (
    <Modal
      title="ADD USER"
      visible={isModalVisible}
      onOk={handleSubmit}
      okText={'SAVE'}
      onCancel={handleCancel}
      cancelText={'CANCEL'}
      width={470}
      closable={false}
      keyboard={true}
      confirmLoading={false}
    >
      <form>
        {/* <div className="mb-2 row">
          <label for="inputBrand" className="col-sm-2 col-form-label">
            BRAND
          </label>
          <div className="col-sm-10">
            <select className="form-select form-control" id="inputBrand">
              <option value="1">Sony</option>
              <option value="2">Nintendo</option>
              <option value="3">Microsoft</option>
            </select>
          </div>
        </div> */}

        {/* <div className="mb-2 row">
          <label for="inputProduct" className="col-sm-2 col-form-label">
            PRODUCT
          </label>
          <div className="col-sm-10">
            <select className="form-select form-control" id="inputProduct">
              <option value="1">PS4</option>
              <option value="2">PS5</option>
              <option value="3">Nintendo Switch</option>
              <option value="1">Nintendo Switch Lite</option>
              <option value="2">Nintendo Switch OLED</option>
              <option value="3">XBOX 360</option>
            </select>
          </div>
        </div> */}
        <div className="mb-2 row">
          <label for="username" className="col-sm-3 col-form-label">
            USERNAME
          </label>
          <div className="col-sm-6">
            <input
              value={username}
              onChange={(e) => onChange(e)}
              type="text"
              className="form-control"
              id="username"
            />
          </div>
        </div>

        <div className="mb-2 row">
          <label for="description" className="col-sm-3 col-form-label">
            DESCRIPTION
          </label>
          <div className="col-sm-6">
            <input
              value={description}
              onChange={(e) => onChange(e)}
              type="text"
              className="form-control"
              id="description"
            />
          </div>
        </div>

        <div className="mb-2 row">
          <label for="phone" className="col-sm-3 col-form-label">
            PHONE
          </label>
          <div className="col-sm-6">
            <input
              value={phone}
              onChange={(e) => onChange(e)}
              type="text"
              className="form-control"
              id="phone"
            />
          </div>
        </div>

        <div className="mb-2 row">
          <label for="password" className="col-sm-3 col-form-label">
            PASSWORD
          </label>
          <div className="col-sm-6">
            <input
              value={password}
              onChange={(e) => onChange(e)}
              type="text"
              className="form-control"
              id="password"
            />
          </div>
        </div>

        <div className="mb-2 row">
          <label for="confirmpassword" className="col-sm-3 col-form-label">
            CONFIRM PASSWORD
          </label>
          <div className="col-sm-6">
            <input
              value={confirmpassword}
              onChange={(e) => onChange(e)}
              type="text"
              className="form-control"
              id="confirmpassword"
            />
          </div>
        </div>

        <div className="mb-2 row form-group">
          <label for="permission" className="col-sm-3 col-form-label">
            PERMISSION
          </label>
          <div className="col-sm-4">
            <select
              required
              value={permission}
              onChange={(e) => onChange(e)}
              className="form-control"
              id="permission"
            >
              <option value="" selected hidden>
                --
              </option>
              <option>Read only</option>
              <option>Full</option>
            </select>
          </div>
        </div>
      </form>
    </Modal>
  );
}
