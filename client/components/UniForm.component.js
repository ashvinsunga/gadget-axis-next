import React, { useState, useEffect } from 'react';
import { Avatar } from 'antd';
import { CameraOutlined, LoadingOutlined } from '@ant-design/icons';

export default function UniForm({
  // GENERIC
  formFor,
  setIsButtonSaveOff,
  // saveFunction,
  handleDeleteUser,
  handleDeleteGadget,
  handleDeleteCustomer,
  handleEndRent,

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
  // DELETE
  deletionpassword,
  setDeletionpassword,
}) {
  const [current, setCurrent] = useState('');
  const inputs = document.querySelectorAll('input[name]');

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  // regex patterns
  const patterns = {
    phone: /^09[\d]{9}$/,
    username: /^[a-z\d]{5,12}$/i,
    password: /^[\d\w@-]{8,20}$/i,
    newpassword: /^[\d\w@-]{8,20}$/i,
    email: /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/,

    //             yourname @ domain   .  com          ( .uk )
  };

  // validation function
  function validate(field, regex) {
    if (regex.test(field.value)) {
      field.className = 'form-control valid';
    } else {
      field.className = 'form-control invalid';
    }
  }

  // attach keyup events to inputs
  inputs.forEach((input) => {
    input.addEventListener('keyup', (e) => {
      // console.log(patterns[e.target.attributes.name.value]);
      validate(e.target, patterns[e.target.attributes.name.value]);
    });
  });
  return (
    <form>
      {/* DELETE FORM */}
      {(formFor == 'delete' || formFor == 'endRent') && (
        <>
          {setIsButtonSaveOff(!deletionpassword)}
          <div
            htmlFor="deletionpassword"
            className="d-flex justify-content-center mb-2 row"
          >
            {formFor == 'delete'
              ? 'ENTER YOUR PASSWORD TO CONFIRM DELETION'
              : 'ENTER YOUR PASSWORD TO CONFIRM THIS ACTION'}
          </div>
          <div className="d-flex justify-content-center row">
            <div className="col-md-7">
              <input
                onKeyDown={(e) => {
                  if (e.keyCode == 13) {
                    if (current == '/admin/users') {
                      handleDeleteUser();
                      e.preventDefault();
                    } else if (current == '/admin/gadgets') {
                      handleDeleteGadget();
                      e.preventDefault();
                    } else if (current == '/admin/customers') {
                      handleDeleteCustomer();
                      e.preventDefault();
                    } else {
                      handleEndRent();
                      e.preventDefault();
                    }
                  }
                }}
                value={deletionpassword}
                onChange={(e) => {
                  setDeletionpassword(e.target.value);
                }}
                type="password"
                className="form-control"
                id="deletionPassword"
              />
            </div>
          </div>
        </>
      )}
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
                name="username"
                id="username"
              />
              <p>Must contain 5 - 12 characters</p>
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
                name="phone"
                id="phone"
              />
              <p>Must be a valid PH phone no. (11 digits) e.g. '09XXXXXXXXX'</p>
            </div>
          </div>

          {formFor == 'editUser' && (
            <>
              {oldpassword == '' &&
                (setNewPassword(''), setConfirmpassword(''))}

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
                    type="password"
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
                  type="password"
                  className="form-control"
                  name="password"
                  id="password"
                />
                <p>
                  Must alphanumeric (@, _ and - are allowed) and be 8 - 20
                  characters
                </p>
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
                  type="password"
                  className="form-control"
                  name="newpassword"
                  id="newpassword"
                />
                <p>
                  Password must alphanumeric (@, _ and - are also allowed) and
                  be 8 - 20 characters
                </p>
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
                type="password"
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
                <option key="random1">Read only</option>
                <option key="random2">Full</option>
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
                  disabled={formFor == 'editGadget' && true}
                  required
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="form-control"
                  id="brand"
                >
                  <option key="random1" value="" hidden>
                    --
                  </option>

                  <option key="random2">Sony</option>
                  <option key="random3">Nintendo</option>
                  <option key="random4">Microsoft</option>
                </select>
              </div>
            </div>

            <div className="mb-2 row">
              <label htmlFor="product" className="col-sm-4 col-form-label">
                PRODUCT
              </label>
              <div className="col-sm-7">
                <select
                  disabled={!brand}
                  required
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                  className="form-control"
                  id="product"
                >
                  <option key="random1" value="" hidden>
                    --
                  </option>
                  {brand == 'Nintendo' && (
                    <>
                      <option key="random2">Nintendo Switch</option>
                      <option key="random3">Nintendo Switch Lite</option>
                      <option key="random4">Nintendo Switch OLED</option>
                      <option key="random5">New Nintendo 3DS XL</option>
                      <option key="random6">New Nintendo 2DS XL</option>
                      <option key="random7">New Nintendo 3DS</option>
                      <option key="random8">Nintendo 2DS</option>
                      <option key="random9">Nintendo 3DS XL</option>
                      <option key="random10">Nintendo DSi</option>
                      <option key="random11">Nintendo DS</option>
                      <option key="random12">Nintendo Lite</option>
                      <option key="random13">Gameboy Advance</option>
                      <option key="random14">Gameboy Color</option>
                      <option key="random15">Gameboy</option>
                      <option key="random16">Nintendo GameCube</option>
                      <option key="random17">Nintendo 64</option>
                      <option key="random18">SNES</option>
                      <option key="random19">NES</option>
                    </>
                  )}

                  {brand == 'Sony' && (
                    <>
                      <option key="random1">PlayStation 5</option>
                      <option key="random2">PlayStation 4 Pro</option>
                      <option key="random3">PlayStation 4 Slim</option>
                      <option key="random4">PlayStation 4</option>
                      <option key="random5">PlayStation Vita (PS Vita)</option>
                      <option key="random6">PlayStation 3 Super Slim</option>
                      <option key="random7">PlayStation 3 Slim</option>
                      <option key="random8">PlayStation Portable (PSP)</option>
                      <option key="random9">PlayStation 2 Slim</option>
                      <option key="random10">PlayStation 2 </option>
                      <option key="random11">PS One </option>
                      <option key="random12">PlayStation</option>
                    </>
                  )}

                  {brand == 'Microsoft' && (
                    <>
                      <option key="random1">XBOX</option>
                      <option key="random2">XBOX 360</option>
                      <option key="random3">XBOX One</option>
                      <option key="random4">XBOX Series X</option>
                      <option key="random5">XBOX Series S</option>
                    </>
                  )}
                </select>
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
              <select
                required
                value={idpresented}
                onChange={(e) => setIdpresented(e.target.value)}
                className="form-control"
                id="idpresented"
              >
                <option key="random1" value="" hidden>
                  --
                </option>

                <option key="random2">e-Card / UMID</option>
                <option key="random3">Employee’s ID / Office Id</option>
                <option key="random4">Driver’s License</option>
                <option key="random5">BIR (TIN)</option>
                <option key="random6">Passport</option>
                <option key="random7">Senior Citizen ID</option>
                <option key="random8">SSS ID</option>
                <option key="random9">Voter’s ID</option>
                <option key="random10">
                  Philippine Identification (PhilID)
                </option>
                <option key="random11">NBI Clearance</option>
                <option key="random12">Firearms License</option>
                <option key="random13">Pag-ibig ID</option>
                <option key="random14">
                  Person’s With Disability (PWD) ID
                </option>
                <option key="random15">Philippine Postal ID </option>
                <option key="random16">Phil-health ID</option>
                <option key="random17">Barangay ID</option>
                <option key="random18">School ID</option>
              </select>
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
                name="phone"
                id="phone"
              />
              <p>Must be a valid PH phone no. (11 digits) e.g. '09XXXXXXXXX'</p>
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
                name="email"
                id="email"
              />
              <p>Email must be a valid address, e.g. me@mydomain.com</p>
            </div>
          </div>
        </>
      )}
    </form>
  );
}
