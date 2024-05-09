import React from 'react'
import { useLocation } from 'react-router-dom';

const SlotReshedule = () => {

    const location = useLocation();
    const data = location.state;

    return (
        <>
            {/* {bookingData.slotId} */}
            Hi
        </>
    )
}

export default SlotReshedule