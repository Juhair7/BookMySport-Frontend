import React, { useEffect, useRef, useState } from 'react'
import '../../Styles/BookingInterface.css'
import axios from 'axios'
import { apiConfig } from '../../Constants/ApiConfig'
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Button } from '@mui/material';
import { Toaster, toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setRenderConditionMethod } from '../../redux/slices/SetRenderAfterReshedule'

const ResheduleModal = (props) => {

    const dispatch = useDispatch()

    const { arenaId, sportIdToSearch, slotId, closeModal } = props
    const [price, setprice] = useState(0)

    const now = new Date();
    //States to get the booked slots
    const [fromTime, setfromTime] = useState(dayjs().hour(now.getHours()).minute(0))
    const [endTime, setendTime] = useState(dayjs().hour(now.getHours() + 1).minute(0))
    const [bookingDate, setbookingDate] = useState(dayjs())
    const [numerOfCourts, setnumerOfCourts] = useState(null)

    //Displaying the courts
    const [courtsAvailable, setcourtsAvailable] = useState([])

    const [emptyCourts, setemptyCourts] = useState([])

    useEffect(() => {
        try {
            const fetchSportInfo = async () => {
                const headers = {
                    "spId": arenaId,
                    "sportId": sportIdToSearch
                }

                const responseForFindingBySpIdAndSportId = await axios.get(`${apiConfig.sp}/getsportbyspidandsportid`, { headers })
                const dataOfSport = await responseForFindingBySpIdAndSportId.data
                setnumerOfCourts(dataOfSport.numberOfCourts)
                setprice(dataOfSport.pricePerHour)
            }
            fetchSportInfo()
        } catch (error) {
            toast.error('Something went wrong. Please try again.', {
                duration: 3000,
                position: "top-right"
            })
        }
    }, [])


    const [selectedCourts, setSelectedCourts] = useState([]);

    const selectedCourtsRef = useRef([]);

    useEffect(() => {
        selectedCourtsRef.current = selectedCourts.join(",");
    }, [selectedCourts]);

    useEffect(() => {

        if (arenaId === null || sportIdToSearch === null || bookingDate === null || fromTime.hour() === null || endTime.hour() === null) {
            return
        }

        const fetchCourtsFromBookings = async () => {

            const headers = {
                "Content-Type": "application/json"
            }

            const responseFromUserSlot = await axios.post(`${apiConfig.userSlot}/getbookedslots`, {

                spId: arenaId,
                sportId: sportIdToSearch,
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
                sportId: sportIdToSearch,
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

    }, [fromTime, endTime, bookingDate])


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

    const handleReshedule = async () => {
        closeModal()
        const loadingToastId = toast.loading('Resheduling your booking', {
            duration: Infinity,
            position: 'top-right'
        });
        try {
            const responseForReshedule = await axios.put(`${apiConfig.userSlot}/rescheduleslot`, {
                slotId: slotId,
                startTime: fromTime.hour(),
                stopTime: endTime.hour(),
                dateOfBooking: bookingDate,
                courtNumber: selectedCourts.join(",")
            })
            const dataForReshedule = await responseForReshedule.data
            if (dataForReshedule.success) {
                toast.success(`Slot Resheduled successfully and ${dataForReshedule.message}`, {
                    duration: 3000,
                    position: "top-right"
                })
                dispatch(setRenderConditionMethod(true))
            }
            else {
                toast.error(dataOfDeleteResponse.message, {
                    duration: 3000,
                    position: "top-right"
                })
            }

        } catch (error) {
            toast.error('Something went wrong. Please try again.', {
                duration: 3000,
                position: "top-right"
            })
        }
        finally {
            toast.dismiss(loadingToastId)
        }
    }

    return (
        <>
            <div className="tour-sidebar sticky z-40" style={{ marginTop: "-70px", width: "100%", marginLeft: "-2px", marginBottom: "0px" }}>
                <div className="tour-receipt">
                    <div className="tour-receipt-head">
                        <div className="tour-amount">
                            ₹{price}
                            <span>/hour</span>
                        </div>
                        <div className="tour-discount">-10%</div>
                    </div>
                    <div className="tour-receipt-select" style={{ width: "445px", }}>

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
                            <div style={{ marginLeft: "-10px" }}>
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

                        <div className='grid grid-cols-3 gap-3 my-4'>
                            {bookingDate === null ? (
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
                            <div className="tour-receipt-detail-price">₹{price * (endTime.hour() - fromTime.hour()) * selectedCourts.length}</div>
                        </div>
                    </div>

                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                        <button
                            type="button"
                            className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                            onClick={handleReshedule}
                        >
                            Confirm Changes
                        </button>
                        <button
                            type="button"
                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                            onClick={() => closeModal()}
                        >
                            Cancel
                        </button>
                    </div>
                </div>

            </div>
            <Toaster />
        </>
    )
}

export default ResheduleModal