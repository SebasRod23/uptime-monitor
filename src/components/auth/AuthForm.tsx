import React from 'react';
import {
  Button,
  makeStyles,
  createStyles,
  TextField,
  Theme,
  Container,
  Typography,
} from '@material-ui/core';
import { useHistory } from 'react-router';

const formStyles = makeStyles((theme: Theme) =>
  createStyles({
    centerForm: {
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      textAlign: 'center',
      width: '40%',
      '@media (max-width: 1000px)': {
        width: '60%',
      },
      '@media (max-width: 600px)': {
        width: '80%',
      },
    },
    displayRows: {
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
    },
    displayRowsButtons: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    },
  }),
);

interface AuthFormProps {
  title: string;
  type: 'login' | 'register';
  username?: string | undefined;
  setUsername?: React.Dispatch<React.SetStateAction<string | undefined>>;
  email: string | undefined;
  setEmail: React.Dispatch<React.SetStateAction<string | undefined>>;
  password: string | undefined;
  setPassword: React.Dispatch<React.SetStateAction<string | undefined>>;
  confirmation?: string | undefined;
  setConfirmation?: React.Dispatch<React.SetStateAction<string | undefined>>;
  authenticate: () => Promise<void>;
}

const AuthForm: React.FC<AuthFormProps> = (props: AuthFormProps) => {
  const formClasses = formStyles();

  const history = useHistory();

  return (
    <Container className={formClasses.centerForm}>
      <header>
        <Typography variant='h4' align='center' style={{ margin: '15px auto' }}>
          {props.title}
        </Typography>
      </header>
      <form className={formClasses.displayRows}>
        {props.type === 'register' && (
          <TextField
            variant='outlined'
            label='Username:'
            onChange={(event) => {
              if (props.setUsername) props.setUsername(event.target.value);
            }}
          />
        )}
        <TextField
          variant='outlined'
          label='E-mail:'
          onChange={(event) => props.setEmail(event.target.value)}
          type='email'
        />
        <TextField
          variant='outlined'
          label='Password:'
          onChange={(event) => props.setPassword(event.target.value)}
          type='password'
        />
        {props.type === 'register' && (
          <TextField
            type='password'
            variant='outlined'
            label='Repeat password:'
            onChange={(event) => {
              if (props.setConfirmation)
                props.setConfirmation(event.target.value);
            }}
          />
        )}
        <div className={formClasses.displayRowsButtons}>
          {props.type === 'login' ? (
            <>
              <Button
                variant='contained'
                color='primary'
                onClick={() => props.authenticate()}
              >
                Sign in
              </Button>
              <Button
                variant='contained'
                onClick={() => history.push('/register')}
              >
                Don't have an account? Register
              </Button>
            </>
          ) : (
            <>
              <Button
                variant='contained'
                color='primary'
                onClick={() => props.authenticate()}
              >
                Register
              </Button>
              <Button
                variant='contained'
                onClick={() => history.push('/login')}
              >
                Already have an account? Sign in
              </Button>
            </>
          )}
          <Button variant='outlined' onClick={() => history.push('/')}>
            Cancel
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default AuthForm;
