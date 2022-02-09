import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../context';
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
import RentStatusLayout from '../../components/layouts/RentStatusLayout.component';
// import styled from 'styled-components';
import { Button } from 'antd';
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

  const [currentuserpermission, setCurrentuserpermission] = useState(false);
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
  const textLeftAligned = { textAlign: 'left' };
  const columnDefs = [
    {
      headerName: 'ACTION',
      field: '_id',
      cellStyle: textLeftAligned,
      cellRendererFramework: (params) => (
        <div>
          <Button
            disabled={currentuserpermission != 'Full'}
            type="primary"
            ghost
            variant="outlined"
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
    {
      headerName: 'Rented to',
      field: 'customer.name',
      cellStyle: textLeftAligned,
    },
    {
      headerName: 'Rented by',
      field: 'rented_by.username',
      cellStyle: textLeftAligned,
    },
    {
      headerName: 'Product',
      field: 'gadget.product',
      cellStyle: textLeftAligned,
    },
    { headerName: 'Model', field: 'gadget.model', cellStyle: textLeftAligned },
    {
      headerName: 'Serial',
      field: 'gadget.serial',
      cellStyle: textLeftAligned,
    },
    {
      headerName: 'Gadget rate',
      field: 'gadget.rate',
      cellStyle: textLeftAligned,
    },
    {
      headerName: 'Rent start',
      field: 'rent_start',
      cellStyle: textLeftAligned,
      width: 230,
      cellRenderer: (data) => {
        return moment(data.value).format('llll');
      },
    },
    {
      headerName: 'Rent end',
      field: 'rent_end',
      cellStyle: textLeftAligned,
      width: 230,
      cellRenderer: (data) => {
        return moment(data.value).format('llll');
      },
    },
    { headerName: 'Total', field: 'total_rate', cellStyle: textLeftAligned },
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

  const handleCancel = () => {
    setIsModalVisible(false);
    setDeletionpassword('');
    setConfirmLoading(false);
  };

  //--------------------------------------
  useEffect(() => {
    if (state && state.token) listRents();
    if (state && state.user && state.user.permission) {
      setCurrentuserpermission(state.user.permission);
    }
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
          onFirstDataRendered={autoSizeColumns}
          rowSelection={'single'}
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
            handleEndRent={handleEndRent}
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
