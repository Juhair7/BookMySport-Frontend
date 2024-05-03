import axios from 'axios'
import Cookies from 'js-cookie';
import React from 'react'
import { useState, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { setEmail } from '../../redux/slices/EmailStoreSlice'

const UserSignInTemp = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [selectedRole, setSelectedRole] = useState(null);
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    })

    const handleRoleSelection = (role, e) => {
        e.preventDefault()
        setSelectedRole(role)
    };

    useEffect(() => {
        if (selectedRole === "user") {
            Cookies.set("role", "user");
        } else if (selectedRole === "serviceProvider") {
            Cookies.set("role", "serviceprovider");
        }
    }, [selectedRole]);

    const handleChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value })
    }

    const handleSignIn = async (e) => {
        e.preventDefault()
        if (Cookies.get("role") === null) {
            toast.error('Choose the role below', {
                duration: 3000,
                position: 'top-right'
            });

            return;
        }
        const loadingToastId = toast.loading('Logging in...', {
            duration: Infinity,
            position: 'top-right'
        });
        try {
            const headers = {
                "Content-Type": "application/json",
                "role": Cookies.get("role")
            }
            const response = await axios.post('/api/login', {
                email: loginData.email,
                password: loginData.password
            }, { headers })

            const data = await response.data

            if (data.success) {
                toast.success('Login Successfull', {
                    duration: 3000,
                    position: "top-right"
                })
                dispatch(setEmail(loginData.email))
                navigate('/login/otpverification')
            }
            else {
                toast.error(data.message + ". Try after 2 minutes", {
                    duration: 3000,
                    position: 'top-right'
                });
                navigate('/login')
            }

        } catch (error) {
            toast.error('Something went wrong. Try again', {
                duration: 3000,
                position: 'top-right'
            });
            navigate('/login')
        }
        finally {
            toast.dismiss(loadingToastId);
        }
    }

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-20 w-20 rounded-full"
                        src="https://avatars.githubusercontent.com/u/158540243?s=48&v=4"
                        alt="Your Company"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" action="#" method="POST">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                                <div className="text-sm">
                                    <a className="font-semibold text-indigo-600 hover:text-indigo-500"
                                    style={{cursor:"pointer"}}
                                    onClick={()=>navigate("/forgotpassword")}
                                    >
                                        Forgot password?
                                    </a>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className='flex flex-wrap'>
                            <div className='mx-12'>
                                <button
                                    className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${selectedRole === "user" ? "bg-black" : "bg-indigo-600"}`}
                                    onClick={(e) => handleRoleSelection('user', e)}
                                >
                                    Player
                                </button>
                            </div>

                            <div className='mx-12'>
                                <button
                                    className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${selectedRole === "serviceProvider" ? "bg-black" : "bg-indigo-600"}`}
                                    onClick={(e) => handleRoleSelection('serviceProvider', e)}
                                >
                                    Service Provider
                                </button>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                onClick={handleSignIn}
                            >
                                Sign in
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Not a member?{' '}
                        <a href="/roleselect" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            Sign up
                        </a>
                    </p>
                </div>
            </div>
            <Toaster />
        </>
    )
}

export default UserSignInTemp