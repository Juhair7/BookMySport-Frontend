import React, { useEffect } from 'react'
import Cookies from 'js-cookie';
import PlayerDashboard from './PlayerDashboard';
import ServiceProviderDash from './ServiceProviderDash';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setNavbarState } from '../../redux/slices/NavbarStateSlice'

const MainHome = () => {

  const navigate = useNavigate()

  useEffect(() => {
    if (Cookies.get("token") === undefined && Cookies.get("role") === undefined) {
      const dispatch = useDispatch()
      dispatch(setNavbarState(false))
      navigate('/landing')
    }
  }, [])

  return (
    <>
      {Cookies.get("role") === "user" ? <PlayerDashboard /> : <ServiceProviderDash />}
    </>
  )
}

export default MainHome
