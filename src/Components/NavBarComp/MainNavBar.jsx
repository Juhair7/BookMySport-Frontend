import React, { useContext } from 'react'
import PlayerNavbar from './PlayerNavbar'
import Cookies from 'js-cookie';
import ServiceProviderNavbar from './ServiceProviderNavbar';
import { useSelector } from 'react-redux';
import { apiConfig } from "../../Constants/ApiConfig";
import { useEffect } from "react";
import axios from "axios";


import { useAvatar } from '../Profile/Avatarcontext';

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
            console.error("Error fetching profile data:", error);
          }
        };
        fetchProfile();
      }, []);

    //   if(avatarUrl==null){
    //     setAvatarUrl("https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80")
    // }
    return (
        <>
       
            {navbarState ? Cookies.get("role") === "user" ? <PlayerNavbar avatarUrl={avatarUrl} /> : <ServiceProviderNavbar avatarUrl={avatarUrl}/> : ""}
            
        </>
    )
}

export default MainNavBar