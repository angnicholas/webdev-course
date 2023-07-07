import React, { useState } from 'react';
import LoginForm from "../components/loginform";
import { login, logout } from "../services/auth.loginlogout";

const LoginPage = (props) => {

  const [requestFailed, setRequestFailed] = useState(false);

  const setRequestFailedTrue = () => {
    setRequestFailed(true);
  }

  const handle_login = (e, username, password) => {
    login(username, password, setRequestFailedTrue);
    e.preventDefault();
  }

  const handle_logout = () => {
    logout();
  }

  if (requestFailed) {
    return (
      <div className="LoginForm">
        <LoginForm handle_login={handle_login} errorMessage={true} />
      </div>
    );
  } else {
    return (
      <div className="LoginForm">
        <LoginForm handle_login={handle_login} />
      </div>
    );
  }
}

export default LoginPage;