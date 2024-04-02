import React from 'react'
import UserSignUpTemp from '../Templates/UserSignUpTemp'

const UserReg = () => {
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