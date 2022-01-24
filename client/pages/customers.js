import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
// import styled from 'styled-components';
import { Button, Row, Col } from 'antd';
import { toast } from 'react-toastify';
import UserVerifier from '../components/routes/UserVerifier';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import UniModal from '../components/UniModal.component';
import UniForm from '../components/UniForm.component';

export default function Customers() {
  const [users, setUsers] = useState([]);
  const [gridApi, setGridApi] = useState(null);
  const [ok, setOk] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  // for modal
  const [modalFor, setModalFor] = useState('addCustomer');
  const [isModalVisible, setIsModalVisible] = useState(false);
  // for form
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  const [oldpassword, setOldPassword] = useState('');
  const [newpassword, setNewPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmpassword] = useState('');
  const [phone, setPhone] = useState('');
  const [permission, setPermission] = useState('');
  const [isButtonSaveOff, setIsButtonSaveOff] = useState(true);
  // data grid
  const columnDefs = [
    { headerName: 'User pangalan', field: 'username' },
    { headerName: 'Password nya', field: 'password' },
    { headerName: 'Sikreto', field: 'secret' },
    { headerName: 'Deskripsyon', field: 'description' },
    { headerName: 'Telepono', field: 'phone' },
    { headerName: 'Permisyon', field: 'permission' },
    { headerName: 'Nagawa', field: 'createdAt' },
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
    setUsername('');
    setDescription('');
    setPhone('');
    setPassword('');
    setConfirmpassword('');
    setPermission('');
  };
  //--------------------------------------
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    // axios based data request from the api/server
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_ADMIN_API}/users/getusers`
      );
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

  const handleSaveUser = async () => {
    try {
      setConfirmLoading(true);
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_ADMIN_API}/users/adduser`,
        { username, description, phone, password, confirmpassword, permission }
      );

      if (data.error) {
        toast.error(data.error);
        setConfirmLoading(false);
      } else {
        setOk(data.ok);
        setIsModalVisible(false);
        setConfirmLoading(false);
        clearForm();
        toast.success('User successfully added');
      }
    } catch (err) {
      setConfirmLoading(false);
      toast.error(err.response.data);
    }
  };

  return (
    <UserVerifier>
      <div
        className="ag-theme-alpine"
        style={{ height: 400, width: 1280, padding: 6 }}
      >
        <AgGridReact
          rowData={users}
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
          handleSaveUser={handleSaveUser}
          handleCancel={handleCancel}
          confirmLoading={confirmLoading}
          isButtonSaveOff={isButtonSaveOff}
          // GENERIC (FORM)
          formFor={modalFor}
        >
          <UniForm
            formFor={modalFor}
            username={username}
            setUsername={setUsername}
            description={description}
            setDescription={setDescription}
            phone={phone}
            setPhone={setPhone}
            // for edit function
            newpassword={newpassword}
            setNewPassword={setNewPassword}
            oldpassword={oldpassword}
            setOldPassword={setOldPassword}
            //
            password={password}
            setPassword={setPassword}
            confirmpassword={confirmpassword}
            setConfirmpassword={setConfirmpassword}
            permission={permission}
            setPermission={setPermission}
            setIsButtonSaveOff={setIsButtonSaveOff}
          />
        </UniModal>
      </div>
    </UserVerifier>
  );
}

// Styled components
// const UserLists = styled.div`
//   padding: 5px;
// `;

// <UserLists></UserLists>
