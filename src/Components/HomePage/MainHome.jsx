import React from 'react'
import Cookies from 'js-cookie';
import PlayerDashboard from './PlayerDashboard';
import ServiceProviderDash from './ServiceProviderDash';

const MainHome = () => {
  return (
    <>
      {Cookies.get("role") === "user" ? <PlayerDashboard /> : <ServiceProviderDash />}
    </>
  )
}

export default MainHome
