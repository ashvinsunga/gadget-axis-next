import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../context';
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
// import styled from 'styled-components';
import { Button, Row, Col } from 'antd';
import { toast } from 'react-toastify';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import UniModal from '../../components/UniModal.component';
import UniForm from '../../components/UniForm.component';

import AdminLayout from '../../components/layouts/AdminLayout.component';

export default function Customers() {
  const [state, setState] = useContext(UserContext);
  const [customers, setCustomers] = useState([]);
  const [gridApi, setGridApi] = useState(null);
  const [ok, setOk] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  // for modal
  const [modalFor, setModalFor] = useState('addCustomer');
  const [isModalVisible, setIsModalVisible] = useState(false);
  // for form
  const [name, setName] = useState('');
  const [idpresented, setIdpresented] = useState('');
  const [idno, setIdno] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  // modal and form
  const [isButtonSaveOff, setIsButtonSaveOff] = useState(true);
  // data grid
  const columnDefs = [
    { headerName: 'Name', field: 'name' },
    { headerName: 'ID Presented', field: 'id_presented' },
    { headerName: 'ID No.', field: 'id_no' },
    { headerName: 'Phone', field: 'phone' },
    { headerName: 'Email', field: 'email' },
    { headerName: 'Date added', field: 'createdAt' },
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
    clearForm();
  };

  //clear form
  const clearForm = () => {
    setName('');
    setIdpresented('');
    setIdno('');
    setPhone('');
    setEmail('');
  };
  //--------------------------------------
  useEffect(() => {
    if (state && state.token) getCustomers();
  }, [state && state.token]);

  const getCustomers = async () => {
    // axios based data request from the api/server
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_ADMIN_API}/users/getcustomers`
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
        setOk(data.ok);
        setIsModalVisible(false);
        setConfirmLoading(false);
        clearForm();
        toast.success('Customer added successfully ');
        getCustomers();
      }
    } catch (err) {
      setConfirmLoading(false);
      toast.error(err.response.data);
    }
  };

  return (
    <div className="ag-theme-alpine" style={{ height: 500, width: '103%' }}>
      <AgGridReact
        rowData={customers}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        onGridReady={onGridReady}
      ></AgGridReact>

      <br />
      <Row>
        <Col>
          <Button type="primary" onClick={showModal}>
            {' '}
            ADD CUSTOMER ...{' '}
          </Button>
        </Col>
      </Row>
      <UniModal
        // GENERIC (MODAL)
        modalFor={modalFor}
        isModalVisible={isModalVisible}
        saveFunction={handleSaveCustomer}
        handleCancel={handleCancel}
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
