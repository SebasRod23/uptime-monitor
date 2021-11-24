import React, { useEffect, useState } from 'react';
import {
  createStyles,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import { Button, ListItemButton } from '@mui/material';
import { useHistory, useLocation } from 'react-router';
import axios from 'axios';

import { iMonitor, Record } from '../../interfaces/monitor';

const pageStyles = makeStyles((_: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
  }),
);

const RecordsPage: React.FC = () => {
  const pageClasses = pageStyles();

  const [name, setName] = useState<string>('');
  const [records, setRecords] = useState<Record[]>([]);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const monitorId = location.pathname.split('/')[2];
    axios
      .get<iMonitor>('http://localhost:3001/monitor/' + monitorId, {
        responseType: 'json',
        withCredentials: true,
      })
      .then((res) => {
        setName(res.data.name);
        setRecords([...records, ...res.data.records].reverse());
      });
    // eslint-disable-next-line
  }, []);

  return (
    <div className={pageClasses.root}>
      <Typography
        variant='h4'
        gutterBottom
        align='center'
        style={{ margin: '15px 0' }}
      >
        Records for {name}
      </Typography>
      <Button variant='outlined' onClick={() => history.push('/home')}>
        Back to Home
      </Button>
      {records.length > 0 && (
        <List>
          {records.map((record) => (
            <ListItem>
              <ListItemButton>
                <ListItemText style={{ textAlign: 'center' }}>
                  {new Date(record.date).toLocaleString()}
                </ListItemText>
                <ListItemText style={{ textAlign: 'center' }}>
                  {record.status}
                </ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

export default RecordsPage;
