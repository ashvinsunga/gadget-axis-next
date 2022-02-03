import axios from 'axios';
import React, { useEffect, useContext, useState } from 'react';
import RentNowLayout from '../../components/layouts/RentNowLayout.component';
import { UserContext } from '../../context';
import GadgetCard from '../../components/GadgetCard.component';
import RentModal from '../../components/RentModal.component';
import RentForm from '../../components/RentForm.component';

export default function Nintendo() {
  const [state] = useContext(UserContext);
  const [nintendos, setNintendos] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [nintendostatus, setNintendostatus] = useState('');
  const [nintendorate, setNintendorate] = useState(0);
  const [days, setDays] = useState('');
  const [customers, setCustomers] = useState('');
  const [customerid, setCustomernameid] = useState('');
  const [customername, setCustomername] = useState('');
  const [totalrate, setTotalrate] = useState(0);

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

  return (
    <>
      <div className="d-flex flex-wrap">
        {nintendos &&
          nintendos.map((nintendo) => (
            //
            <GadgetCard
              key={nintendo._id}
              id={nintendo._id}
              product={nintendo.product}
              model={nintendo.model}
              serial={nintendo.serial}
              color={nintendo.color}
              rate={nintendo.rate}
              image_url={nintendo.image && nintendo.image.url}
              status={nintendo.status}
              setIsModalVisible={setIsModalVisible}
              setNintendostatus={setNintendostatus}
              setNintendorate={setNintendorate}
              setCustomernameid={setCustomernameid}
            />
          ))}
      </div>
      <RentModal
        nintendostatus={nintendostatus}
        nintendorate={nintendorate}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        setDays={setDays}
        setNintendorate={setNintendorate}
      >
        <RentForm
          customers={customers}
          customername={customername}
          setCustomername={setCustomername}
          nintendorate={nintendorate}
          days={days}
          setDays={setDays}
          totalrate={totalrate}
          setTotalrate={setTotalrate}
        />
      </RentModal>
    </>
  );
}

Nintendo.Layout = RentNowLayout;
