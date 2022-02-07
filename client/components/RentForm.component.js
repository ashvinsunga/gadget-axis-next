import React from 'react';
import { DatePicker, Button } from 'antd';

export default function RentForm({
  // GENERIC

  setIsbuttonsaveoff,
  customername,
  setCustomerid,
  setCustomername,
  gadgetrate,
  startDate,
  setStartdate,
  endDate,
  setEnddate,
  days,
  setDays,
  customers,
  totalrate,
  setTotalrate,
}) {
  const { RangePicker } = DatePicker;

  const diffInTime = endDate - startDate;

  setDays(diffInTime / (1000 * 60 * 60 * 24));
  return (
    <form>
      {/* {setIsButtonSaveOff(
                !username ||
                  !description ||
                  !password ||
                  !confirmpassword ||
                  !permission} */}

      <div className="mb-2 row">
        {setIsbuttonsaveoff(!customername || !startDate || !endDate)}
        <label htmlFor="customer" className="col-sm-3 col-form-label">
          CUSTOMER
        </label>
        <div className="col-sm-7">
          <select
            required
            value={customername}
            onChange={(e) => {
              setCustomername(e.target.value);
              setCustomerid(e.target.selectedOptions[0].id);
            }}
            className="form-control"
            id="customer"
          >
            <option value="" hidden>
              --
            </option>
            {customers &&
              customers.map((customer) => (
                <>
                  <option id={customer._id}>{customer.name}</option>
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
            onChange={(e) => {
              try {
                setStartdate(e[0]._d);
              } catch (err) {
                setStartdate('');
              }

              try {
                setEnddate(e[1]._d);
              } catch (err) {
                setEnddate('');
              }
            }}
          />
        </div>
      </div>

      <div className="mb-2 row">
        <div className="col-sm-3 col-form-label">TOTAL</div>
        <div className="col-sm-7 mb-2">
          <Button type="primary" danger ghost shape="round">
            {setTotalrate(gadgetrate * days)}
            PHP {totalrate}
          </Button>
        </div>
      </div>
    </form>
  );
}
