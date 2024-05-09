import React, { useEffect, useState } from 'react'
import YourBookingItem from './YourBookingItem'
import axios from 'axios'
import { apiConfig } from '../../Constants/ApiConfig'
import Cookies from 'js-cookie'
import { toast, Toaster } from 'react-hot-toast';

const YourBookings = () => {

    const [bookingData, setbookingData] = useState([])
    const [deleteSlotState, setdeleteSlotState] = useState(false)

    useEffect(() => {
        const fetchUserBookings = async () => {

            const headers = {
                "token": Cookies.get("token"),
                "role": Cookies.get("role")
            }
            const bookingsResponse = await axios.get(`${apiConfig.userSlot}/getslotsofuser`, { headers })
            const bookingData = await bookingsResponse.data
            setbookingData(bookingData)
        }

        fetchUserBookings()
        setdeleteSlotState(false)
    }, [deleteSlotState])

    const handleDeleteBooking = async (slotId) => {

        const loadingToastId = toast.loading('Deleting your booking', {
            duration: Infinity,
            position: 'top-right'
        });

        try {
            const headers = {
                "Content-Type": "application/json",
                "slotId": slotId,
                "token": Cookies.get("token"),
                "role": Cookies.get("role")
            }
            const deleteResponse = await axios.delete(`${apiConfig.userSlot}/deleteslot`, { headers })

            const dataOfDeleteResponse = await deleteResponse.data
            if (dataOfDeleteResponse.success) {
                toast.success('Booking delete successfully', {
                    duration: 3000,
                    position: "top-right"
                })                
                setdeleteSlotState(true)
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
            toast.dismiss(loadingToastId);
        }
    }

    return (
        <>
            <div className='grid grid-cols-2 gap-2 mt-2'>
                {bookingData.map((data) => (
                    <YourBookingItem key={data.slotId} data={data} onDelete={handleDeleteBooking} />
                ))}
            </div>
            <Toaster />
        </>
    )
}

export default YourBookings