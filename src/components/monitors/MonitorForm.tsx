import React from 'react';
import {
  Button,
  makeStyles,
  createStyles,
  TextField,
  Theme,
  Container,
} from '@material-ui/core';
import { useHistory } from 'react-router';

const formStyles = makeStyles((theme: Theme) =>
  createStyles({
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

interface MonitorFormProps {
  name: string | undefined;
  setName: React.Dispatch<React.SetStateAction<string>>;
  url: string;
  setURL: React.Dispatch<React.SetStateAction<string>>;
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  isEditing: boolean;
  method: () => Promise<void>;
}

const MonitorForm: React.FC<MonitorFormProps> = (props: MonitorFormProps) => {
  const formClasses = formStyles();

  const history = useHistory();

  return (
    <Container>
      <form className={formClasses.displayRows}>
        <TextField
          variant='outlined'
          label='Name:'
          onChange={(event) => {
            props.setName(event.target.value);
          }}
          value={props.name}
        />
        <TextField
          variant='outlined'
          label='URL:'
          onChange={(event) => {
            props.setURL(event.target.value);
          }}
          value={props.url}
        />
        <TextField
          variant='outlined'
          label='Personalized Message:'
          onChange={(event) => {
            props.setMessage(event.target.value);
          }}
          value={props.message}
        />
        <div className={formClasses.displayRowsButtons}>
          <Button
            variant='contained'
            color='secondary'
            onClick={() => props.method()}
          >
            {!props.isEditing ? 'Save' : 'Update'}
          </Button>
          <Button variant='outlined' onClick={() => history.push('/home')}>
            Cancel
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default MonitorForm;
