import React from 'react';

export default function UserForm({
  // GENERIC
  formFor,
  // USER
  username,
  description,
  phone,
  oldpassword,
  newpassword,
  password,
  confirmpassword,
  permission,
  // GADGET
  brand,
  product,
  model,
  serial,
  color,
  rate,
  // CUSTOMER
  name,
  idpresented,
  idno,
  email,
}) {
  return (
    <form>
      {/* USER FORM */}
      {(formFor == 'addUser' || formFor == 'editUser') && (
        <>
          <div className="mb-2 row">
            <label for="username" className="col-sm-5 col-form-label">
              USERNAME
            </label>
            <div className="col-sm-5">
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
            <label for="description" className="col-sm-5 col-form-label">
              DESCRIPTION
            </label>
            <div className="col-sm-5">
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
            <label for="phone" className="col-sm-5 col-form-label">
              PHONE
            </label>
            <div className="col-sm-5">
              <input
                value={phone}
                onChange={(e) => onChange(e)}
                type="text"
                className="form-control"
                id="phone"
              />
            </div>
          </div>

          {formFor == 'editUser' && (
            <div className="mb-2 row">
              <label for="oldpassword" className="col-sm-5 col-form-label">
                OLD PASSWORD
              </label>
              <div className="col-sm-5">
                <input
                  value={oldpassword}
                  onChange={(e) => onChange(e)}
                  type="text"
                  className="form-control"
                  id="oldpassword"
                />
              </div>
            </div>
          )}
          {/* ALWAYS USE FRAGMENTS WHEN CONDITIONALLY RENDERING MULTIPLE ELEMENTS */}

          {formFor == 'addUser' && (
            <div className="mb-2 row">
              <label for="password" className="col-sm-3 col-form-label">
                PASSWORD
              </label>
              <div className="col-sm-5">
                <input
                  value={password}
                  onChange={(e) => onChange(e)}
                  type="text"
                  className="form-control"
                  id="password"
                />
              </div>
            </div>
          )}
          {formFor == 'editUser' && (
            <div className="mb-2 row ">
              <label for="newpassword" className="col-sm-5 col-form-label ">
                NEW PASSWORD
              </label>

              <div className="col-sm-5">
                <input
                  value={newpassword}
                  onChange={(e) => onChange(e)}
                  type="text"
                  className="form-control"
                  id="newpassword"
                />
              </div>
            </div>
          )}

          <div className="mb-2 row">
            <label for="confirmpassword" className="col-sm-5 col-form-label">
              CONFIRM PASSWORD
            </label>
            <div className="col-sm-5">
              <input
                value={confirmpassword}
                onChange={(e) => onChange(e)}
                type="text"
                className="form-control"
                id="confirmpassword"
              />
            </div>
          </div>

          {formFor == 'addUser' && (
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
          )}
        </>
      )}
      {/* GADGET FORM - the only difference is the submit (add or update)*/}
      {(formFor == 'addGadget' || formFor == 'editGadget') && (
        <div className="mb-2 row form-group">
          <div className="mb-2 row">
            <label for="brand" className="col-sm-3 col-form-label">
              BRAND
            </label>
            <div className="col-sm-4">
              <select
                required
                value={brand}
                onChange={(e) => onChange(e)}
                className="form-control"
                id="brand"
              >
                <option value="" selected hidden>
                  --
                </option>
                <option>Sony</option>
                <option>Nintendo</option>
                <option>Microsoft</option>
              </select>
            </div>
          </div>

          <div className="mb-2 row">
            <label for="product" className="col-sm-3 col-form-label">
              PRODUCT
            </label>
            <div className="col-sm-6">
              <input
                value={product}
                onChange={(e) => onChange(e)}
                type="text"
                className="form-control"
                id="product"
              />
            </div>
          </div>

          <div className="mb-2 row">
            <label for="model" className="col-sm-3 col-form-label">
              MODEL
            </label>
            <div className="col-sm-6">
              <input
                value={model}
                onChange={(e) => onChange(e)}
                type="text"
                className="form-control"
                id="model"
              />
            </div>
          </div>

          <div className="mb-2 row">
            <label for="serial" className="col-sm-3 col-form-label">
              SERIAL
            </label>
            <div className="col-sm-6">
              <input
                value={serial}
                onChange={(e) => onChange(e)}
                type="text"
                className="form-control"
                id="serial"
              />
            </div>
          </div>

          <div className="mb-2 row">
            <label for="color" className="col-sm-3 col-form-label">
              COLOR
            </label>
            <div className="col-sm-6">
              <input
                value={color}
                onChange={(e) => onChange(e)}
                type="text"
                className="form-control"
                id="color"
              />
            </div>
          </div>
          {/* ALWAYS USE FRAGMENTS WHEN CONDITIONALLY RENDERING MULTIPLE ELEMENTS */}

          <div className="mb-2 row">
            <label for="rate" className="col-sm-3 col-form-label">
              RATE
            </label>
            <div className="col-sm-6">
              <input
                value={rate}
                onChange={(e) => onChange(e)}
                type="text"
                className="form-control"
                id="rate"
              />
            </div>
          </div>
        </div>
      )}

      {/* CUSTOMER FORM */}
      {(formFor == 'addCustomer' || formFor == 'editCustomer') && (
        <>
          <div className="mb-2 row">
            <label for="name" className="col-sm-3 col-form-label">
              NAME
            </label>
            <div className="col-sm-6">
              <input
                value={name}
                onChange={(e) => onChange(e)}
                type="text"
                className="form-control"
                id="name"
              />
            </div>
          </div>

          <div className="mb-2 row">
            <label for="idpresented" className="col-sm-3 col-form-label">
              ID PRESENTED
            </label>
            <div className="col-sm-6">
              <input
                value={idpresented}
                onChange={(e) => onChange(e)}
                type="text"
                className="form-control"
                id="idpresented"
              />
            </div>
          </div>

          <div className="mb-2 row">
            <label for="idno" className="col-sm-3 col-form-label">
              ID NO
            </label>
            <div className="col-sm-6">
              <input
                value={idno}
                onChange={(e) => onChange(e)}
                type="text"
                className="form-control"
                id="idno"
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
            <label for="email" className="col-sm-3 col-form-label">
              EMAIL
            </label>
            <div className="col-sm-6">
              <input
                value={email}
                onChange={(e) => onChange(e)}
                type="text"
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
