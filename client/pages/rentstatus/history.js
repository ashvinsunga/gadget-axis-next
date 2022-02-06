import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../context';
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
import RentStatusLayout from '../../components/layouts/RentStatusLayout.component';
// import styled from 'styled-components';
import UserVerifier from '../../components/routes/UserVerifier';
import moment from 'moment';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

export default function RentHistory() {
  const [state, setState] = useContext(UserContext);
  const [rents, setRents] = useState([]);
  const [gridApi, setGridApi] = useState(null);

  // data grid

  const columnDefs = [
    { headerName: 'Rented to', field: 'customer.name' },
    { headerName: 'Rented by', field: 'rented_by.username' },
    { headerName: 'Product', field: 'gadget.product' },
    { headerName: 'Model', field: 'gadget.model' },
    { headerName: 'Serial', field: 'gadget.serial' },
    { headerName: 'Gadget rate', field: 'gadget.rate' },
    {
      headerName: 'Rent Start',
      field: 'rent_start',
      cellRenderer: (data) => {
        return moment(data.value).format('llll');
      },
    },
    {
      headerName: 'Rent End',
      field: 'rent_end',
      cellRenderer: (data) => {
        return moment(data.value).format('llll');
      },
    },
    {
      headerName: 'Return date',
      field: 'return_date',
      cellRenderer: (data) => {
        return moment(data.value).format('llll');
      },
    },
    { headerName: 'Total', field: 'total_rate' },
    // { headerName: 'Date Added', field: 'createdAt' },
  ];

  const defaultColDef = {
    sortable: true,
    filter: true,
    floatingFilter: true,
  };

  const onGridReady = (params) => {
    setGridApi(params);
  };

  //--------------------------------------
  useEffect(() => {
    if (state && state.token) listRentHistory();
  }, [state && state.token]);

  const listRentHistory = async () => {
    // axios based data request from the api/server
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_ADMIN_API}/listrenthistory`
      );
      // console.log(data);
      setRents(data);
    } catch (err) {
      console.log(err);
    }
    // native style of requesting data from the api/server
    //   fetch('http://localhost:8000/admin/customers', {
    //   method: 'GET',
    // })onChange
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then((data) => setCustomers(data))
    //   .catch((err) => console.log(err));
  };

  return (
    <UserVerifier>
      <div className="ag-theme-alpine" style={{ height: 550, width: '103%' }}>
        <AgGridReact
          rowData={rents}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          onGridReady={onGridReady}
          onRowClicked={(e) => {
            // console.log(e);
            // setSelecteditem(e.data._id);
          }}
        ></AgGridReact>
      </div>
    </UserVerifier>
  );
}

RentHistory.Layout = RentStatusLayout;

// Styled components
// const UserLists = styled.div`
//   padding: 5px;
// `;

// <UserLists></UserLists>
