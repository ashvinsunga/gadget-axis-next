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

import EndRentModal from '../../components/EndRentModal.component';
import UniForm from '../../components/UniForm.component';

export default function RentStatus() {
  const [state, setState] = useContext(UserContext);
  const [rents, setRents] = useState([]);
  const [gridApi, setGridApi] = useState(null);
  const [ok, setOk] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [selectedrent, setSelectedrent] = useState('');
  const [selectedgadget, setSelectedgadget] = useState('');
  // for modal
  const [modalFor, setModalFor] = useState('endRent');
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
    {
      headerName: 'ACTION',
      field: '_id',
      cellRendererFramework: (params) => (
        <div>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              setSelectedrent(params.data._id);
              setSelectedgadget(params.data.gadget._id);
              setIsModalVisible(true);
            }}
          >
            END THE RENT
          </Button>
        </div>
      ),
    },
    { headerName: 'Rented to', field: 'customer.name' },
    { headerName: 'Rented by', field: 'rented_by.username' },
    { headerName: 'Product', field: 'gadget.product' },
    { headerName: 'Model', field: 'gadget.model' },
    { headerName: 'Serial', field: 'gadget.serial' },
    { headerName: 'Gadget rate', field: 'gadget.rate' },
    {
      headerName: 'Rent start',
      field: 'rent_start',
      cellRenderer: (data) => {
        return moment(data.value).format('llll');
      },
    },
    {
      headerName: 'Rent end',
      field: 'rent_end',
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

  const handleCancel = () => {
    setIsModalVisible(false);
    setDeletionpassword('');
    setConfirmLoading(false);
  };

  //--------------------------------------
  useEffect(() => {
    if (state && state.token) listRents();
  }, [state && state.token]);

  const listRents = async () => {
    // axios based data request from the api/server
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_ADMIN_API}/listrents`
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

  const handleEndRent = async (params) => {
    console.log(params);
    let currentuser = state.user._id;
    console.log(currentuser);
    try {
      setConfirmLoading(true);

      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_ADMIN_API}/confirmendrent`,
        {
          selectedrent,
          selectedgadget,
          deletionpassword,
          currentuser,
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
        toast.success('Rent ended successfully');
        listRents();
      }
    } catch (err) {
      setConfirmLoading(false);
      toast.error(err);
    }
  };

  return (
    <UserVerifier>
      <div className="ag-theme-alpine" style={{ height: 500, width: '103%' }}>
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

        <EndRentModal
          // GENERIC (MODAL)
          handleEndRent={handleEndRent}
          modalFor={modalFor}
          isModalVisible={isModalVisible}
          handleCancel={handleCancel}
          confirmLoading={confirmLoading}
          isButtonSaveOff={isButtonSaveOff}
          setDeletionpassword={setDeletionpassword}
        >
          <UniForm
            formFor={modalFor}
            setIsButtonSaveOff={setIsButtonSaveOff}
            uploading={uploading}
            image={image}
            brand={brand}
            setBrand={setBrand}
            product={product}
            setProduct={setProduct}
            model={model}
            setModel={setModel}
            serial={serial}
            setSerial={setSerial}
            color={color}
            setColor={setColor}
            rate={rate}
            setRate={setRate}
            deletionpassword={deletionpassword}
            setDeletionpassword={setDeletionpassword}
          />
        </EndRentModal>
      </div>
    </UserVerifier>
  );
}

RentStatus.Layout = RentStatusLayout;

// Styled components
// const UserLists = styled.div`
//   padding: 5px;
// `;

// <UserLists></UserLists>
