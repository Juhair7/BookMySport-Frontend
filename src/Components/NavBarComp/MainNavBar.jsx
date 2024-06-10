import React, { useContext } from 'react'
import PlayerNavbar from './PlayerNavbar'
import Cookies from 'js-cookie';
import ServiceProviderNavbar from './ServiceProviderNavbar';
import { useSelector } from 'react-redux';
import { apiConfig } from "../../Constants/ApiConfig";
import { useEffect } from "react";
import axios from "axios";
import { useAvatar } from '../Profile/Avatarcontext';
import toast, { Toaster } from 'react-hot-toast';
import { useLocation } from 'react-router-dom';

const MainNavBar = () => {

  const location = useLocation()

  const navbarState = useSelector((state) => state.navbar)

  const { avatarUrl, setAvatarUrl } = useAvatar();

  useEffect(() => {
    if (location.pathname === '/landing') {
      return
    }
    const fetchProfile = async () => {
      try {
        const headers = {
          "Content-Type": "application/json",
          token: Cookies.get("token"),
          role: Cookies.get("role"),
        };

        const avatarResponse = await axios.get(`${apiConfig.auth}/getavatar`, {
          headers,
        });
        setAvatarUrl(avatarResponse.data.avatar);

      } catch (error) {
        toast.error("Error fetching profile data:", {
          duration: 3000,
          position: "top-right"
        });
      }
    };
    fetchProfile();
  }, []);


  return (
    <>

      {navbarState ? Cookies.get("role") === "user" ? <PlayerNavbar avatarUrl={avatarUrl} /> : <ServiceProviderNavbar avatarUrl={avatarUrl} /> : ""}
      <Toaster />
    </>
  )
}

export default MainNavBar