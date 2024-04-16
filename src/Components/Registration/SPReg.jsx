import React from 'react'
import SPSignUpTemp from '../Templates/SPSignUpTemp'
import { useDispatch } from 'react-redux';
import { setNavbarState } from '../../redux/slices/NavbarStateSlice'

const SPReg = () => {

  const dispatch = useDispatch()
  dispatch(setNavbarState(false))
  return (
    <>
      <div className='flex flex-wrap flex-row justify-center' style={{ backgroundImage: 'url("pexels-juan-salamanca-61143.jpg")', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', border: '2px solid black', opacity: 0.75,backgroundAttachment: 'fixed' }}>
        <div>
          <SPSignUpTemp />
        </div>
      </div>
    </>
  )
}

export default SPReg