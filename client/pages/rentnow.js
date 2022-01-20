import { useContext } from 'react';
import { UserContext } from '../context';

export default function Login() {
  const [state, setState] = useContext(UserContext);
  return <h1> {JSON.stringify(state)} Rent now!</h1>;
}
