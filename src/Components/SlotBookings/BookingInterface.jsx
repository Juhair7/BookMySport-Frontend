import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import '../../Styles/BookingInterface.css'
import { getArenaDetailsMethod } from '../../redux/slices/GetArenaDetails'
import { useDispatch, useSelector } from 'react-redux';
import { Sunrise, Sunset, Star } from 'lucide-react';
import { getArenaImagesMethod } from '../../redux/slices/GetArenaImagesSlice'
import LoadingPage from '../Errorpages/LoadingPage'
import SportSelectionComp from './SportSelectionComp';
import axios from 'axios';
import { apiConfig } from '../../Constants/ApiConfig'

const BookingInterface = () => {

    const { arenaId } = useParams();
    const dispatch = useDispatch()
    const imageStateOfLoading = useSelector((state) => state.arenaImages.loading)

    const [arenaDetails, setarenaDetails] = useState({
        id: "",
        userName: "",
        email: "",
        phoneNumber: "",
        password: "",
        address: "",
        centreName: "",
        startTime: "",
        stopTime: "",
        rating: "",
        numberOfRatings: ""
    });

    const [images, setimages] = useState([])
    const [sports, setsports] = useState([])


    useEffect(() => {
        const handleRequest = async () => {
            const response = await dispatch(getArenaDetailsMethod(arenaId))
            const arenaData = response.payload
            setarenaDetails({
                centreName: arenaData.centreName,
                rating: arenaData.rating,
                address: arenaData.address,
                startTime: arenaData.startTime,
                stopTime: arenaData.stopTime,
                id: arenaData.id
            })

        }
        handleRequest()

        const fetchArenaImages = async () => {
            const response = await dispatch(getArenaImagesMethod(arenaId))
            setimages(response.payload)
        }

        fetchArenaImages()

        const fetchAllSportsByArenaId = async () => {
            const headers = {
                "Content-Type": "application/json",
                "spId": arenaId
            }

            const response = await axios.get(`${apiConfig.sp}/getsports`, { headers })
            const data = await response.data
            setsports(data)
        }

        fetchAllSportsByArenaId()

    }, [arenaId, dispatch])

    const timeConverter = (time) => {
        if (0 <= time && time <= 12) {
            return time + "AM"
        }
        return time - 12 + "PM"
    }

    return (
        <>
            {!imageStateOfLoading ? <div className="tour container">
                <div className="tour-head">
                    <div className="tour-head-left">
                        <div className="tour-title">
                            {arenaDetails.centreName}
                        </div>
                        <div className="tour-overview">
                            <div className="tour-overview-item">
                                {arenaDetails.address}
                            </div>
                            <div className="tour-overview-item flex mx-2">
                                <span className="material-icons-outlined"> <Star /> </span>
                                <span>{arenaDetails.rating}</span> (TODO reviews)
                            </div>
                            <div className="tour-overview-item">
                                <div className='flex'>
                                    <div className='mx-3 flex'><Sunrise />  {timeConverter(arenaDetails.startTime)}</div>
                                    <div className='mx-3 flex'><Sunset />  {timeConverter(arenaDetails.stopTime)}</div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="tour-wrapper" style={{ marginTop: "-22px" }}>
                    <div className="tour-content">

                        <div className="tour-content-block">
                            <div className="tour-content-title">Images of the Arena</div>
                            <div className="tour-places">
                                <div className="swiper">

                                    <div className="swiper-wrapper">
                                        {images.map((image) => {
                                            return <div className="swiper-slide my-3" key={image.imageId}>
                                                <div className="swiper-image">
                                                    <img
                                                        src={image.imageURL}
                                                    />
                                                </div>
                                            </div>
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="tour-content-block">
                            <div className="tour-content-title">Customer Reviews</div>
                            <div className="tour-reviews">
                                <div className="tour-reviews-feedback">
                                    <div className="tour-reviews-feedback-item">
                                        <div className="tour-reviews-feedback-content">
                                            <div className="tour-reviews-feedback-icon">
                                                <span className="material-icons-outlined">
                                                    earbuds
                                                </span>
                                            </div>
                                            <div className="tour-reviews-feedback-content-inner">
                                                <div className="tour-reviews-feedback-title">
                                                    Itinerary
                                                </div>
                                                <div className="tour-reviews-feedback-text">
                                                    Excellent
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tour-reviews-feedback-rating">4.8</div>
                                    </div>
                                    <div className="tour-reviews-feedback-item">
                                        <div className="tour-reviews-feedback-content">
                                            <div className="tour-reviews-feedback-icon">
                                                <span className="material-icons-outlined">
                                                    record_voice_over
                                                </span>
                                            </div>
                                            <div className="tour-reviews-feedback-content-inner">
                                                <div className="tour-reviews-feedback-title">
                                                    Guide
                                                </div>
                                                <div className="tour-reviews-feedback-text">
                                                    Excellent
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tour-reviews-feedback-rating">4.9</div>
                                    </div>
                                    <div className="tour-reviews-feedback-item">
                                        <div className="tour-reviews-feedback-content">
                                            <div className="tour-reviews-feedback-icon">
                                                <span className="material-icons-outlined">
                                                    directions_bus
                                                </span>
                                            </div>
                                            <div className="tour-reviews-feedback-content-inner">
                                                <div className="tour-reviews-feedback-title">
                                                    Transport
                                                </div>
                                                <div className="tour-reviews-feedback-text">
                                                    Excellent
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tour-reviews-feedback-rating">4.9</div>
                                    </div>
                                    <div className="tour-reviews-feedback-item">
                                        <div className="tour-reviews-feedback-content">
                                            <div className="tour-reviews-feedback-icon">
                                                <span className="material-icons-outlined">
                                                    hotel
                                                </span>
                                            </div>
                                            <div className="tour-reviews-feedback-content-inner">
                                                <div className="tour-reviews-feedback-title">
                                                    Accommodation
                                                </div>
                                                <div className="tour-reviews-feedback-text">
                                                    Excellent
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tour-reviews-feedback-rating">4.5</div>
                                    </div>
                                    <div className="tour-reviews-feedback-item">
                                        <div className="tour-reviews-feedback-content">
                                            <div className="tour-reviews-feedback-icon">
                                                <span className="material-icons-outlined">
                                                    restaurant
                                                </span>
                                            </div>
                                            <div className="tour-reviews-feedback-content-inner">
                                                <div className="tour-reviews-feedback-title">
                                                    Food
                                                </div>
                                                <div className="tour-reviews-feedback-text">
                                                    Excellent
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tour-reviews-feedback-rating">4.5</div>
                                    </div>
                                    <div className="tour-reviews-feedback-item">
                                        <div className="tour-reviews-feedback-content">
                                            <div className="tour-reviews-feedback-icon">
                                                <span className="material-icons-outlined">
                                                    support
                                                </span>
                                            </div>
                                            <div className="tour-reviews-feedback-content-inner">
                                                <div className="tour-reviews-feedback-title">
                                                    Tour Operator
                                                </div>
                                                <div className="tour-reviews-feedback-text">
                                                    Travel Walk
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tour-reviews-feedback-rating">4.5</div>
                                    </div>
                                </div>
                                <div className="tour-reviews-overall">
                                    <div className="tour-reviews-content">
                                        <div className="tour-reviews-overall-title">
                                            Overall Rating
                                        </div>
                                        <div className="tour-reviews-overall-text">
                                            Excellent
                                        </div>
                                        <div className="tour-reviews-overall-rating">{arenaDetails.rating}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="tour-content-block">
                            <div className="tour-help">
                                <div className="tour-help-inner">
                                    <div className="tour-help-content">
                                        <div className="tour-help-title">Need Help Booking?</div>
                                        <div className="tour-help-text">
                                            Call our customer services team on the number
                                            below to speak to one of our advisors who will
                                            help you with all of your holiday needs.
                                        </div>
                                    </div>
                                    <div className="tour-help-call">
                                        <span className="material-icons-outlined"> call </span>
                                        <div className="tour-help-call-text">
                                            +90 362 555 1919
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <SportSelectionComp arenaId={arenaDetails.id} />
                </div>
            </div> : <LoadingPage />}
            <div className="header-menu-overlay"></div>

            <script src='../../Styles/BookingInterface.js'></script>
        </>
    )
}

export default BookingInterface;
