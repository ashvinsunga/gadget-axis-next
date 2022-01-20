import { useContext } from 'react';
import { UserContext } from '../context';
import { useRouter } from 'next/router';

export default function Login() {
  const [state, setState] = useContext(UserContext);
  const router = useRouter();
  if (state === null) router.push('/');

  return <h1> {JSON.stringify(state)} Rent now!</h1>;
}
