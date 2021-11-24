import React, { useState, useContext } from 'react';
import axios from 'axios';

import AuthForm from '../../components/auth/AuthForm';
import Spinner from '../../components/Spinner';
import UserContext from '../../contexts/UserContext';

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [confirmation, setConfirmation] = useState<string>();

  const [isAuth, setIsAuth] = useState<boolean>(false);

  const userContext = useContext(UserContext);

  const Register = async () => {
    setIsAuth(true);
    await axios('http://localhost:3001/auth/register', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      data: {
        email,
        password,
        username,
      },
      responseType: 'json',
      withCredentials: true,
    }).then(
      (res) => {
        userContext.login();
      },
      (err) => {
        setIsAuth(false);
        setUsername(undefined);
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
            title='Registro'
            type='register'
            username={username}
            setUsername={setUsername}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            confirmation={confirmation}
            setConfirmation={setConfirmation}
            authenticate={Register}
          />
        </>
      )}
    </>
  );
};

export default RegisterPage;
