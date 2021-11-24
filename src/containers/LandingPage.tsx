import React from 'react';
import { makeStyles, createStyles, Theme, Typography } from '@material-ui/core';

const pageStyles = makeStyles((theme: Theme) =>
  createStyles({
    centerPage: {
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      textAlign: 'center',
      width: '60%',
      '@media (max-width: 1000px)': {
        width: '80%',
      },
      '@media (max-width: 600px)': {
        width: '90%',
      },
    },
  }),
);

const LandingPage: React.FC = () => {
  const pageClasses = pageStyles();
  return (
    <div className={pageClasses.centerPage}>
      <Typography variant='h1' align='center'>
        Welcome to <br /> Uptime Monitor
      </Typography>
      <Typography variant='h5' align='center'>
        Please login or register
      </Typography>
    </div>
  );
};

export default LandingPage;
