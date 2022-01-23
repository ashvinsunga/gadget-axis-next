import React from 'react';

export default function UserForm({ formData, onChange }) {
  const {
    modalType,
    username,
    description,
    phone,
    password,
    confirmpassword,
    permission,
  } = formData;

  return (
    <form>
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
  );
}
