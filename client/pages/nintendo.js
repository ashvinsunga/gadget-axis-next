import axios from 'axios';
import React, { useEffect, useContext, useState } from 'react';
import RentNowLayout from '../../components/layouts/RentNowLayout.component';
import { UserContext } from '../../context';
import GadgetCard from '../../components/GadgetCard.component';
import RentModal from '../../components/RentModal.component';
import RentForm from '../../components/RentForm.component';
import { toast } from 'react-toastify';

export default function Nintendo() {
  const [state] = useContext(UserContext);
  const [nintendos, setNintendos] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [nintendostatus, setNintendostatus] = useState('');
  const [nintendoid, setNintendoid] = useState('');
  const [nintendorate, setNintendorate] = useState(0);
  const [days, setDays] = useState('');
  const [customers, setCustomers] = useState('');
  const [customerid, setCustomerid] = useState('');
  const [customername, setCustomername] = useState('');
  const [rentedbyid, setRentedbyid] = useState('');
  const [startDate, setStartdate] = useState(0);
  const [endDate, setEnddate] = useState(0);
  const [totalrate, setTotalrate] = useState(0);
  const [confirmloading, setConfirmLoading] = useState(false);
  const [isbuttonsaveoff, setIsbuttonsaveoff] = useState(true);
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (state && state.token) listNintendo(), queryCustomersName();
  }, [state && state.token]);

  const listNintendo = async (req, res) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/rentnow/listnintendo`
      );
      // console.log(data);
      setNintendos(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleConfirmRent = async () => {
    try {
      if (state && state.user) {
        setRentedbyid(state.user._id);
      }
      setConfirmLoading(true);
      const { data } = await axios.post(
        `http://localhost:8000/rentnow/confirmrent`,
        {
          customerid,
          nintendoid,
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
        listNintendo();
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
        {nintendos &&
          nintendos.map((nintendo) => (
            //
            <GadgetCard
              key={nintendo._id}
              id={nintendo._id}
              brand={nintendo.brand}
              product={nintendo.product}
              model={nintendo.model}
              serial={nintendo.serial}
              color={nintendo.color}
              rate={nintendo.rate}
              image_url={nintendo.image && nintendo.image.url}
              status={nintendo.status}
              setNintendoid={setNintendoid}
              setIsModalVisible={setIsModalVisible}
              setNintendostatus={setNintendostatus}
              setNintendorate={setNintendorate}
            />
          ))}
      </div>

      <RentModal
        confirmFunction={handleConfirmRent}
        clearRentForm={clearRentForm}
        nintendostatus={nintendostatus}
        nintendorate={nintendorate}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        isbuttonsaveoff={isbuttonsaveoff}
        setNintendorate={setNintendorate}
      >
        <RentForm
          customers={customers}
          setCustomerid={setCustomerid}
          customername={customername}
          setCustomername={setCustomername}
          nintendorate={nintendorate}
          startDate={startDate}
          setStartdate={setStartdate}
          endDate={endDate}
          setEnddate={setEnddate}
          days={days}
          setDays={setDays}
          totalrate={totalrate}
          setTotalrate={setTotalrate}
          setIsbuttonsaveoff={setIsbuttonsaveoff}
        />
      </RentModal>
    </>
  );
}

Nintendo.Layout = RentNowLayout;