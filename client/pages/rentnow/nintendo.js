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
  const [customer, setCustomer] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  useEffect(() => {
    if (state && state.token) listNintendo();
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
            />
          ))}
      </div>
      <RentModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      >
        <RentForm customer={customer} setCustomer={setCustomer} />
      </RentModal>
    </>
  );
}

Nintendo.Layout = RentNowLayout;
