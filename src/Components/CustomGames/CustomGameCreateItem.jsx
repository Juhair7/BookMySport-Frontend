import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { apiConfig } from '../../Constants/ApiConfig'
import { Sunrise, Sunset, Star, ChevronRight, ChevronLeft, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CustomGameCreateItem = (props) => {

    const navigate=useNavigate()

    const { arena } = props
    const [images, setimages] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrevClick = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    }

    const handleNextClick = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }

    const timeConverter = (time) => {
        if (0 <= time && time <= 12) {
            return time + "AM"
        }
        return time - 12 + "PM"
    }

    useEffect(() => {
        const fetchImages = async () => {

            const headers = {
                "Content-Type": "application/json",
                "spId": arena.id
            }

            const response = await axios.get(`${apiConfig.sp}/getimages`, { headers })
            const data = await response.data
            setimages(data)
        }

        fetchImages()
    }, [])

    const handleCustomBooking=(arenaId)=>{
        navigate(`/customgamecreate/${arenaId}`)
    }

    return (
        <>
            <div className="relative flex w-full max-w-[26rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
                <div className="relative mx-4 mt-4 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40">
                    <div id="default-carousel" className="relative w-full" data-carousel="slide">
                        <div className="relative h-56 overflow-hidden rounded-lg md:h-90">
                            {images.map((image, index) => {
                                return <div className="duration-700 ease-in-out" data-carousel-item key={image.imageId} style={{ display: currentIndex === index ? 'block' : 'none' }}>
                                    <img src={image.imageURL} alt={arena.centreName} />
                                </div>
                            })}
                        </div>
                        <button type="button" className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev onClick={handlePrevClick}>
                            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                                <ChevronLeft />
                                <span className="sr-only">Previous</span>
                            </span>
                        </button>
                        <button type="button" className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next onClick={handleNextClick}>
                            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                                <ChevronRight />
                                <span className="sr-only">Next</span>
                            </span>
                        </button>
                    </div>

                    <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60"></div>
                </div>
                <div className="p-6">
                    <div className="mb-3 flex items-center justify-between">
                        <h5 className="block font-sans text-xl font-medium leading-snug tracking-normal text-blue-gray-900 antialiased">
                            {arena.centreName}
                        </h5>
                        <p className="flex items-center gap-1.5 font-sans text-base font-normal leading-relaxed text-blue-gray-900 antialiased">
                            <Star color='red' fill='red' />
                            {arena.rating}
                        </p>
                    </div>
                    <div className="flex items-center">
                        <Home className="mr-2 h-5 w-5 text-gray-500" />
                        <p className="block font-sans text-base font-medium leading-relaxed text-gray-700 antialiased">{arena.address}</p>
                    </div>
                    <div className="group mt-8 flex flex-wrap justify-evenly items-center gap-3">
                        <Sunrise />  {timeConverter(arena.startTime)}  <Sunset />  {timeConverter(arena.stopTime)}
                    </div>
                </div>
                <div className="p-6 pt-3">
                    <button
                        className="block w-full select-none rounded-lg bg-green-500 py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button"
                        data-ripple-light="true"
                        onClick={() => handleCustomBooking(arena.id)}
                    >
                       Create Custom game here
                    </button>
                </div>
            </div>

            <script src="https://unpkg.com/@material-tailwind/html@latest/scripts/ripple.js"></script>
        </>
    )
}

export default CustomGameCreateItem