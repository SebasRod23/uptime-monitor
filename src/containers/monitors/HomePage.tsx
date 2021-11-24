import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Grid, Typography } from '@material-ui/core';
import { useHistory } from 'react-router';

import { iMonitor } from '../../interfaces/monitor';
import MonitorCell from '../../components/monitors/MonitorCell';

const HomePage: React.FC = () => {
  const [monitors, setMonitors] = useState<iMonitor[]>([]);
  const history = useHistory();

  useEffect(() => {
    axios
      .get<iMonitor[]>('http://localhost:3001/monitor/', {
        responseType: 'json',
        withCredentials: true,
      })
      .then((res) => {
        setMonitors(res.data);
      });
  }, []);

  return (
    <Grid container direction='column'>
      <Button
        variant='contained'
        onClick={() => {
          history.push('/create-monitor');
        }}
        style={{ marginTop: '10px' }}
      >
        New Monitor
      </Button>
      <Typography
        variant='h4'
        align='center'
        gutterBottom
        style={{ padding: '20px 0' }}
      >
        Your Monitors:
      </Typography>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          rowGap: '20px',
          marginTop: '10px',
        }}
      >
        {monitors.map((monitor) => (
          <MonitorCell monitor={monitor} />
        ))}
      </div>
    </Grid>
  );
};

export default HomePage;
