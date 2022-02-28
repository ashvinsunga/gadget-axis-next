import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../context';
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
// import styled from 'styled-components';
import { Button } from 'antd';
import { toast } from 'react-toastify';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import UniModal from '../../components/UniModal.component';
import UniForm from '../../components/UniForm.component';
import AdminLayout from '../../components/layouts/AdminLayout.component';

export default function Users() {
  const [state] = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [gridApi, setGridApi] = useState(null);
  const [ok, setOk] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [selecteditem, setSelecteditem] = useState('');
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
  const [currentuserpermission, setCurrentuserpermission] = useState('');

  const [deletionpassword, setDeletionpassword] = useState('');
  const [isButtonSaveOff, setIsButtonSaveOff] = useState(true);
  const [page, setPage] = useState('');
  // data grid

  const textLeftAligned = { textAlign: 'left' };

  const columnDefs = [
    { headerName: 'Username', field: 'username', cellStyle: textLeftAligned },
    {
      headerName: 'Description',
      field: 'description',
      cellStyle: textLeftAligned,
    },
    { headerName: 'Phone', field: 'phone', cellStyle: textLeftAligned },
    {
      headerName: 'Permission',
      field: 'permission',
      cellStyle: textLeftAligned,
    },
  ];

  const defaultColDef = {
    resizable: true,
    sortable: true,
    filter: true,
    // floatingFilter: true,
  };

  const onGridReady = (params) => {
    setGridApi(params);
    params.api.sizeColumnsToFit();
  };

  // modal
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    modalFor == 'addUser'
      ? clearFormAddUser()
      : modalFor == 'editUser'
      ? clearFormEditUser()
      : setDeletionpassword('');
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
      setPage('users');
      getUsers();
    }
    if (state && state.user && state.user.permission) {
      setCurrentuserpermission(state.user.permission);
    }
  }, [state && state.token]);

  const getUsers = async () => {
    // axios based data request from the api/server
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_ADMIN_API}/getusers`
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
        `${process.env.NEXT_PUBLIC_ADMIN_API}/adduser`,
        { username, description, phone, password, confirmpassword, permission }
      );

      if (data.error) {
        toast.error(data.error);
        setConfirmLoading(false);
      } else {
        setOk(data.ok);
        setIsModalVisible(false);
        setConfirmLoading(false);
        clearFormAddUser();
        toast.success('User added successfully');
        getUsers();
      }
    } catch (err) {
      setConfirmLoading(false);
      clearFormAddUser();
      toast.error(err);
    }
  };

  const handleSaveEditedUser = async () => {
    try {
      // setConfirmLoading(true);
      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_ADMIN_API}/edituser`,
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
      // console.log(data);
      if (data.error) {
        toast.error(data.error);
        setConfirmLoading(false);
      } else {
        setOk(data.ok);
        setIsModalVisible(false);
        setConfirmLoading(false);
        clearFormEditUser();
        toast.success('User update successful');
        getUsers();
      }
    } catch (err) {
      setConfirmLoading(false);
      toast.error(err);
    }
  };

  const handleDeleteUser = async () => {
    let currentuser = state.user._id;

    try {
      setConfirmLoading(true);

      const { data } = await axios.delete(
        `${process.env.NEXT_PUBLIC_ADMIN_API}/deleteuser`,
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
        toast.success('User deleted successfully');
        getUsers();
      }
    } catch (err) {
      setConfirmLoading(false);
      toast.error(err);
    }
  };

  const handleQueryUser = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_ADMIN_API}/queryuser`,
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
    <div className="ag-theme-alpine" style={{ height: 500, width: '103%' }}>
      <AgGridReact
        rowData={users}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        onGridReady={onGridReady}
        rowSelection={'single'}
        onRowClicked={(e) => {
          setSelecteditem(e.data._id);
        }}
      />
      <br />

      <div className="col-sm-10">
        <br />
        <div className="row">
          <div className="col-sm-2">
            <Button
              disabled={currentuserpermission != 'Full'}
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
              disabled={currentuserpermission != 'Full' || selecteditem == ''}
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
            <Button
              disabled={currentuserpermission != 'Full' || selecteditem == ''}
              type="primary"
              onClick={() => {
                setModalFor('delete');
                showModal();
              }}
            >
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
        deleteFunction={handleDeleteUser}
        handleCancel={handleCancel}
        confirmLoading={confirmLoading}
        isButtonSaveOff={isButtonSaveOff}
        setDeletionpassword={setDeletionpassword}
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
          // for delete function
          deletionpassword={deletionpassword}
          setDeletionpassword={setDeletionpassword}
          page={page}
          handleDeleteUser={handleDeleteUser}
        />
      </UniModal>
    </div>
  );
}
Users.Layout = AdminLayout;
// Styled components
// const UserLists = styled.div`
//   padding: 5px;
// `;

// <UserLists></UserLists>
