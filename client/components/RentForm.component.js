import React, { useState } from 'react';
import { DatePicker, Button } from 'antd';

export default function RentForm({
  // GENERIC
  setIsButtonSaveOff,
  customername,
  setCustomername,
  nintendorate,
  days,
  setDays,
  customers,
}) {
  let startDate = '';
  let endDate = '';

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
        <label htmlFor="customer" className="col-sm-3 col-form-label">
          CUSTOMER
        </label>
        <div className="col-sm-7">
          <select
            required
            value={customername}
            onChange={(e) => setCustomername(e.target.value)}
            className="form-control"
            id="customer"
          >
            <option value="" hidden>
              --
            </option>
            {customers &&
              customers.map((customer) => (
                <>
                  <option>{customer.name}</option>
                </>
              ))}
          </select>
        </div>
      </div>

      <div className="mb-2 row">
        <label htmlFor="dates" className="col-sm-3 col-form-label">
          DATES
        </label>
        <div className="col-sm-7 mb-4">
          <RangePicker
            showNow={true}
            onCalendarChange={(e) => {
              const oneDay = 1000 * 60 * 60 * 24;
              try {
                startDate = e[0]._d;
              } catch (err) {
                startDate = '';
              }

              try {
                endDate = e[1]._d;
              } catch (err) {
                endDate = '';
              }
              const diffInTime = endDate - startDate;
              setDays(diffInTime / oneDay);
            }}
          />
        </div>
      </div>

      <div className="mb-2 row">
        <div className="col-sm-3 col-form-label">TOTAL</div>
        <div className="col-sm-7 mb-2">
          <Button type="primary" danger ghost shape="round">
            PHP {nintendorate * days}
          </Button>
        </div>
      </div>
    </form>
  );
}
