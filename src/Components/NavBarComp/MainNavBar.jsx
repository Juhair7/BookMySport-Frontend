import React from 'react'
import PlayerNavbar from './PlayerNavbar'
import Cookies from 'js-cookie';
import ServiceProviderNavbar from './ServiceProviderNavbar';
import { useSelector } from 'react-redux';

const MainNavBar = () => {

    const navbarState = useSelector((state) => state.navbar)

    return (
        <>
            {navbarState ? Cookies.get("role") === "user" ? <PlayerNavbar /> : <ServiceProviderNavbar /> : ""}
        </>
    )
}

export default MainNavBar