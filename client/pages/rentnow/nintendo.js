import axios from 'axios';
import React, { useEffect, useContext, useState } from 'react';
import { Card } from 'antd';
import RentNowLayout from '../../components/layouts/RentNowLayout.component';
import { UserContext } from '../../context';
import GadgetCard from '../../components/GadgetCard.component';
import RentModal from '../../components/RentModal.component';
import RentForm from '../../components/RentForm.component';

export default function Nintendo() {
  const { Meta } = Card;
  const [state, setState] = useContext(UserContext);
  const [nintendos, setNintendos] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [nintendostatus, setNintendostatus] = useState('');
  const [nintendorate, setNintendorate] = useState('');
  const [customers, setCustomers] = useState('');
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
            />
          ))}
      </div>
      <RentModal
        nintendostatus={nintendostatus}
        nintendorate={nintendorate}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      >
        <RentForm customers={customers} />
      </RentModal>
    </>
  );
}

Nintendo.Layout = RentNowLayout;
