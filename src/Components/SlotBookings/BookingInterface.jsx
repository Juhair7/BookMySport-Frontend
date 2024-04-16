import React from 'react'
import { useParams } from 'react-router-dom';

const BookingInterface = () => {

    const { arenaId } = useParams();

    return (
        <div>Areana id is {arenaId}</div>
    )
}

export default BookingInterface