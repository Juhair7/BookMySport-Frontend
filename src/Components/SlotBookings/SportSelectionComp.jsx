import React, { useEffect, useRef, useState } from 'react'
import '../../Styles/BookingInterface.css'
import axios from 'axios'
import { apiConfig } from '../../Constants/ApiConfig'
import toast, { Toaster } from 'react-hot-toast';
import { Autocomplete, TextField } from '@mui/material';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Button } from '@mui/material';
import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { History, CalendarDays, Trophy } from 'lucide-react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const SportSelectionComp = (props) => {

    const navigate = useNavigate()

    const { arenaId } = props
    const [sports, setsports] = useState([])
    const [price, setprice] = useState(0)

    const now = new Date();
    //States to get the booked slots
    const [fromTime, setfromTime] = useState(dayjs().hour(now.getHours()).minute(0))
    const [endTime, setendTime] = useState(dayjs().hour(now.getHours() + 1).minute(0))
    const [bookingDate, setbookingDate] = useState(dayjs())
    const [numerOfCourts, setnumerOfCourts] = useState(null)
    const [sportId, setsportId] = useState(null)

    const [sportNameSelected, setsportNameSelected] = useState("")

    //Displaying the courts
    const [courtsAvailable, setcourtsAvailable] = useState([])

    const [emptyCourts, setemptyCourts] = useState([])

    useEffect(() => {
        const fetchAllSportsByArenaId = async () => {
            try {
                if (!arenaId) {
                    return
                }
                const headers = {
                    "Content-Type": "application/json",
                    "spId": arenaId
                };

                const response = await axios.get(`${apiConfig.sp}/getsports`, { headers });
                const data = response.data;
                setsports(data);

            } catch (error) {
                toast.error("Failed to fetch sports. Please try again later.", {
                    duration: 5000,
                    position: "top-right"
                });
            }
        };

        fetchAllSportsByArenaId();

    }, [arenaId]);

    const handleSportInfo = (event, value) => {
        if (value) {
            setprice(value.pricePerHour)
            setnumerOfCourts(value.numberOfCourts)
            setsportId(value.sportId)
            setsportNameSelected(value.sportName)
        }
    }

    useEffect(() => {

        if (arenaId === null || sportId === null || bookingDate === null || fromTime.hour() === null || endTime.hour() === null) {
            return
        }

        const fetchCourtsFromBookings = async () => {

            const headers = {
                "Content-Type": "application/json"
            }

            const responseFromUserSlot = await axios.post(`${apiConfig.userSlot}/getbookedslots`, {

                spId: arenaId,
                sportId: sportId,
                dateOfBooking: bookingDate,
                startTime: fromTime.hour(),
                stopTime: endTime.hour()

            }, { headers });

            const dataFromUserSlots = responseFromUserSlot.data;

            if (dataFromUserSlots) {

                if (dataFromUserSlots.courtNumber !== undefined) {
                    setcourtsAvailable((prev) => prev.concat(dataFromUserSlots.courtNumber.split(',').map(Number)))
                }
            }
            else {
                setcourtsAvailable([])
            }

            const responseFromCustomGames = await axios.post(`${apiConfig.customGames}/getcustombookedslots`, {

                arenaId: arenaId,
                sportId: sportId,
                dateOfBooking: bookingDate,
                startTime: fromTime.hour(),
                stopTime: endTime.hour()

            }, { headers });

            const dataFromCustomGames = responseFromCustomGames.data;

            if (dataFromCustomGames !== undefined) {
                if (dataFromCustomGames.courtNumber !== undefined) {
                    setcourtsAvailable((prev) => prev.concat(dataFromCustomGames.courtNumber.split(',').map(Number)))
                }
            }
            else {
                setcourtsAvailable([])
            }

        }
        fetchCourtsFromBookings()
        setSelectedCourts([])

    }, [fromTime, endTime, bookingDate, sportId])

    useEffect(() => {
        const findAbsentCourts = async () => {

            if (!courtsAvailable) {
                return
            }

            // Create a set of all possible court numbers up to the total number of courts
            const allCourts = new Set(Array.from({ length: numerOfCourts }, (_, i) => i + 1));

            // Filter out the numbers that are present in the array
            const absentCourts = Array.from(allCourts).filter(court => !courtsAvailable.includes(court));

            setemptyCourts(absentCourts)

        }

        findAbsentCourts()
    }, [courtsAvailable])

    const [selectedCourts, setSelectedCourts] = useState([]);
    const [open, setOpen] = useState(false)

    const handleCourtClick = (courtNumber) => {
        // Check if the court is already selected
        if (selectedCourts.includes(courtNumber)) {
            // If the court is already selected, remove it from the array
            setSelectedCourts(selectedCourts.filter(court => court !== courtNumber));
        } else {
            // If the court is not selected, add it to the array
            setSelectedCourts([...selectedCourts, courtNumber]);
        }
    };

    const handlePanel = () => {
        setOpen(true)
    }

    const timeConverter = (time) => {
        if (0 <= time && time <= 12) {
            return time + "AM"
        }
        return time - 12 + "PM"
    }

    const dateConverter = (date) => {
        const dateParts = date.split('-');
        const year = parseInt(dateParts[2], 10);
        const month = parseInt(dateParts[1], 10) - 1;
        const day = parseInt(dateParts[0], 10);
        const dateToBeConverted = new Date(year, month, day);

        const formattedDate = dateToBeConverted.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

        return formattedDate;
    }

    const handleBooking = async () => {

        const loadingToastId = toast.loading('Booking your Slot', {
            duration: Infinity,
            position: 'top-right'
        });

        try {
            const headers = {
                "Content-Type": "application/json",
                "token": Cookies.get("token"),
                "role": Cookies.get("role")
            }

            const responseForSlotBooking = await axios.post(`${apiConfig.userSlot}/bookslot`, {

                spId: arenaId,
                sportId: sportId,
                dateOfBooking: bookingDate,
                startTime: fromTime.hour(),
                stopTime: endTime.hour(),
                courtNumber: selectedCourts.join(",")

            }, { headers });

            const dataFromSlotBooking = responseForSlotBooking.data
            if (dataFromSlotBooking.success) {
                toast.success('Your slot has been booked.', {
                    duration: 3000,
                    position: "top-right"
                })
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            }
            else {
                toast.error('Something went wrong with your booking. Try booking again!', {
                    duration: 5000,
                    position: "top-right"
                })
            }

        } catch (error) {
            toast.error('Something went wrong with your booking. Try booking again!', {
                duration: 5000,
                position: "top-right"
            })
        }
        finally {
            toast.dismiss(loadingToastId);
        }
    }

    return (
        <>
            <div className="tour-sidebar sticky top-20 z-40" style={{ marginTop: "54px" }}>
                <div className="tour-receipt">
                    <div className="tour-receipt-head">
                        <div className="tour-amount">
                            ₹{price}
                            <span>/hour</span>
                        </div>
                        <div className="tour-discount">-10%</div>
                    </div>
                    <div className="tour-receipt-select" style={{ width: "430px" }}>

                        <div style={{ marginLeft: "70px", marginTop: "-15px" }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker']}>
                                    <DatePicker label="Select date"
                                        format='DD-MMMM-YYYY'
                                        onChange={(newValue) => setbookingDate(newValue)}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </div>

                        <div className="tour-receipt-select-top" >
                            <div className="" style={{ marginLeft: "-10px" }}>
                                <div className="tour-receipt-select-content">
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={['TimePicker', 'TimePicker']}>
                                            <TimePicker
                                                label="From"
                                                value={fromTime}
                                                onChange={(newValue) => setfromTime(newValue)}
                                                minutesStep={0}
                                            />
                                            <TimePicker
                                                label="To"
                                                value={endTime}
                                                minutesStep={0}
                                                onChange={(newValue) => setendTime(newValue)}
                                            />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                </div>
                            </div>
                        </div>

                        <div className="tour-receipt-select-bottom">
                            <div className='bg-white'>
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    options={sports}
                                    getOptionLabel={(option) => option.sportName}
                                    sx={{ width: 300 }}
                                    renderInput={(params) => <TextField {...params} label="Sport" />}
                                    onChange={handleSportInfo}
                                />
                            </div >
                        </div>

                        <div className='grid grid-cols-3 gap-3 my-4'>
                            {sportId === null ? (
                                <h6>Select the sport</h6>
                            ) : bookingDate === null ? (
                                <h6>Please select the date</h6>
                            ) : (
                                <>
                                    {emptyCourts.length === 0 ? (
                                        <p className='text-center'>All courts are booked</p>
                                    ) : (
                                        emptyCourts.length !== 0 ? (
                                            emptyCourts.map((item) => (
                                                <div key={item}>
                                                    <Button
                                                        variant={selectedCourts.includes(item) ? "contained" : "outlined"}
                                                        onClick={() => handleCourtClick(item)}
                                                    >
                                                        Court {item}
                                                    </Button>
                                                </div>
                                            ))
                                        ) : (
                                            <h6>Loading courts...</h6>
                                        )
                                    )}
                                </>
                            )}
                        </div>


                    </div>
                    <div className="tour-receipt-detail">
                        <div className="tour-receipt-detail-item">
                            <div className="tour-receipt-detail-title">Hours</div>
                            <div className="tour-receipt-detail-price">{endTime.hour() - fromTime.hour()} hrs</div>
                        </div>
                        <div className="tour-receipt-detail-item">
                            <div className="tour-receipt-detail-title">Number of courts selected</div>
                            <div className="tour-receipt-detail-price">{selectedCourts.length}</div>
                        </div>
                        <div className="tour-receipt-detail-item">
                            <div className="tour-receipt-detail-title">
                                ₹{price} x {endTime.hour() - fromTime.hour()} x {selectedCourts.length}
                            </div>
                            <div className="tour-receipt-detail-price">₹{price * (endTime.hour() - fromTime.hour()) * selectedCourts.length}</div>
                        </div>
                        <div
                            className="tour-receipt-detail-item tour-receipt-detail-total"
                        >
                            <div className="tour-receipt-detail-title">Total</div>
                            <div className="tour-receipt-detail-price">₹{price * (endTime.hour() - fromTime.hour())}</div>
                        </div>
                    </div>
                    <div className="tour-receipt-button">
                        <button className="book-button" onClick={handlePanel} style={{ backgroundColor: "#1976d2" }}>Book Now </button>
                    </div>
                </div>

                <Transition.Root show={open} as={Fragment}>
                    <Dialog as="div" className="pointer-events-auto relative w-screen max-w-md z-50" onClose={setOpen}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-in-out duration-500"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in-out duration-500"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        </Transition.Child>

                        <div className="fixed inset-0 overflow-hidden">
                            <div className="absolute inset-0 overflow-hidden">
                                <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="transform transition ease-in-out duration-500 sm:duration-700"
                                        enterFrom="translate-x-full"
                                        enterTo="translate-x-0"
                                        leave="transform transition ease-in-out duration-500 sm:duration-700"
                                        leaveFrom="translate-x-0"
                                        leaveTo="translate-x-full"
                                    >
                                        <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                                            <Transition.Child
                                                as={Fragment}
                                                enter="ease-in-out duration-500"
                                                enterFrom="opacity-0"
                                                enterTo="opacity-100"
                                                leave="ease-in-out duration-500"
                                                leaveFrom="opacity-100"
                                                leaveTo="opacity-0"
                                            >
                                                <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                                                    <button
                                                        type="button"
                                                        className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                                                        onClick={() => setOpen(false)}
                                                    >
                                                        <span className="absolute -inset-2.5" />
                                                        <span className="sr-only">Close panel</span>
                                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                                    </button>
                                                </div>
                                            </Transition.Child>
                                            <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                                                <div className="relative mt-6 flex-1 px-4 sm:px-6">
                                                    <div id="timeline-modal" tabIndex="-1" aria-hidden="true" className="overflow-y-auto overflow-x-hidden justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                                                        <div className="relative p-4 w-full max-w-md max-h-full">
                                                            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                                                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                                        Your Booking Summary
                                                                    </h3>
                                                                </div>
                                                                <div className="p-4 md:p-5">
                                                                    <ol className="relative border-s border-gray-200 dark:border-gray-600 ms-3.5 mb-4 md:mb-5">
                                                                        <li className="mb-10 ms-8">
                                                                            <span className="absolute flex items-center justify-center w-6 h-6 bg-gray-100 rounded-full -start-3.5 ring-8 ring-white dark:ring-gray-700 dark:bg-gray-600 mt-1">
                                                                                <History color='white' size={"20px"} />
                                                                            </span>
                                                                            <h3 className="flex items-start mb-1 text-lg font-semibold text-gray-900 dark:text-white">From time - End time<span className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 ms-3">Latest</span></h3>
                                                                            <time className="block mb-3 text-sm font-normal leading-none text-gray-500 dark:text-gray-400">{timeConverter(fromTime.hour())} - {timeConverter(endTime.hour())}</time>
                                                                        </li>
                                                                        <li className="mb-10 ms-8">
                                                                            <span className="absolute flex items-center justify-center w-6 h-6 bg-gray-100 rounded-full -start-3.5 ring-8 ring-white dark:ring-gray-700 dark:bg-gray-600 mt-1">
                                                                                <CalendarDays color='white' size={"20px"} />
                                                                            </span>
                                                                            <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">Date of Booking</h3>
                                                                            <time className="block mb-3 text-sm font-normal leading-none text-gray-500 dark:text-gray-400">

                                                                                {dateConverter(`${bookingDate.date().toString()}-${bookingDate.month() + 1}-${bookingDate.year()}`)}

                                                                            </time>
                                                                        </li>
                                                                        <li className="mb-10 ms-8">
                                                                            <span className="absolute flex items-center justify-center w-6 h-6 bg-gray-100 rounded-full -start-3.5 ring-8 ring-white dark:ring-gray-700 dark:bg-gray-600 mt-1">
                                                                                <Trophy color='white' size={"20px"} />
                                                                            </span>
                                                                            <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">Sport Selected</h3>
                                                                            <time className="block mb-3 text-sm font-normal leading-none text-gray-500 dark:text-gray-400">{sportNameSelected}</time>
                                                                        </li>
                                                                        <li className="ms-8">
                                                                            <span className="absolute flex items-center justify-center w-6 h-6 bg-gray-100 rounded-full -start-3.5 ring-8 ring-white dark:ring-gray-700 dark:bg-gray-600 mt-1">
                                                                                <Trophy color='white' size={"20px"} />
                                                                            </span>
                                                                            <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">Courts selected</h3>
                                                                            <time className="block mb-3 text-sm font-normal leading-none text-gray-500 dark:text-gray-400 grid grid-cols-3 gap-2">

                                                                                {selectedCourts.map((item) => (
                                                                                    <div key={item} >
                                                                                        Court - {item}
                                                                                    </div>
                                                                                ))}

                                                                            </time>
                                                                        </li>
                                                                    </ol>
                                                                    <button className="text-white inline-flex w-full justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                                        onClick={() => setOpen(false)}>
                                                                        Back to edit
                                                                    </button>
                                                                    <button className="text-white inline-flex w-full justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-2"
                                                                        onClick={handleBooking}>
                                                                        Confirm Booking
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Dialog.Panel>
                                    </Transition.Child>
                                </div>
                            </div>
                        </div>
                    </Dialog>
                </Transition.Root>


            </div>
            <Toaster />
        </>
    )
}

export default SportSelectionComp