import React, { useState } from 'react';

export default function Login() {
  const [username, setUsername] = useState('Administrator');
  const [password, setPassword] = useState('123456');

  const loginSubmit = (event) => {
    event.preventDefault();
    console.log('USERNAME =', username);
    console.log('PASSWORD =', password);
  };

  return (
    <div className="container">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Gadget Axis</h5>
          </div>
          <div className="modal-body col-md-10 offset-1">
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
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

// export default class Login extends Component {
//   render() {

//   }
// }
