import { useContext, useState } from 'react';
import { UserContext } from '../context';
import UserVerifier from '../components/routes/UserVerifier';
import UniModal from '../components/UniModal.component';
import UniForm from '../components/UniForm.component';
import GadgetCard from '../components/GadgetCard.component';

export default function RentNow() {
  const [state, setState] = useContext(UserContext);
  const [modalFor, setModalFor] = useState('addUser');

  return (
    <UserVerifier>
      <div>
        <h1>This is thee reent page!</h1>
        <h1>This is thee reent page!</h1>
        <h1>This is thee reent page!</h1>
        <h1>This is thee reent page!</h1>
        <h1>This is thee reent page!</h1>
      </div>
    </UserVerifier>
  );
}
