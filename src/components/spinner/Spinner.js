import React from 'react';
import { CircularProgress } from '@mui/material';
import "./spinner.css";

const Spinner = () => {
  return (
    <div className='circle'>
      <CircularProgress />
      <h2>Loading...</h2>
    </div>
  )
}

export default Spinner;