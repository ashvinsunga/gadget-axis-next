import React, { useState, useContext } from 'react';
import { SyncOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useRouter } from 'next/router';
import { UserContext } from '../context';

export default function Login() {
  const [state, setState] = useContext(UserContext);
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('12345678');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_ADMIN_API}/loginuser`,
        {
          username,
          password,
        }
      );
      if (data.error) {
        toast.error(data.error);
        setLoading(false);
      } else {
        // Update Context
        setState({
          user: data.user,
          token: data.token,
        });
        // save in local storage
        window.localStorage.setItem('axistoken', JSON.stringify(data));
        router.push('/rentstatus/current');
      }
    } catch (err) {
      toast.error(err.response.data);
      setLoading(false);
    }
  };

  if (state && state.token) router.push('/rentstatus/current');
  return (
    <>
      {state === null && (
        <div className="container">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header d-flex justify-content-center">
                <div className="h4 ">
                  <img
                    src="images/logo-black.png"
                    width="40"
                    height="30"
                    className="d-inline-block h1 "
                    alt=""
                  />
                  ADGET AXIS <br />
                  <h5>GADGET RENTAL SYSTEM</h5>
                </div>
              </div>
              <div className="modal-body col-md-12 ">
                <form onSubmit={loginSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Login</label>
                    <input
                      value={username}
                      onChange={(event) => setUsername(event.target.value)}
                      type="text"
                      className="form-control"
                      placeholder="Username"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      type="password"
                      className="form-control"
                      placeholder="Password"
                    />
                  </div>
                  <button
                    width={400}
                    disabled={!username || !password || loading}
                    type="submit"
                    className="btn btn-primary btn-sm"
                  >
                    {loading ? <SyncOutlined spin className="py-1" /> : 'Login'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
