import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../context';
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
// import styled from 'styled-components';
import { Button } from 'antd';
import { toast } from 'react-toastify';
import moment from 'moment';
// import io from 'socket.io-client';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import UniModal from '../../components/UniModal.component';
import UniForm from '../../components/UniForm.component';

import AdminLayout from '../../components/layouts/AdminLayout.component';

export default function Customers() {
  // const socket = io(process.env.NEXT_PUBLIC_SOCKETIO, {
  //   reconnection: true,
  // });
  const [state, setState] = useContext(UserContext);
  const [customers, setCustomers] = useState([]);
  const [iocustomers, setIocustomers] = useState([]);
  const [gridApi, setGridApi] = useState(null);
  const [ok, setOk] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [selecteditem, setSelecteditem] = useState('');
  // for modal
  const [modalFor, setModalFor] = useState('addCustomer');
  const [isModalVisible, setIsModalVisible] = useState(false);
  // for form
  const [name, setName] = useState('');
  const [idpresented, setIdpresented] = useState('');
  const [idno, setIdno] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [deletionpassword, setDeletionpassword] = useState('');
  const [currentuserpermission, setCurrentuserpermission] = useState('');

  // modal and form
  const [buttondisabled, setButtondisabled] = useState(true);
  const [isButtonSaveOff, setIsButtonSaveOff] = useState(true);
  // data grid

  function changeRowColor(params) {
    if (params.data.current_rent.length > 0) {
      return { 'background-color': '#A2E860', textAlign: 'left' };
    } else {
      return { textAlign: 'left' };
    }
  }

  const columnDefs = [
    { headerName: 'Name', field: 'name', cellStyle: changeRowColor },
    {
      headerName: 'ID Presented',
      field: 'id_presented',
      cellStyle: changeRowColor,
    },
    { headerName: 'ID No.', field: 'id_no', cellStyle: changeRowColor },
    { headerName: 'Phone', field: 'phone', cellStyle: changeRowColor },
    { headerName: 'Email', field: 'email', cellStyle: changeRowColor },
    {
      headerName: 'Date added',
      field: 'createdAt',
      cellStyle: changeRowColor,
      cellRenderer: (data) => {
        return moment(data.value).format('llll');
      },
    },
  ];

  const defaultColDef = {
    resizable: true,
    sortable: true,
    filter: true,
    floatingFilter: true,
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

  // modal
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);

    modalFor == 'addCustomer' || modalFor == 'editCustomer'
      ? clearFormCustomer()
      : setDeletionpassword('');
  };

  //clear form
  const clearFormCustomer = () => {
    setName('');
    setIdpresented('');
    setIdno('');
    setPhone('');
    setEmail('');
  };

  //--------------------------------------
  useEffect(() => {
    if (state && state.token) getCustomers();
    if (state && state.user && state.user.permission) {
      setCurrentuserpermission(state.user.permission);
      // console.log('SOCKETIO ON JOIN', socket);
      //   if (customers)
      //     socket.on('new-customer', (newCustomer) => {
      //       setIocustomers([newCustomer, ...customers]);
      //       console.log(customers);
      //     });
    }
  }, [state && state.token]);

  const getCustomers = async () => {
    // axios based data request from the api/server
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_ADMIN_API}/customers/getcustomers`
      );
      setCustomers(data);
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

  const handleSaveCustomer = async () => {
    try {
      setConfirmLoading(true);
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_ADMIN_API}/customers/addCustomer`,
        { name, idpresented, idno, phone, email }
      );

      if (data.error) {
        toast.error(data.error);
        setConfirmLoading(false);
      } else {
        // setOk(data.ok);
        setIsModalVisible(false);
        setConfirmLoading(false);
        clearFormCustomer();
        toast.success('Customer added successfully ');
        getCustomers();
        //socket
        socket.emit('new-customer', data);
      }
    } catch (err) {
      setConfirmLoading(false);
      toast.error(err);
    }
  };

  const handleSaveEditedCustomer = async () => {
    try {
      setConfirmLoading(true);
      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_ADMIN_API}/customers/editcustomer`,
        {
          selecteditem,
          name,
          idpresented,
          idno,
          phone,
          email,
        }
      );
      // console.log(data);
      if (data.error) {
        toast.error(data.error);
        setConfirmLoading(false);
      } else {
        setOk(data.ok);
        setIsModalVisible(false);
        setConfirmLoading(false);
        clearFormCustomer();
        toast.success('Customer update successful');
        getCustomers();
      }
    } catch (err) {
      setConfirmLoading(false);
      toast.error(err);
    }
  };

  const handleDeleteCustomer = async () => {
    let currentuser = state.user._id;

    try {
      setConfirmLoading(true);

      const { data } = await axios.delete(
        `${process.env.NEXT_PUBLIC_ADMIN_API}/customers/deletecustomer`,
        {
          data: {
            selecteditem,
            deletionpassword,
            currentuser,
          },
        }
      );
      if (data.error) {
        toast.error(data.error);
        setConfirmLoading(false);
      } else {
        setOk(data.ok);
        setIsModalVisible(false);
        setConfirmLoading(false);
        setDeletionpassword('');
        toast.success('Customer deleted successfully');
        getCustomers();
      }
    } catch (err) {
      setConfirmLoading(false);
      toast.error(err);
    }
  };

  const handleQueryCustomer = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_ADMIN_API}/customers/querycustomer`,
        { selecteditem }
      );
      console.log(data);
      if (data.error) {
        toast.error(data.error);
      } else {
        // console.log(data);

        setName(data.name);
        setIdpresented(data.id_presented);
        setIdno(data.id_no);
        setPhone(data.phone);
        setEmail(data.email);
      }
    } catch (err) {
      setConfirmLoading(false);
      toast.error(err);
    }
  };

  const dataSet = iocustomers > 0 ? iocustomers : customers;
  return (
    <div className="ag-theme-alpine" style={{ height: 500, width: '103%' }}>
      <AgGridReact
        rowData={dataSet}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        onGridReady={onGridReady}
        onFirstDataRendered={autoSizeColumns}
        rowSelection={'single'}
        onRowClicked={(e) => {
          if (e.data.current_rent.length > 0) {
            setButtondisabled(true);
          } else {
            setButtondisabled(false);
          }
          setSelecteditem(e.data._id);
        }}
      ></AgGridReact>

      <br />
      <div className="col-sm-11">
        <br />
        <div className="row">
          <div className="col-sm-2">
            <Button
              disabled={currentuserpermission != 'Full'}
              type="primary"
              onClick={() => {
                setModalFor('addCustomer');
                showModal();
              }}
            >
              {' '}
              ADD CUSTOMER ...{' '}
            </Button>
          </div>

          <div className="col-sm-2">
            <Button
              disabled={
                currentuserpermission != 'Full' || selecteditem == ''
                  ? true
                  : buttondisabled
              }
              type="primary"
              onClick={() => {
                setModalFor('editCustomer');
                handleQueryCustomer();
                showModal();
              }}
            >
              {' '}
              EDIT CUSTOMER ...{' '}
            </Button>
          </div>

          <div className="col-sm-2">
            <Button
              disabled={
                currentuserpermission != 'Full' || selecteditem == ''
                  ? true
                  : buttondisabled
              }
              type="primary"
              onClick={() => {
                setModalFor('delete');
                showModal();
              }}
            >
              {' '}
              DELETE CUSTOMER ...{' '}
            </Button>
          </div>
        </div>
      </div>
      <UniModal
        // GENERIC (MODAL)
        modalFor={modalFor}
        isModalVisible={isModalVisible}
        saveFunction={
          modalFor == 'addCustomer'
            ? handleSaveCustomer
            : handleSaveEditedCustomer
        }
        handleCancel={handleCancel}
        deleteFunction={handleDeleteCustomer}
        confirmLoading={confirmLoading}
        isButtonSaveOff={isButtonSaveOff}
        // GENERIC (FORM)
        formFor={modalFor}
      >
        <UniForm
          formFor={modalFor}
          setIsButtonSaveOff={setIsButtonSaveOff}
          name={name}
          setName={setName}
          idpresented={idpresented}
          setIdpresented={setIdpresented}
          idno={idno}
          setIdno={setIdno}
          phone={phone}
          setPhone={setPhone}
          email={email}
          setEmail={setEmail}
          phone={phone}
          setPhone={setPhone}
          deletionpassword={deletionpassword}
          setDeletionpassword={setDeletionpassword}
          handleDeleteCustomer={handleDeleteCustomer}
        />
      </UniModal>
    </div>
  );
}

Customers.Layout = AdminLayout;
// Styled components
// const UserLists = styled.div`
//   padding: 5px;
// `;

// <UserLists></UserLists>
