import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { setNavbarState } from '../../redux/slices/NavbarStateSlice'

const ResetPassword = () => {

    const dispatch = useDispatch()

    dispatch(setNavbarState(false))

    const email = useSelector((state) => state.email.data)

    const navigate = useNavigate()

    const [creds, setcreds] = useState({
        password: "",
        confirmPassword: ""
    })

    const handleChange = (e) => {
        setcreds({ ...creds, [e.target.name]: e.target.value })
    }

    const handlePasswordReset = async (e) => {
        e.preventDefault()

        const loadingToastId = toast.loading('Sending OTP', {
            duration: Infinity,
            position: 'top-right'
        });

        try {
            const headers = {
                "Content-Type": "application/json",
                "role": Cookies.get("role"),
                "email": email,
                "passwordFromUser": creds.password
            }

            const response = await axios.post('api/resetpassword', {}, { headers })

            const data = await response.data

            if (data.success) {
                toast.success('Password Reset Successfully', {
                    duration: 3000,
                    position: "top-right"
                })
                navigate('/')
            }
            else {
                toast.error('Something went wrong', {
                    duration: 3000,
                    position: "top-right"
                })
            }
        } catch (error) {
            toast.error('Something went wrong', {
                duration: 3000,
                position: "top-right"
            })
        }
        finally {
            toast.dismiss(loadingToastId);
        }

    }

    return (
        <>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">

                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Reset Password</h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" action="#" method="POST">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                            <div className="mt-2">
                                <input id="password" name="password" type="password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={handleChange} />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Confirm Password</label>
                            </div>
                            <div className="mt-2">
                                <input id="confirmPassword" name="confirmPassword" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={handleChange} />
                            </div>
                        </div>

                        <div>
                            <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={handlePasswordReset}>Reset Password</button>
                        </div>
                    </form>
                </div>
            </div>
            <Toaster />
        </>
    )

}
export default ResetPassword