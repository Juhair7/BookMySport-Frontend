import React from 'react'
import { Button } from '@mui/material';
import { useNavigate } from 'react-router';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { setNavbarState } from '../../redux/slices/NavbarStateSlice'

const ServiceProviderDash = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSignOut = (e) => {
    e.preventDefault()
    Cookies.remove("role")
    Cookies.remove("token")
    dispatch(setNavbarState(false))
    navigate('/login')
  }
  
  return (
    <>
      <Button variant="contained" onClick={() => navigate('/sportsupload')}>Upload Sports</Button>
      <Button variant="contained" onClick={() => navigate('/imagesupload')}>Images Sports</Button>
      <Button variant="contained" onClick={handleSignOut}>Sign out</Button>
    </>
  )
}

export default ServiceProviderDash