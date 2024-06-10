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

const MainNavBar = () => {

    const navbarState = useSelector((state) => state.navbar)

    const { avatarUrl,setAvatarUrl } = useAvatar();


    useEffect(() => {
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
            toast.error("Error fetching profile data:", error);
          }
        };
        fetchProfile();
      }, []);

   
    return (
        <>
       
            {navbarState ? Cookies.get("role") === "user" ? <PlayerNavbar avatarUrl={avatarUrl} /> : <ServiceProviderNavbar avatarUrl={avatarUrl}/> : ""}
            <Toaster/>
        </>
    )
}

export default MainNavBar