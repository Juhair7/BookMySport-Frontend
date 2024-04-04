import React from 'react'
import SPSignUpTemp from '../Templates/SPSignUpTemp'

const SPReg = () => {
  return (
    <>
      <div className='flex justify-center items-center my-3' style={{ backgroundImage: 'url("pexels-juan-salamanca-61143.jpg")', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundAttachment: '', border: '2px solid black', opacity: 0.75 }}>
        <div>
          <SPSignUpTemp />
        </div>
      </div>
    </>
  )
}

export default SPReg