import React from 'react';
import { handleSignup, isLoggedIn } from '../helpers/auth';
import {Link} from '@reach/router'

function Signup({ navigate }) {

  if(isLoggedIn()){
    navigate('/app/home')
  }
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState(false);
  return (
    <div>
      <p>Signup Page</p>

      <label htmlFor="email">Enter your email</label>
      <input
        id="email"
        type="email"
        value={username}
        onChange={(evt) => setUsername(evt.target.value)}
      />
      <br />
      <label htmlFor="pass">Enter your Password</label>
      <input
        id="pass"
        type="password"
        value={password}
        onChange={(evt) => setPassword(evt.target.value)}
      />

      <button
        onClick={async () =>
          setError(await handleSignup({ username, password }))
        }
      >

        Login
      </button>
      <br></br>
      <Link to="/app/login">Go for Login</Link>

      {error ? <p>{error.message}</p> : null}
    </div>
  );
}

export default Signup;
