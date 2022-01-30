import axios from 'axios';
import React, { useEffect, useContext, useState } from 'react';
import { Card } from 'antd';
import RentNowLayout from '../../components/layouts/RentNowLayout.component';
import { UserContext } from '../../context';
import GadgetCard from '../../components/GadgetCard.component';

export default function Nintendo() {
  const { Meta } = Card;
  const [state, setState] = useContext(UserContext);
  const [nintendos, setNintendos] = useState('');
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
    <div className="d-flex flex-wrap">
      {nintendos &&
        nintendos.map((nintendo) => (
          //
          <GadgetCard
            product={nintendo.product}
            model={nintendo.model}
            serial={nintendo.serial}
            color={nintendo.color}
            rate={nintendo.rate}
            image_url={nintendo.image && nintendo.image.url}
            status={nintendo.status}
          />
        ))}
    </div>
  );
}

Nintendo.Layout = RentNowLayout;
