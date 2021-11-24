import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory, useLocation } from 'react-router';
import { Typography } from '@material-ui/core';

import Spinner from '../../components/Spinner';
import MonitorForm from '../../components/monitors/MonitorForm';
import { iMonitor } from '../../interfaces/monitor';

const UpdatePage: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [url, setURL] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [id, setId] = useState<string>('');
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
        setURL(res.data.url);
        setMessage(res.data.message);
        setId(res.data._id);
      });
    // eslint-disable-next-line
  }, []);

  const Update = async () => {
    setLoading(true);
    await axios('http://localhost:3001/monitor/' + id + '/update', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      data: {
        name,
        message,
        url,
      },
      withCredentials: true,
      responseType: 'json',
    }).then(
      (res) => {
        history.push('/home');
      },
      (err) => {
        setLoading(false);
        setName('');
        setURL('');
        setMessage('');
        return;
      },
    );
  };
  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Typography
            variant='h4'
            gutterBottom
            align='center'
            style={{ margin: '15px 0' }}
          >
            Edit this monitor
          </Typography>
          <MonitorForm
            name={name}
            setName={setName}
            url={url}
            setURL={setURL}
            message={message}
            setMessage={setMessage}
            isEditing={false}
            method={Update}
          />
        </>
      )}
    </div>
  );
};

export default UpdatePage;
