import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';
import { Typography } from '@material-ui/core';

import Spinner from '../../components/Spinner';
import MonitorForm from '../../components/monitors/MonitorForm';

const CreatePage: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [url, setURL] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const history = useHistory();

  const Save = async () => {
    setLoading(true);
    await axios('http://localhost:3001/monitor/add', {
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
            Create new Monitor
          </Typography>
          <MonitorForm
            name={name}
            setName={setName}
            url={url}
            setURL={setURL}
            message={message}
            setMessage={setMessage}
            isEditing={false}
            method={Save}
          />
        </>
      )}
    </div>
  );
};

export default CreatePage;
