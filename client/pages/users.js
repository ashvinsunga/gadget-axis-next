import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/';
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
import styled from 'styled-components';
import { Button, Row, Col } from 'antd';
import { Spin } from 'antd';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import Dialog from '../components/Dialog.component';

export default function UsersList() {
  const [state, setState] = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [gridApi, setGridApi] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [ok, setOk] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    description: '',
    password: '',
    confirmpassword: '',
    phone: '',
    permission: '',
  });
  const router = useRouter();
  if (state === null) router.push('/');
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

  //Loading

  const [loading, setLoading] = useState(false);

  //clear form
  const clearForm = () => {
    setFormData({
      username: '',
      description: '',
      phone: '',
      password: '',
      confirmpassword: '',
      permission: '',
    });
  };
  //--------------------------------------
  // useEffect(() => {
  //   // runs the fetchGadgets on load
  //   fetchUsers();
  // }, []);

  const fetchUsers = () => {
    // axios based data request from the api/server
    axios
      .get('http://localhost:8000/admin/users')
      .then((users) => {
        // console.log(gadgets.data);
        setGadgets(users.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));

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

  const onChange = (e) => {
    const { value, id } = e.target;
    setFormData({ ...formData, [id]: value });
  };
  const handleSubmit = async () => {
    try {
      setConfirmLoading(true);
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_ADMIN_API}/users/adduser`,
        formData
      );
      setOk(data.ok);
      setIsModalVisible(false);
      setConfirmLoading(false);
      clearForm();
      toast.success('User successfully added');
    } catch (err) {
      setConfirmLoading(false);
      toast.error(err.response.data);
    }
  };
  if (loading)
    return (
      <Spin
        className="display-1 d-flex justify-content-center"
        tip="Loading..."
      />
    );

  return (
    <UserLists className="ag-theme-alpine" style={{ height: 400, width: 1280 }}>
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
            ADD USER ...{' '}
          </Button>
        </Col>
      </Row>
      <Dialog
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
        isModalVisible={isModalVisible}
        formData={formData}
        setFormData={setFormData}
        onChange={onChange}
        confirmLoading={confirmLoading}
      />
    </UserLists>
  );
}

// Styled components
const UserLists = styled.div`
  padding: 5px;
`;
