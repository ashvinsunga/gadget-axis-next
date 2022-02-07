import React from 'react';
import RentContent from '../../components/RentContent.component';
import RentNowLayout from '../../components/layouts/RentNowLayout.component';

export default function Nintendo() {
  return <RentContent gadgetListLink={'listnintendo'} />;
}

Nintendo.Layout = RentNowLayout;
