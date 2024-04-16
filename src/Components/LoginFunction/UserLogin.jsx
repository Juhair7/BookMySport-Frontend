import React from 'react'
import UserSignInTemp from '../Templates/UserSignInTemp'
import { useDispatch } from 'react-redux';
import { setNavbarState } from '../../redux/slices/NavbarStateSlice'

const UserLogin = () => {

  const dispatch = useDispatch()
  dispatch(setNavbarState(false))


  return (
    <>
      <UserSignInTemp />
    </>
  )
}

export default UserLogin