import { useState, createContext, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [state, setState] = useState({
    user: {},
    token: '',
  });
  const router = useRouter();

  useEffect(() => {
    setState(JSON.parse(window.localStorage.getItem('axistoken')));
  }, []);

  // With this, you don't need to attach token as headers in axios requests and send it as a payload
  const token = state && state.token ? state.token : '';
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  // Dissallows unauthorized access to pages
  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      let res = error.response;
      if (res.status === 401 && res.config && !res.config.__isRetryRequest) {
        setState(null);
        window.localStorage.removeItem('axistoken');
        router.push('/');
      }
    }
  );

  return (
    <UserContext.Provider value={[state, setState]}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
