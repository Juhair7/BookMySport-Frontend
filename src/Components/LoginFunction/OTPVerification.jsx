import React, { useRef, useState } from 'react';
import '../../Styles/OTPVerification.css'
import { useSelector } from 'react-redux';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import {setNavbarState} from '../../redux/slices/NavbarStateSlice'
import {apiConfig} from '../../Constants/ApiConfig'

const OTPVerification = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    dispatch(setNavbarState(false))

    const email = useSelector((state) => state.email.data)
    const inputRefs = [
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null)
    ];

    let [otp, setotp] = useState("")

    const handleInputChange = (index, e) => {
        const input = e.target;
        const value = input.value;

        if (e.key === 'Backspace' && value === '' && index > 0) {
            inputRefs[index - 1].current.focus();
            setotp(otp.slice(0, -1))
        } else if ((e.key !== 'Backspace' && value.length === 1 && index < inputRefs.length - 1)) {
            inputRefs[index + 1].current.focus();
            setotp(otp += value)
        } else {
            setotp(otp += value)
            input.value = value.slice(0, 1);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (otp.length == 6) {
            const headers = {
                "Content-Type": "application/json",
                "role": Cookies.get("role"),
                "email": email,
                "otpforTwoFAFromUser": otp
            }
            const response = await axios.post(`${apiConfig.auth}/2fa`, {}, { headers })

            const data = await response.data

            if (data.success) {
                toast.success('OTP verified', {
                    duration: 3000,
                    position: "top-right"
                })
                setTimeout(() => {
                    Cookies.set("token", data.token);
                    dispatch(setNavbarState(true))
                    navigate('/');
                }, 2000);
            }
            else {
                toast.error('Invalid OTP', {
                    duration: 3000,
                    position: "top-right"
                })
            }
        }
        else {
            setotp("")
            inputRefs.forEach((inputRef) => (inputRef.current.value = ""));
            toast.error('Enter the 6-digit OTP', {
                duration: 3000,
                position: "top-right"
            })
        }
    }

    const handleClear = (e) => {
        e.preventDefault()
        inputRefs.forEach((inputRef) => (inputRef.current.value = ""));
        setotp("")
    }

    return (
        <>
            <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
                <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
                    <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
                        <div className="flex flex-col items-center justify-center text-center space-y-2">
                            <div className="font-semibold text-3xl">
                                <p>Email Verification</p>
                            </div>
                            <div className="flex flex-row text-sm font-medium text-gray-400">
                                <p>We have sent a code to your email {email} and it will be valid for 5 minutes</p>
                            </div>
                        </div>

                        <div>
                            <form action="" method="post">
                                <div className="flex flex-col space-y-16">
                                    <div className="flex flex-row items-center justify-between w-full max-w-xs" style={{ marginLeft: "-13px" }}>
                                        {inputRefs.map((inputRef, index) => (
                                            <div className="w-16 h-16 mx-2 flex-shrink-0 input-number" key={index}>
                                                <input
                                                    ref={inputRef}
                                                    className="w-full h-full flex flex-col items-center justify-center text-center px-2 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                                                    type="number"
                                                    maxLength={1}
                                                    onChange={(e) => handleInputChange(index, e)}
                                                    onKeyDown={(e) => handleInputChange(index, e)}
                                                />
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex flex-col space-y-5">
                                        <div>
                                            <button className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm"
                                                onClick={handleSubmit}>
                                                Verify Account
                                            </button>
                                        </div>
                                        <div>
                                            <button className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm" onClick={handleClear}>

                                                Clear OTP
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Toaster />
        </>
    )
}

export default OTPVerification;
