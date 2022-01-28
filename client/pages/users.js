import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context';
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
// import styled from 'styled-components';
import { Button, Row, Col } from 'antd';
import { toast } from 'react-toastify';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import UniModal from '../components/UniModal.component';
import UniForm from '../components/UniForm.component';

export default function Users() {
  const [state, setState] = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [gridApi, setGridApi] = useState(null);
  const [ok, setOk] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  // for modal
  const [modalFor, setModalFor] = useState('addUser');
  const [isModalVisible, setIsModalVisible] = useState(false);
  // for form
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  const [dbpassword, setDbpassword] = useState('');
  const [oldpassword, setOldPassword] = useState('');
  const [newpassword, setNewPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmpassword] = useState('');
  const [phone, setPhone] = useState('');
  const [permission, setPermission] = useState('');
  const [selecteditem, setSelecteditem] = useState('DOG');
  const [isButtonSaveOff, setIsButtonSaveOff] = useState(true);
  // data grid
  const columnDefs = [
    { headerName: 'Username', field: 'username' },
    { headerName: 'Description', field: 'description' },
    { headerName: 'Phone', field: 'phone' },
    { headerName: 'Permission', field: 'permission' },
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
    modalFor == 'addUser' ? clearFormAddUser() : clearFormEditUser();
  };

  //clear form
  const clearFormAddUser = () => {
    setUsername('');
    setDescription('');
    setPhone('');
    setPassword('');
    setConfirmpassword('');
    setPermission('');
  };
  const clearFormEditUser = () => {
    setUsername('');
    setDescription('');
    setPhone('');
    setOldPassword('');
    setNewPassword('');
    setConfirmpassword('');
  };
  //--------------------------------------
  useEffect(() => {
    if (state && state.token) {
      getUsers();
    }
  }, [state && state.token]);

  const getUsers = async () => {
    // axios based data request from the api/server

    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_ADMIN_API}/users/getusers`
      );
      setUsers(data);
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
        toast.success('User added successfully');
      }
    } catch (err) {
      setConfirmLoading(false);
      toast.error(err.response.data);
    }
  };

  const handleSaveEditedUser = async () => {
    console.log('User updated!');
    try {
      // setConfirmLoading(true);
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_ADMIN_API}/users/edituser`,
        {
          selecteditem,
          description,
          phone,
          dbpassword,
          oldpassword,
          newpassword,
          confirmpassword,
          permission,
        }
      );
      console.log(data);
      if (data.error) {
        toast.error(data.error);
        setConfirmLoading(false);
      } else {
        setOk(data.ok);
        setIsModalVisible(false);
        setConfirmLoading(false);
        clearFormEditUser();
        toast.success('User update successful');
      }
    } catch (err) {
      setConfirmLoading(false);
      toast.error(err);
    }
  };

  const handleQueryUser = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_ADMIN_API}/users/queryuser`,
        { selecteditem }
      );
      if (data.error) {
        toast.error(data.error);
      } else {
        // console.log(data);
        setUsername(data.username);
        setDescription(data.description);
        setDbpassword(data.password);
        setPhone(data.phone);
        setPermission(data.permission);
      }
    } catch (err) {
      setConfirmLoading(false);
      toast.error(err);
    }
  };

  return (
    <div
      className="ag-theme-alpine"
      style={{ height: 400, width: '100%', padding: 6 }}
    >
      <AgGridReact
        rowData={users}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        onGridReady={onGridReady}
        onRowClicked={(e) => {
          setSelecteditem(e.data._id);
        }}
      ></AgGridReact>
      <br />

      <div className="col-sm-8">
        <div className="row">
          <div className="col-sm-2">
            <Button
              type="primary"
              onClick={() => {
                setModalFor('addUser');
                showModal();
              }}
            >
              {' '}
              ADD USER ...{' '}
            </Button>
          </div>

          <div className="col-sm-2">
            <Button
              type="primary"
              onClick={() => {
                setModalFor('editUser');
                handleQueryUser();
                showModal();
              }}
            >
              {' '}
              EDIT USER ...{' '}
            </Button>
          </div>

          <div className="col-sm-2">
            <Button type="primary" onClick={showModal}>
              {' '}
              DELETE USER ...{' '}
            </Button>
          </div>
        </div>
      </div>

      <UniModal
        // GENERIC (MODAL)
        modalFor={modalFor}
        isModalVisible={isModalVisible}
        saveFunction={
          modalFor == 'addUser' ? handleSaveUser : handleSaveEditedUser
        }
        handleCancel={handleCancel}
        confirmLoading={confirmLoading}
        isButtonSaveOff={isButtonSaveOff}
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
  );
}

// Styled components
// const UserLists = styled.div`
//   padding: 5px;
// `;

// <UserLists></UserLists>
