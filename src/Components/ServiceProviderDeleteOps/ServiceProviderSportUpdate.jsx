import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchSportsMethod } from '../../redux/slices/FetchSportsSlice'
import { Trophy, Edit, Coins, GalleryHorizontalEnd } from 'lucide-react'
import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import zIndex from '@mui/material/styles/zIndex'

const ServiceProviderSportUpdate = () => {

    const dispatch = useDispatch()
    const [sports, setsports] = useState([])
    const [modal, setmodal] = useState(false)
    const [open, setOpen] = useState(false)
    const cancelButtonRef = useRef(null)

    const [newSportDetails, setnewSportDetails] = useState({
        sportName: "",
        pricePerHour: "",
        numberOfCourts: ""
    })

    useEffect(() => {

        const fetchSports = async () => {
            const response = await dispatch(fetchSportsMethod())
            console.log("Response is", response.payload)
            setsports(response.payload)
        }

        fetchSports()
    }, [])

    const handleSportDetailsChanges = (e) => {
        setnewSportDetails({ ...newSportDetails, [e.target.name]: e.target.value })
    }

    return (
        <>
            <div className='tour-content-title' style={{ marginLeft: "56px" }} >Sports details Updation</div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 z-1' style={{ position: 'relative', zIndex: '999' }}>
                {sports.map((sport) => (
                    <>
                        <div id="timeline-modal" tabIndex="-1" aria-hidden="true" className="overflow-y-auto overflow-x-hidden z-50  items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full" style={{ marginLeft: "36px" }} key={sport.sportId}>
                            <div className="relative p-4 w-full max-w-md max-h-full grid">
                                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                            Update the {sport.sportName} Sport
                                        </h3>
                                    </div>
                                    <div className="p-4 md:p-5">
                                        <ol className="relative border-s border-gray-200 dark:border-gray-600 ms-3.5 mb-4 md:mb-5">
                                            <li className="mb-10 ms-8">
                                                <span className="absolute flex items-center justify-center w-6 h-6 bg-gray-100 rounded-full -start-3.5 ring-8 ring-white dark:ring-gray-700 dark:bg-gray-600 mt-1">
                                                    <Trophy color='white' size={"20px"} />
                                                </span>
                                                <h3 className="flex items-start mb-1 text-lg font-semibold text-gray-900 dark:text-white">{sport.sportName}</h3>
                                                <button type="button" className="py-2 px-3 inline-flex items-center text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" style={{ marginLeft: "-2px" }}
                                                    onClick={() => setOpen(true)}
                                                >
                                                    <Edit size={"15px"} />
                                                    Edit sport name
                                                </button>
                                            </li>
                                            <li className="mb-10 ms-8">
                                                <span className="absolute flex items-center justify-center w-6 h-6 bg-gray-100 rounded-full -start-3.5 ring-8 ring-white dark:ring-gray-700 dark:bg-gray-600 mt-1">
                                                    <Coins color='white' size={"20px"} />
                                                </span>
                                                <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">Price Per Hour</h3>
                                                <time className="block mb-3 text-sm font-normal leading-none text-gray-500 dark:text-gray-400">Currect price - ₹{sport.pricePerHour}</time>
                                                <button type="button" className="py-2 px-3 inline-flex items-center text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" style={{ marginLeft: "-2px" }}>
                                                    <Edit size={"15px"} />
                                                    Edit Price Per Hour
                                                </button>
                                            </li>
                                            <li className="ms-8">
                                                <span className="absolute flex items-center justify-center w-6 h-6 bg-gray-100 rounded-full -start-3.5 ring-8 ring-white dark:ring-gray-700 dark:bg-gray-600 mt-1">
                                                    <GalleryHorizontalEnd color='white' size={"20px"} />
                                                </span>
                                                <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">Number of courts</h3>
                                                <button type="button" className="py-2 px-3 inline-flex items-center text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" style={{ marginLeft: "-2px" }}>
                                                    <Edit size={"15px"} />
                                                    Edit number of courts
                                                </button>
                                            </li>
                                        </ol>
                                        <button className="text-white inline-flex w-full justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" style={{ cursor: "pointer" }} onClick={() => console.log("Clicked")}>
                                            Finalize Sport Details
                                        </button>

                                        <button className="text-white inline-flex w-full justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-blue-800 mt-3" style={{ cursor: "pointer" }}>
                                            Delete Sport
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ))}
            </div>

            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative" initialFocus={cancelButtonRef} onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 w-screen overflow-y-auto z-15" style={{ zIndex: '1000' }}>
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="transform overflow-hidden rounded-lg text-left shadow-xl bg-sky-500/50 transition-all sm:my-8 sm:w-full sm:max-w-lg" style={{ width: "450px" }}>
                                    <div id="authentication-modal" tabIndex="-1" aria-hidden="true" className="top-0 right-0 left-0 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                                        <div className="relative p-4 w-full max-w-md max-h-full">
                                            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                                        Change Sport Details
                                                    </h3>
                                                    <button type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal"
                                                        onClick={() => setOpen(false)}
                                                    >
                                                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                                        </svg>
                                                    </button>
                                                </div>
                                                <div className="p-4 md:p-5">
                                                    <form className="space-y-4" action="#">
                                                        <div>
                                                            <label htmlFor="sportName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sport Name</label>
                                                            <input type="text" name="sportName" id="sportName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                                                        </div>
                                                        <div>
                                                            <label htmlFor="pricePerHour" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price Per Hour</label>
                                                            <input type="number" name="pricePerHour" id="pricePerHour"  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <div className="flex items-start">
                                                                <div className="flex items-center h-5">
                                                                    <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                                                                </div>
                                                                <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                                                            </div>
                                                            <a href="#" className="text-sm text-blue-700 hover:underline dark:text-blue-500">Lost Password?</a>
                                                        </div>
                                                        <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login to your account</button>
                                                        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                                                            Not registered? <a href="#" className="text-blue-700 hover:underline dark:text-blue-500">Create account</a>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>

        </>
    )
}

export default ServiceProviderSportUpdate