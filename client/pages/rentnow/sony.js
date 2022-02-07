import React from 'react';
import RentContent from '../../components/RentContent.component';
import RentNowLayout from '../../components/layouts/RentNowLayout.component';

export default function Sony() {
  return <RentContent gadgetListLink={'listsony'} />;
}

Sony.Layout = RentNowLayout;
