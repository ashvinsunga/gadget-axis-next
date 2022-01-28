import React, { useState } from 'react';
import { Avatar } from 'antd';
import { CameraOutlined, LoadingOutlined } from '@ant-design/icons';
export default function UserForm({
  // GENERIC
  formFor,
  setIsButtonSaveOff,

  // USER
  username,
  setUsername,
  description,
  setDescription,
  phone,
  setPhone,
  // for edit function
  oldpassword,
  setOldPassword,
  newpassword,
  setNewPassword,
  //
  password,
  setPassword,
  confirmpassword,
  setConfirmpassword,
  permission,
  setPermission,

  // GADGET
  handleUploadImage,
  uploading,
  brand,
  setBrand,
  product,
  setProduct,
  model,
  setModel,
  serial,
  setSerial,
  image,
  color,
  setColor,
  rate,
  setRate,
  // CUSTOMER
  name,
  setName,
  idpresented,
  setIdpresented,
  idno,
  setIdno,
  email,
  setEmail,
}) {
  const [checkDefault, setCheckDefault] = useState(null);
  return (
    <form>
      {/* USER FORM */}
      {(formFor == 'addUser' || formFor == 'editUser') && (
        <>
          {formFor == 'addUser'
            ? setIsButtonSaveOff(
                !username ||
                  !description ||
                  !password ||
                  !confirmpassword ||
                  !permission
              )
            : setIsButtonSaveOff(!description)}

          <div className="mb-2 row">
            <label htmlFor="username" className="col-sm-5 col-form-label">
              USERNAME
            </label>
            <div className="col-sm-6">
              <input
                value={username}
                disabled={formFor == 'editUser' && true}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                type="text"
                className="form-control"
                id="username"
              />
            </div>
          </div>

          <div className="mb-2 row">
            <label htmlFor="description" className="col-sm-5 col-form-label">
              DESCRIPTION
            </label>
            <div className="col-sm-6">
              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                type="text"
                className="form-control"
                id="description"
              />
            </div>
          </div>

          <div className="mb-2 row">
            <label htmlFor="phone" className="col-sm-5 col-form-label">
              PHONE
            </label>
            <div className="col-sm-6">
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="text"
                className="form-control"
                id="phone"
              />
            </div>
          </div>

          {formFor == 'editUser' && (
            <>
              {oldpassword == '' &&
                (setConfirmpassword(''), setNewPassword(''))}

              <div className="mb-2 row">
                <label
                  htmlFor="oldpassword"
                  className="col-sm-5 col-form-label"
                >
                  OLD PASSWORD
                </label>
                <div className="col-sm-6">
                  <input
                    value={oldpassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    type="text"
                    className="form-control"
                    id="oldpassword"
                  />
                </div>
              </div>
            </>
          )}

          {formFor == 'addUser' && (
            <div className="mb-2 row">
              <label htmlFor="password" className="col-sm-5 col-form-label">
                PASSWORD
              </label>
              <div className="col-sm-6">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="text"
                  className="form-control"
                  id="password"
                />
              </div>
            </div>
          )}
          {formFor == 'editUser' && (
            <div className="mb-2 row ">
              <label htmlFor="newpassword" className="col-sm-5 col-form-label ">
                NEW PASSWORD
              </label>

              <div className="col-sm-6">
                <input
                  value={newpassword}
                  disabled={formFor == 'editUser' && !oldpassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  type="text"
                  className="form-control"
                  id="newpassword"
                />
              </div>
            </div>
          )}

          <div className="mb-2 row">
            <label
              htmlFor="confirmpassword"
              className="col-sm-5 col-form-label"
            >
              CONFIRM PASSWORD
            </label>
            <div className="col-sm-6">
              <input
                value={confirmpassword}
                disabled={formFor == 'editUser' && !oldpassword}
                onChange={(e) => setConfirmpassword(e.target.value)}
                type="text"
                className="form-control"
                id="confirmpassword"
              />
            </div>
          </div>

          <div className="mb-2 row form-group">
            <label htmlFor="permission" className="col-sm-5 col-form-label">
              PERMISSION
            </label>
            <div className="col-sm-4">
              <select
                required
                value={permission}
                onChange={(e) => setPermission(e.target.value)}
                className="form-control"
                id="permission"
              >
                <option value="" hidden>
                  --
                </option>
                <option>Read only</option>
                <option>Full</option>
              </select>
            </div>
          </div>
        </>
      )}
      {/* GADGET FORM - the only difference is the submit (add or update)*/}
      {(formFor == 'addGadget' || formFor == 'editGadget') && (
        <>
          {setIsButtonSaveOff(
            !brand || !product || !model || !serial || !color || !rate
          )}
          <div className="mb-2 row form-group">
            <div className="mb-2 row">
              <label htmlFor="brand" className="col-sm-4 col-form-label">
                BRAND
              </label>
              <div className="col-sm-5">
                <select
                  required
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="form-control"
                  id="brand"
                >
                  <option value="" hidden>
                    --
                  </option>
                  <option>Sony</option>
                  <option>Nintendo</option>
                  <option>Microsoft</option>
                </select>
              </div>
            </div>

            <div className="mb-2 row">
              <label htmlFor="product" className="col-sm-4 col-form-label">
                PRODUCT
              </label>
              <div className="col-sm-7">
                <input
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                  type="text"
                  className="form-control"
                  id="product"
                />
              </div>
            </div>

            <div className="mb-2 row">
              <label htmlFor="model" className="col-sm-4 col-form-label">
                MODEL
              </label>
              <div className="col-sm-7">
                <input
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  type="text"
                  className="form-control"
                  id="model"
                />
              </div>
            </div>

            <div className="mb-2 row">
              <label htmlFor="serial" className="col-sm-4 col-form-label">
                SERIAL
              </label>
              <div className="col-sm-7">
                <input
                  value={serial}
                  onChange={(e) => setSerial(e.target.value)}
                  type="text"
                  className="form-control"
                  id="serial"
                />
              </div>
            </div>

            <div className="mb-2 row">
              <label htmlFor="gadgetimage" className="col-sm-4 col-form-label">
                IMAGE
              </label>

              <div className="col-sm-5 mt-1">
                <label>
                  {image && image.url ? (
                    <Avatar size={30} src={image.url} />
                  ) : uploading ? (
                    <LoadingOutlined />
                  ) : (
                    <CameraOutlined />
                  )}

                  <input
                    onChange={handleUploadImage}
                    type="file"
                    accept="images/*"
                    hidden
                    className="form-control"
                    id="gadgetimage"
                  />
                </label>
              </div>
            </div>

            <div className="mb-2 row">
              <label htmlFor="color" className="col-sm-4 col-form-label">
                COLOR
              </label>
              <div className="col-sm-4">
                <input
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  type="text"
                  className="form-control"
                  id="color"
                />
              </div>
            </div>

            <div className="mb-2 row">
              <label htmlFor="rate" className="col-sm-4 col-form-label">
                RATE
              </label>
              <div className="col-sm-4">
                <input
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                  type="number"
                  className="form-control"
                  id="rate"
                />
              </div>
            </div>
          </div>
        </>
      )}

      {/* CUSTOMER FORM */}
      {(formFor == 'addCustomer' || formFor == 'editCustomer') && (
        <>
          {setIsButtonSaveOff(!name || !idpresented || !idno || !phone)}
          <div className="mb-2 row">
            <label htmlFor="name" className="col-sm-4 col-form-label">
              NAME
            </label>
            <div className="col-sm-6">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                className="form-control"
                id="name"
              />
            </div>
          </div>

          <div className="mb-2 row">
            <label htmlFor="idpresented" className="col-sm-4 col-form-label">
              ID PRESENTED
            </label>
            <div className="col-sm-6">
              <input
                value={idpresented}
                onChange={(e) => setIdpresented(e.target.value)}
                type="text"
                className="form-control"
                id="idpresented"
              />
            </div>
          </div>

          <div className="mb-2 row">
            <label htmlFor="idno" className="col-sm-4 col-form-label">
              ID NO
            </label>
            <div className="col-sm-6">
              <input
                value={idno}
                onChange={(e) => setIdno(e.target.value)}
                type="text"
                className="form-control"
                id="idno"
              />
            </div>
          </div>

          <div className="mb-2 row">
            <label htmlFor="phone" className="col-sm-4 col-form-label">
              PHONE
            </label>
            <div className="col-sm-6">
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="text"
                className="form-control"
                id="phone"
              />
            </div>
          </div>

          <div className="mb-2 row">
            <label htmlFor="email" className="col-sm-4 col-form-label">
              EMAIL
            </label>
            <div className="col-sm-6">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="form-control"
                id="email"
              />
            </div>
          </div>
        </>
      )}
    </form>
  );
}
