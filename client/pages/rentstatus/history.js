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
  const cellStyle = { 'background-color': '#DFDFDF', textAlign: 'left' };
  // data grid

  const columnDefs = [
    {
      headerName: 'Rented to',
      field: 'customer.name',
      cellStyle: cellStyle,
    },
    {
      headerName: 'Rented by',
      field: 'rented_by.username',
      cellStyle: cellStyle,
    },
    {
      headerName: 'Product',
      field: 'gadget.product',
      cellStyle: cellStyle,
      type: 'leftAligned',
    },
    { headerName: 'Model', field: 'gadget.model', cellStyle: cellStyle },
    { headerName: 'Serial', field: 'gadget.serial', cellStyle: cellStyle },
    { headerName: 'Gadget rate', field: 'gadget.rate', cellStyle: cellStyle },
    {
      headerName: 'Rent Start',
      field: 'rent_start',
      cellStyle: cellStyle,
      cellRenderer: (data) => {
        return moment(data.value).format('llll');
      },
    },
    {
      headerName: 'Rent End',
      field: 'rent_end',
      width: 220,

      cellStyle: cellStyle,
      cellRenderer: (data) => {
        return moment(data.value).format('llll');
      },
    },
    {
      headerName: 'Return date',
      field: 'return_date',
      width: 220,
      cellStyle: cellStyle,
      cellRenderer: (data) => {
        return moment(data.value).format('llll');
      },
    },
    { headerName: 'Total', field: 'total_rate', cellStyle: cellStyle },
    // { headerName: 'Date Added', field: 'createdAt' },
  ];

  const defaultColDef = {
    resizable: true,
    sortable: true,
    filter: true,
    // floatingFilter: true,
  };

  const autoSizeColumns = (params) => {
    const colIds = params.columnApi
      .getAllDisplayedColumns()
      .map((col) => col.getColId());

    params.columnApi.autoSizeColumns(colIds);
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
          onFirstDataRendered={autoSizeColumns}
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
