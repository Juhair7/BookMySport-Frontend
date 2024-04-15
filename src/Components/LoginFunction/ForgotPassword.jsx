import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { setEmail } from '../../redux/slices/EmailStoreSlice'

const ForgotPassword = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [otpVisibility, setotpVisibility] = useState(false)
    const [selectedRole, setSelectedRole] = useState(null);

    const handleForgotPassword = async (e) => {
        e.preventDefault()
        let email = document.getElementById("email")

        const loadingToastId = toast.loading('Sending OTP', {
            duration: Infinity,
            position: 'top-right'
        });

        try {
            const headers = {
                "Content-Type": "application/json",
                "role": Cookies.get("role"),
                "email": email.value
            }

            const response = await axios.post('api/forgotpassword', {}, { headers })

            const data = response.data
            console.log(Cookies.get("role"))
            console.log(data)
            if (data.success) {
                toast.success('Enter the otp', {
                    duration: 3000,
                    position: "top-right"
                })
                setotpVisibility(true)
                dispatch(setEmail(email.value))
            }
            else {
                toast.error('Invalid OTP', {
                    duration: 3000,
                    position: "top-right"
                })
            }
        } catch (error) {
            console.log(error.message)
            toast.error('Something went wrong', {
                duration: 3000,
                position: "top-right"
            })
        }
        finally {
            toast.dismiss(loadingToastId);
        }

    }

    const handleVerifyOTP = async (e) => {
        e.preventDefault()
        const headers = {
            "Content-Type": "application/json",
            "email": email.value,
            "otp": document.getElementById("otp").value
        }

        const response = await axios.post('api/verifyOtpforforgotpassword', {}, { headers })

        const dataForOtp = await response.data

        if (dataForOtp.success) {
            toast.success('OTP Verified.', {
                duration: 3000,
                position: "top-right"
            })
            setTimeout(() => {
                navigate('/resetpassword');
            }, 2000);

        }
        else {
            toast.error('Invalid OTP', {
                duration: 3000,
                position: "top-right"
            })
        }
    }


    return (
        <>
            <main id="content" role="main" className="w-full max-w-md mx-auto p-6">
                <div className="mt-7 bg-white  rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-4 sm:p-7">
                        <div className="text-center">
                            <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Forgot password?</h1>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                Remember your password?
                                <a className="text-blue-600 decoration-2 hover:underline font-medium" href="/login">
                                    Login here
                                </a>
                            </p>
                        </div>

                        <div className="mt-5">
                            <form>
                                <div className="grid gap-y-4">
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-bold ml-1 mb-2 dark:text-white">Email address</label>
                                        <div className="relative">
                                            <input type="email" id="email" name="email" className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm" required aria-describedby="email-error" />
                                        </div>
                                        <p className="hidden text-xs text-red-600 mt-2" id="email-error">Please include a valid email address so we can get back to you</p>
                                    </div>
                                    <button type="submit" className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800" onClick={handleForgotPassword}>Send OTP</button>

                                    <div className={`${otpVisibility ? '' : 'hidden'}`}>
                                        <label htmlFor="email" className="block text-sm font-bold ml-1 mb-2 dark:text-white" >OTP</label>
                                        <div className="relative">
                                            <input type="number" id="otp" name="otp" className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm" required aria-describedby="email-error" />
                                        </div>
                                        <p className="hidden text-xs text-red-600 mt-2" id="email-error">Please include a valid email address so we can get back to you</p>
                                    </div>
                                    <button type="submit" className={`py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800 ${otpVisibility ? '' : 'hidden'}`} onClick={handleVerifyOTP}>Verify otp</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
            <Toaster />
        </>
    )
}

export default ForgotPassword