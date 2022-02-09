import axios from 'axios';
import React, { useEffect, useContext, useState } from 'react';
import { UserContext } from '../context';
import GadgetCard from './GadgetCard.component';
import RentModal from './RentModal.component';
import RentForm from './RentForm.component';
import { toast } from 'react-toastify';

export default function RentContent({ gadgetListLink }) {
  const [state] = useContext(UserContext);
  const [gadgets, setGadgets] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [gadgetstatus, setGadgetstatus] = useState('');
  const [gadgetid, setGadgetid] = useState('');
  const [gadgetrate, setGadgetrate] = useState(0);
  const [days, setDays] = useState('');
  const [customers, setCustomers] = useState('');
  const [customerid, setCustomerid] = useState('');
  const [customername, setCustomername] = useState('');
  const [rentedbyid, setRentedbyid] = useState('');
  const [startDate, setStartdate] = useState(0);
  const [endDate, setEnddate] = useState(0);
  const [totalrate, setTotalrate] = useState(0);
  const [currentuserpermission, setCurrentuserpermission] = useState(0);
  const [confirmloading, setConfirmLoading] = useState(false);
  const [pickervaluetonull, setPickervaluetonull] = useState('false');
  const [isbuttonsaveoff, setIsbuttonsaveoff] = useState(true);
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (state && state.token)
      listGadgets(), queryCustomersName(), setRentedbyid(state.user._id);
    if (state && state.user && state.user.permission) {
      setCurrentuserpermission(state.user.permission);
    }
  }, [state && state.token]);

  const listGadgets = async (req, res) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/rentnow/${gadgetListLink}`
      );
      // console.log(data);
      setGadgets(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleConfirmRent = async () => {
    try {
      setConfirmLoading(true);
      const { data } = await axios.post(
        `http://localhost:8000/rentnow/confirmrent`,
        {
          customerid,
          gadgetid,
          rentedbyid,
          startDate,
          endDate,
          totalrate,
        }
      );

      if (data.error) {
        toast.error(data.error);
        setConfirmLoading(false);
      } else {
        setOk(data.ok);
        setIsModalVisible(false);
        setConfirmLoading(false);
        clearRentForm();
        toast.success('Rent added successfully');
        listGadgets();
      }
    } catch (err) {
      setConfirmLoading(false);
      // toast.error(err);
    }
  };

  const queryCustomersName = async (req, res) => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_ADMIN_API}/customers/getcustomersname`
      );
      setCustomers(data);
      // console.log(customersname);
    } catch (err) {
      console.log(err);
    }
  };

  function clearRentForm() {
    setDays(0);
    setCustomername('');
    setStartdate('');
    setEnddate('');
  }
  return (
    <>
      <div className="d-flex flex-wrap">
        {gadgets &&
          gadgets.map((gadget) => (
            //
            <GadgetCard
              key={gadget._id}
              id={gadget._id}
              brand={gadget.brand}
              product={gadget.product}
              model={gadget.model}
              serial={gadget.serial}
              color={gadget.color}
              rate={gadget.rate}
              image_url={gadget.image && gadget.image.url}
              status={gadget.status}
              currentuserpermission={currentuserpermission}
              setGadgetid={setGadgetid}
              setIsModalVisible={setIsModalVisible}
              setGadgetstatus={setGadgetstatus}
              setGadgetrate={setGadgetrate}
            />
          ))}
      </div>

      <RentModal
        confirmFunction={handleConfirmRent}
        clearRentForm={clearRentForm}
        gadgetstatus={gadgetstatus}
        gadgetrate={gadgetrate}
        isModalVisible={isModalVisible}
        currentuserpermission={currentuserpermission}
        setIsModalVisible={setIsModalVisible}
        isbuttonsaveoff={isbuttonsaveoff}
        setGadgetrate={setGadgetrate}
      >
        <RentForm
          customers={customers}
          setCustomerid={setCustomerid}
          customername={customername}
          setCustomername={setCustomername}
          gadgetrate={gadgetrate}
          startDate={startDate}
          setStartdate={setStartdate}
          endDate={endDate}
          setEnddate={setEnddate}
          days={days}
          setDays={setDays}
          totalrate={totalrate}
          setTotalrate={setTotalrate}
          setIsbuttonsaveoff={setIsbuttonsaveoff}
          pickervaluetonull={pickervaluetonull}
        />
      </RentModal>
    </>
  );
}
