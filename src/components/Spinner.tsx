import React from 'react';
import {
  CircularProgress,
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core';

const spinnerStyles = makeStyles((_: Theme) =>
  createStyles({
    centerSpinner: {
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
    },
  }),
);

const Spinner: React.FC = () => {
  const spinnerClasses = spinnerStyles();
  return (
    <div className={spinnerClasses.centerSpinner}>
      <CircularProgress size={80} />
    </div>
  );
};

export default Spinner;
