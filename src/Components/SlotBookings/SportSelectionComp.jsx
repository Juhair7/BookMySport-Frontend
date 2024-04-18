import React, { useEffect, useState } from 'react'
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

const SportSelectionComp = (props) => {

    const { arenaId } = props
    const [sports, setsports] = useState([])
    const [price, setprice] = useState(0)

    const now = new Date();
    const [fromTime, setfromTime] = useState(dayjs().hour(now.getHours()).minute(0))
    const [endTime, setendTime] = useState(dayjs().hour(now.getHours() + 1).minute(0))
    const [bookingDate, setbookingDate] = useState(dayjs().hour(now.getHours))
    const [numerOfCourts, setnumerOfCourts] = useState(null)

    const courts = Array.from({ length: numerOfCourts }, (_, index) => index + 1);

    // const [defalutInfo, setdefalutInfo] = useState(null)

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
                // setdefalutInfo(data[0])

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
            console.log("Selected Sport:", value);
            setprice(value.pricePerHour)
            setnumerOfCourts(value.numberOfCourts)
        }
    }

    const handleBooking = () => {

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
                                // value={defalutInfo}
                                />
                            </div >
                        </div>

                        <div className='grid grid-cols-3 gap-3 my-4'>
                            {courts.map((item) => (
                                <div key={item}>
                                    <Button variant="outlined">Court {item}</Button>
                                </div>
                            ))}
                        </div>

                    </div>
                    <div className="tour-receipt-detail">
                        <div className="tour-receipt-detail-item">
                            <div className="tour-receipt-detail-title">Hours</div>
                            <div className="tour-receipt-detail-price">{endTime.hour() - fromTime.hour()} hrs</div>
                        </div>
                        <div className="tour-receipt-detail-item">
                            <div className="tour-receipt-detail-title">
                                ₹{price} x {endTime.hour() - fromTime.hour()}
                            </div>
                            <div className="tour-receipt-detail-price">₹{price * (endTime.hour() - fromTime.hour())}</div>
                        </div>
                        <div
                            className="tour-receipt-detail-item tour-receipt-detail-total"
                        >
                            <div className="tour-receipt-detail-title">Total</div>
                            <div className="tour-receipt-detail-price">₹{price * (endTime.hour() - fromTime.hour())}</div>
                        </div>
                    </div>
                    <div className="tour-receipt-button">
                        <button className="book-button" onClick={handleBooking}>Book Now </button>
                    </div>
                </div>
            </div>
            <Toaster />
        </>
    )
}

export default SportSelectionComp