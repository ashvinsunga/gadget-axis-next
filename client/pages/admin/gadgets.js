import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../context';
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
// import styled from 'styled-components';
import { Button, Row, Col } from 'antd';
import { toast } from 'react-toastify';
import UserVerifier from '../../components/routes/UserVerifier';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import UniModal from '../../components/UniModal.component';
import UniForm from '../../components/UniForm.component';

import AdminLayout from '../../components/layouts/AdminLayout.component';

export default function Gadgets() {
  const [state, setState] = useContext(UserContext);
  const [gadgets, setGadgets] = useState([]);
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
    { headerName: 'Brand', field: 'brand' },
    { headerName: 'Product', field: 'product' },
    { headerName: 'Model', field: 'model' },
    { headerName: 'Serial no.', field: 'serial' },
    { headerName: 'Color', field: 'color' },
    { headerName: 'Rate', field: 'rate' },
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
    if (state && state.token) getGadgets();
  }, [state && state.token]);

  const getGadgets = async () => {
    // axios based data request from the api/server
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_ADMIN_API}/users/getgadgets`
      );
      setGadgets(data);
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

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    let formData = new FormData();
    formData.append('image', file);
    setUploading(true);
    // console.log(state);
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_ADMIN_API}/gadgets/uploadimage`,
        formData
      );
      // console.log('uploaded image ==>', data);
      setImage({
        url: data.url,
        public_id: data.public_id,
      });
      setUploading(false);
    } catch (err) {
      console.log(err);
      setUploading(false);
    }
  };

  const handleSaveGadget = async () => {
    try {
      setConfirmLoading(true);
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_ADMIN_API}/gadgets/addgadget`,
        { brand, product, model, serial, image, color, rate }
      );

      if (data.error) {
        toast.error(data.error);
        setConfirmLoading(false);
      } else {
        setOk(data.ok);
        setIsModalVisible(false);
        setConfirmLoading(false);
        clearFormGadget();
        toast.success('Gadget added successfully');
        getGadgets();
      }
    } catch (err) {
      setConfirmLoading(false);
      toast.error(err);
    }
  };

  const handleSaveEditedGadget = async () => {
    try {
      setConfirmLoading(true);
      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_ADMIN_API}/gadgets/editgadget`,
        {
          selecteditem,
          brand,
          product,
          model,
          serial,
          image,
          color,
          rate,
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
        clearFormGadget();
        toast.success('Gadget update successful');
        getGadgets();
      }
    } catch (err) {
      setConfirmLoading(false);
      toast.error(err);
    }
  };

  const handleDeleteGadget = async () => {
    let currentuser = state.user._id;
    console.log(currentuser);
    try {
      setConfirmLoading(true);

      const { data } = await axios.delete(
        `${process.env.NEXT_PUBLIC_ADMIN_API}/gadgets/deletegadget`,
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
        toast.success('Gadget deleted successfully');
        getGadgets();
      }
    } catch (err) {
      setConfirmLoading(false);
      toast.error(err);
    }
  };

  const handleQueryGadget = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_ADMIN_API}/gadgets/querygadget`,
        { selecteditem }
      );
      if (data.error) {
        toast.error(data.error);
      } else {
        // console.log(data);

        setBrand(data.brand);
        setProduct(data.product);
        setModel(data.model);
        setSerial(data.serial);
        setImage(data.image);
        setColor(data.color);
        setRate(data.rate);
      }
    } catch (err) {
      setConfirmLoading(false);
      toast.error(err);
    }
  };

  return (
    <div className="ag-theme-alpine" style={{ height: 500, width: '103%' }}>
      <AgGridReact
        rowData={gadgets}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        onGridReady={onGridReady}
        onRowClicked={(e) => {
          // console.log(e);
          setSelecteditem(e.data._id);
        }}
      ></AgGridReact>

      <br />

      <div className="col-sm-10">
        <br />
        <div className="row">
          <div className="col-sm-2">
            <Button
              type="primary"
              onClick={() => {
                setModalFor('addGadget');
                showModal();
              }}
            >
              {' '}
              ADD GADGET ...{' '}
            </Button>
          </div>

          <div className="col-sm-2">
            <Button
              type="primary"
              onClick={() => {
                setModalFor('editGadget');
                handleQueryGadget();
                showModal();
              }}
            >
              {' '}
              EDIT GADGET ...{' '}
            </Button>
          </div>

          <div className="col-sm-2">
            <Button
              type="primary"
              onClick={() => {
                setModalFor('delete');
                showModal();
              }}
            >
              {' '}
              DELETE GADGET ...{' '}
            </Button>
          </div>
        </div>
      </div>

      <UniModal
        // GENERIC (MODAL)
        modalFor={modalFor}
        isModalVisible={isModalVisible}
        saveFunction={
          modalFor == 'addGadget' ? handleSaveGadget : handleSaveEditedGadget
        }
        deleteFunction={handleDeleteGadget}
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
          handleUploadImage={handleUploadImage}
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
      </UniModal>
    </div>
  );
}
Gadgets.Layout = AdminLayout;
// Styled components
// const UserLists = styled.div`
//   padding: 5px;
// `;

// <UserLists></UserLists>
