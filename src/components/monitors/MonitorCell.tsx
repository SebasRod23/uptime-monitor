import React from 'react';
import { createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import { Card, Button } from '@mui/material';
import { useHistory } from 'react-router';
import axios from 'axios';

import { iMonitor } from '../../interfaces/monitor';

interface CellProps {
  monitor: iMonitor;
}

const cellStyles = makeStyles((_: Theme) =>
  createStyles({
    cell: {
      width: '90%',
      display: 'flex',
      flexDirection: 'column',
      padding: '10px 0',
    },
    infoContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      margin: '5px 10px',
    },
    displayRowsButtons: {
      display: 'flex',
      gap: '16px',
    },
    container: {
      display: 'flex',
      flexDirection: 'row',
      gap: '25px',
    },
    status: {
      width: '60px',
      textAlign: 'center',
    },
  }),
);

const MonitorCell: React.FC<CellProps> = (props: CellProps) => {
  const cellClasses = cellStyles();
  const history = useHistory();

  const DeleteThis = async () => {
    await axios(
      'http://localhost:3001/monitor/' + props.monitor._id + '/delete',
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        withCredentials: true,
        responseType: 'json',
      },
    ).then((res) => {
      window.location.reload();
    });
  };
  return (
    <Card key={props.monitor._id} className={cellClasses.cell} raised>
      <div className={cellClasses.infoContainer}>
        <div className={cellClasses.container}>
          <div className={cellClasses.status}>
            {props.monitor.records.length > 0 ? (
              <Typography
                variant='h6'
                align='center'
                style={{
                  color:
                    props.monitor.records.slice(-1)[0].status === 'OKAY'
                      ? 'green'
                      : 'red',
                }}
              >
                {props.monitor.records.slice(-1)[0].status === 'OKAY'
                  ? 'UP'
                  : 'DOWN'}
              </Typography>
            ) : (
              <Typography variant='h6' align='center'>
                NEW
              </Typography>
            )}
          </div>
          <Typography variant='h5' align='center'>
            {props.monitor.name}
          </Typography>
        </div>
        <div className={cellClasses.displayRowsButtons}>
          <Button
            variant='contained'
            color='primary'
            onClick={() => {
              history.push('/view-records/' + props.monitor._id);
            }}
          >
            View Records
          </Button>
          <Button
            variant='contained'
            color='primary'
            onClick={() => {
              history.push('/edit-monitor/' + props.monitor._id);
            }}
          >
            Edit
          </Button>
          <Button variant='contained' color='error' onClick={DeleteThis}>
            Remove
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default MonitorCell;
