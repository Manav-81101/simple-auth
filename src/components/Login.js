// import React from "react"
// import { navigate } from "gatsby"
// import Form from "./Form"
// import View from "./View"
// import { handleLogin, isLoggedIn } from "../utils/auth"

// class Login extends React.Component {
//   state = {
//     username: ``,
//     password: ``,
//   }

//   handleUpdate(event) {
//     this.setState({
//       [event.target.name]: event.target.value,
//     })
//   }

//   handleSubmit(event) {
//     event.preventDefault()
//     handleLogin(this.state)
//   }

//   render() {
//     if (isLoggedIn()) {
//       navigate(`/app/profile`)
//     }

//     return (
//       <View title="Log In">
//         <Form
//           handleUpdate={e => this.handleUpdate(e)}
//           handleSubmit={e => this.handleSubmit(e)}
//         />
//       </View>
//     )
//   }
// }

// export default Login

import React from 'react';
import { handleLogin, isLoggedIn } from '../helpers/auth';
import {Link} from '@reach/router'


function Login({ navigate }) {
  if(isLoggedIn()) {
    navigate('/home')
  }
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState(false);
  return (
    <div>
      <p>Login Page</p>
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
          setError(await handleLogin({ username, password }))
        }
      >
        Login
      </button>
      <br/>
      <Link to="/app/signup">Go for Signup</Link>

      {error ? <p>{error.message}</p> : null}
    </div>
  );
}

export default Login;

