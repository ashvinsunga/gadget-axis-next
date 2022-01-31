import React, { useState } from 'react';
import { DatePicker, Space } from 'antd';

export default function RentForm({
  // GENERIC
  setIsButtonSaveOff,
  customer,
  setCustomer,
}) {
  const { RangePicker } = DatePicker;
  return (
    <form>
      {/* {setIsButtonSaveOff(
                !username ||
                  !description ||
                  !password ||
                  !confirmpassword ||
                  !permission} */}

      <div className="mb-2 row">
        <label htmlFor="brand" className="col-sm-3 col-form-label">
          CUSTOMER
        </label>
        <div className="col-sm-7">
          <select
            required
            value={customer}
            onChange={(e) => setCustomer(e.target.value)}
            className="form-control"
            id="customer"
          >
            <option value="" hidden>
              --
            </option>
            <option>Customer 1</option>
            <option>Customer 2</option>
            <option>Customer 3</option>
          </select>
        </div>
      </div>

      <div className="mb-2 row">
        <label htmlFor="username" className="col-sm-3 col-form-label">
          DATES
        </label>
        <div className="col-sm-7">
          <RangePicker />
        </div>
      </div>
    </form>
  );
}
