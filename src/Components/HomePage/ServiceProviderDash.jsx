import React from 'react'
import { Button } from '@mui/material';
import { useNavigate } from 'react-router';

const ServiceProviderDash = () => {
  const navigate = useNavigate()
  return (
    <>
      <Button variant="contained" onClick={() => navigate('/sportsupload')}>Upload Sports</Button>
    </>
  )
}

export default ServiceProviderDash