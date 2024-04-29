import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchSportsMethod } from '../../redux/slices/FetchSportsSlice'
import { Trophy, Edit, Coins, GalleryHorizontalEnd } from 'lucide-react'
import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import axios from 'axios'
import { apiConfig } from '../../Constants/ApiConfig'
import { toast, Toaster } from 'react-hot-toast'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import Cookies from 'js-cookie';

const ServiceProviderSportUpdate = () => {

    const dispatch = useDispatch()
    const [updateSuccess, setUpdateSuccess] = useState(false)
    const [sports, setsports] = useState([])
    const [open, setOpen] = useState(false)
    const cancelButtonRef = useRef(null)

    const [deleteModal, setdeleteModal] = useState(false)

    const [newSportDetails, setnewSportDetails] = useState({
        sportId: "",
        spId: "",
        sportName: "",
        pricePerHour: "",
        numberOfCourts: ""
    })

    useEffect(() => {

        const fetchSports = async () => {
            const response = await dispatch(fetchSportsMethod())
            setsports(response.payload)
        }
        setUpdateSuccess(false)

        fetchSports()
    }, [updateSuccess])

    const handleSportDetailsChanges = (e) => {
        setnewSportDetails({ ...newSportDetails, [e.target.name]: e.target.value })
    }

    const closeModal = () => {
        setOpen(false)
    }

    const setClickedSports = (sport) => {
        setOpen(true)
        setnewSportDetails({
            sportId: sport.sportId,
            spId: sport.spId,
            sportName: sport.sportName.replace(/\b\w/g, match => match.toUpperCase()),
            pricePerHour: sport.pricePerHour,
            numberOfCourts: sport.numberOfCourts
        })
    }

    const finalUpdate = async (e) => {

        e.preventDefault()
        const loadingToastId = toast.loading('Updating sport', {
            duration: Infinity,
            position: 'top-right'
        });


        try {
            closeModal()

            const response = await axios.put(`${apiConfig.sp}/updatesportdetails`, newSportDetails)
            const data = await response.data

            if (data.success) {
                setUpdateSuccess(true)
                toast.success('Sport update successfull', {
                    duration: 3000,
                    position: "top-right"
                })
            }
            else {
                toast.error(data.message, {
                    duration: 3000,
                    position: 'top-right'
                });
            }
        } catch (error) {
            toast.error('Something went wrong. Try again', {
                duration: 3000,
                position: 'top-right'
            });
        }
        finally {
            toast.dismiss(loadingToastId)
        }

    }

    const [deleteSport, setdeleteSport] = useState({
        sportId: "",
        sportName: ""
    })

    const handleDeleteButton = (sport) => {
        setdeleteSport({
            sportId: sport.sportId,
            sportName: sport.sportName
        })
        setdeleteModal(true)
    }

    const handleDeleteSport = async () => {

        try {

            const headers = {
                "Content-Type": "application/json",
                "token": Cookies.get("token"),
                "role": Cookies.get("role"),
                "sportId": deleteSport.sportId
            }

            const response = await axios.delete(`${apiConfig.sp}/deletesport`, { headers })

            const deleteStatus = response.data
            if (deleteStatus.success) {
                setUpdateSuccess(true)
                toast.success('Sport deleted', {
                    duration: 3000,
                    position: "top-right"
                })
            }
            else {
                toast.error('Sport not found. Refresh the page and try again.', {
                    duration: 3000,
                    position: "top-right"
                })
            }
        } catch (error) {
            toast.error('Something went wrong. Please try again!', {
                duration: 3000,
                position: "top-right"
            })
        }
    }

    return (
        <>
            <div className='tour-content-title' style={{ marginLeft: "56px" }} >Sports details Updation</div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 z-1' style={{ position: 'relative', zIndex: '999' }}>
                {sports.map((sport) => (
                    <div key={sport.sportId}>
                        <div id="timeline-modal" tabIndex="-1" aria-hidden="true" className="overflow-y-auto overflow-x-hidden z-50  items-center w-90 md:inset-0 h-[calc(100%-1rem)] max-h-full" style={{ marginLeft: "20px", padding: "20px" }} key={sport.sportId}>
                            <div className="relative p-4 w-full max-w-md max-h-full grid" >
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
                                            </li>
                                            <li className="mb-10 ms-8">
                                                <span className="absolute flex items-center justify-center w-6 h-6 bg-gray-100 rounded-full -start-3.5 ring-8 ring-white dark:ring-gray-700 dark:bg-gray-600 mt-1">
                                                    <Coins color='white' size={"20px"} />
                                                </span>
                                                <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">Price Per Hour</h3>
                                                <time className="block mb-3 text-sm font-normal leading-none text-gray-500 dark:text-gray-400">Currect price - ₹{sport.pricePerHour}</time>
                                            </li>
                                            <li className="ms-8">
                                                <span className="absolute flex items-center justify-center w-6 h-6 bg-gray-100 rounded-full -start-3.5 ring-8 ring-white dark:ring-gray-700 dark:bg-gray-600 mt-1">
                                                    <GalleryHorizontalEnd color='white' size={"20px"} />
                                                </span>
                                                <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">Number of courts</h3>
                                                <time className="block mb-3 text-sm font-normal leading-none text-gray-500 dark:text-gray-400">{sport.numberOfCourts}</time>
                                            </li>
                                        </ol>
                                        <button className="text-white inline-flex w-full justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" style={{ cursor: "pointer" }} onClick={() => setClickedSports(sport)}>
                                            Edit Sport Details
                                        </button>

                                        <button className="text-white inline-flex w-full justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-blue-800 mt-3" style={{ cursor: "pointer" }}
                                            onClick={() => handleDeleteButton(sport)}
                                        >
                                            Delete Sport
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <Transition.Root show={deleteModal} key={sport.sportId}>
                                <Dialog as="div" className="relative" initialFocus={cancelButtonRef} onClose={setdeleteModal}>
                                    <Transition.Child

                                        enter="ease-out duration-300"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="ease-in duration-200"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                                    </Transition.Child>

                                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto" style={{ zIndex: '2000' }}>
                                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                            <Transition.Child

                                                enter="ease-out duration-300"
                                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                                leave="ease-in duration-200"
                                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                            >
                                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                                        <div className="sm:flex sm:items-start">
                                                            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                                                <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                                                            </div>
                                                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                                <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                                                    Image deletion!
                                                                </Dialog.Title>
                                                                <div className="mt-2">
                                                                    <p className="text-sm text-gray-500">
                                                                        Are you sure you want to delete the sport - {deleteSport.sportName} ?
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                        <button
                                                            type="button"
                                                            className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                                            onClick={() => handleDeleteSport(sport)}
                                                        >
                                                            Delete
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                                            onClick={() => setdeleteModal(false)}
                                                            ref={cancelButtonRef}
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                </Dialog.Panel>
                                            </Transition.Child>
                                        </div>
                                    </div>
                                </Dialog>
                            </Transition.Root>
                        </div>
                    </div>

                ))}

            </div>

            <Transition.Root show={open} as={Fragment} >
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
                                                            <input type="text" name="sportName" id="sportName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required
                                                                value={newSportDetails.sportName}
                                                                onChange={handleSportDetailsChanges}
                                                            />
                                                        </div>
                                                        <div>
                                                            <label htmlFor="pricePerHour" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price Per Hour</label>
                                                            <input type="number" name="pricePerHour" id="pricePerHour" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required
                                                                value={newSportDetails.pricePerHour}
                                                                onChange={handleSportDetailsChanges}
                                                            />
                                                        </div>
                                                        <div>
                                                            <label htmlFor="numberOfCourts" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Number of courts</label>
                                                            <input type="number" name="numberOfCourts" id="numberOfCourts" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required
                                                                value={newSportDetails.numberOfCourts}
                                                                onChange={handleSportDetailsChanges}
                                                            />
                                                        </div>
                                                        <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                            onClick={finalUpdate}
                                                        >Finalize changes</button>
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
            <Toaster />
        </>

    )
}

export default ServiceProviderSportUpdate