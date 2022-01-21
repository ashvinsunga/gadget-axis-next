import { useContext } from 'react';
import { UserContext } from '../context';
import UserVerifier from '../components/routes/UserVerifier';
import Demo from '../components/GadgetTab.component';

export default function RentNow() {
  const [state, setState] = useContext(UserContext);

  return (
    <UserVerifier>
      {state !== null && <h6> {JSON.stringify(state)} Rent now!</h6>}
      <Demo />
    </UserVerifier>
  );
}
