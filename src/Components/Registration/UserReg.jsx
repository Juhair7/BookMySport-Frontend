import React from 'react'
import UserSignUpTemp from '../Templates/UserSignUpTemp'
import { useGoogleOneTapLogin } from '@react-oauth/google';
import { userRegMethod } from '../../redux/slices/UserRegSlice'
import { useDispatch } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import { setNavbarState } from '../../redux/slices/NavbarStateSlice'

const UserReg = () => {

  const dispatch = useDispatch()
  dispatch(setNavbarState(false))

  const [userData, setuserData] = useState({
    userName: "",
    email: ""
  })

  useGoogleOneTapLogin({
    onSuccess: credentialResponse => {
      const decoded = jwtDecode(credentialResponse.credential)
      setuserData({
        userName: decoded.given_name,
        email: decoded.email
      })

    },
    onError: () => {
      toast.error('Login failed. Try again', {
        duration: 3000,
        position: 'top-right'
      });
    },
  });

  useEffect(() => {
    if (userData.userName && userData.email) {

      const handle = async () => {
        const response = await dispatch(userRegMethod(userData));

        const loadingToastId = toast.loading('Registering...', {
          duration: Infinity,
          position: 'top-right'
        });

        try {
          if (response.payload.success) {
            Cookies.set("token", response.payload.token)
            toast.success('Registration success', {
              duration: 3000,
              position: 'top-right'
            });
          }
          else {
            toast.error('User with mail exists', {
              duration: 3000,
              position: 'top-right'
            });
          }
        } catch (error) {
          toast.error('Something went wrong. Try again', {
            duration: 3000,
            position: 'top-right'
          });
        } finally {
          toast.dismiss(loadingToastId);
        }
      }
      handle()
    }
  }, [userData, dispatch]);


  return (
    <>
      <p className='text-center text-xl'>Register as a player</p>
      <div className="flex justify-center items-center my-3" >
        <UserSignUpTemp />
      </div>
    </>
  )
}

export default UserReg