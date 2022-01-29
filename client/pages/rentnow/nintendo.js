import React from 'react';
import GadgetCard from '../../components/GadgetCard.component';
import RentNowLayout from '../../components/layouts/RentNowLayout.component';

export default function Nintendo() {
  return (
    <div className="d-flex flex-wrap">
      <GadgetCard />
      <GadgetCard />
      <GadgetCard />
      <GadgetCard />
      <GadgetCard />
      <GadgetCard />
    </div>
  );
}

Nintendo.Layout = RentNowLayout;
