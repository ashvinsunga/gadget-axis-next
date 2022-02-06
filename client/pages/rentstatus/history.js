import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../context';
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
import RentStatusLayout from '../../components/layouts/RentStatusLayout.component';
// import styled from 'styled-components';
import { Button, Row, Col } from 'antd';
import { toast } from 'react-toastify';
import UserVerifier from '../../components/routes/UserVerifier';
import moment from 'moment';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import UniModal from '../../components/UniModal.component';
import UniForm from '../../components/UniForm.component';

export default function RentHistory() {
  const [state, setState] = useContext(UserContext);
  const [rents, setRents] = useState([]);
  const [gridApi, setGridApi] = useState(null);
  const [ok, setOk] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [selecteditem, setSelecteditem] = useState('');
  // for modal
  const [modalFor, setModalFor] = useState('addGadget');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isButtonSaveOff, setIsButtonSaveOff] = useState(true);
  // for form
  const [brand, setBrand] = useState('');
  const [product, setProduct] = useState('');
  const [model, setModel] = useState('');
  const [serial, setSerial] = useState('');
  const [image, setImage] = useState({});
  const [uploading, setUploading] = useState(false);
  const [color, setColor] = useState('');
  const [rate, setRate] = useState('');

  const [deletionpassword, setDeletionpassword] = useState('');
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
      headerName: 'Actual return date',
      field: 'actual_return_date',
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

  // modal
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    modalFor == 'addGadget' || modalFor == 'editGadget'
      ? clearFormGadget()
      : setDeletionpassword('');
  };

  //clear form
  const clearFormGadget = () => {
    setBrand('');
    setProduct('');
    setModel('');
    setSerial('');
    setImage({});
    setColor('');
    setRate('');
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
