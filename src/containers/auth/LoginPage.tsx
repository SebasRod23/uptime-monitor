import React, { useState, useContext } from 'react';
import axios from 'axios';

import AuthForm from '../../components/auth/AuthForm';
import Spinner from '../../components/Spinner';
import UserContext from '../../contexts/UserContext';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const [isAuth, setIsAuth] = useState<boolean>(false);

  const userContext = useContext(UserContext);

  const Login = async () => {
    setIsAuth(true);
    await axios('http://localhost:3001/auth/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      data: {
        email,
        password,
      },
      withCredentials: true,
      responseType: 'json',
    }).then(
      (res) => {
        userContext.login();
      },
      (err) => {
        setIsAuth(false);
        setEmail(undefined);
        setPassword(undefined);
        return;
      },
    );
  };

  return (
    <>
      {isAuth ? (
        <Spinner />
      ) : (
        <>
          <AuthForm
            title='Login'
            type='login'
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            authenticate={Login}
          />
        </>
      )}
    </>
  );
};

export default LoginPage;
