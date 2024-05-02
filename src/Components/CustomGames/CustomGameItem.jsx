import React, { useEffect, useState } from 'react'
import { ChevronRight, ChevronLeft } from 'lucide-react';
import axios from 'axios';
import { apiConfig } from '../../Constants/ApiConfig'
import { toast, Toaster } from 'react-hot-toast'

const CustomGameItem = (props) => {

  const { game } = props
  const [images, setimages] = useState([])
  const [players, setplayers] = useState([])
  const [playersImages, setplayersImages] = useState([])

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  }

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {

        const imagesResponse = await axios.get(`${apiConfig.sp}/getimages`, {
          headers: {
            "Content-Type": "application/json",
            "spId": game.arenaId
          }
        });
        const imagesData = imagesResponse.data;
        setimages(imagesData);

        const joinersResponse = await axios.get(`${apiConfig.customGames}/getplayersofcustomgame`, {
          headers: {
            "Content-Type": "application/json",
            "gameId": game.gameId
          }
        });
        const joinersData = joinersResponse.data;
        setplayers(joinersData);

        const fetchPlayerImagesPromises = joinersData.map(async (player) => {
          const response = await axios.get(`${apiConfig.auth}/getavatarbyid`, {
            headers: {
              "userId": player.userId
            }
          });
          const dataFetched = await response.data
          return dataFetched
        });

        const playerImagesData = await Promise.all(fetchPlayerImagesPromises);
        setplayersImages(playerImagesData);
      } catch (error) {
        toast.error('Something went wrong. Please try again!', {
          duration: 3000,
          position: "top-right"
        })
      }
    };

    fetchData();
  }, []);


  return (
    <>
      <div className="flex items-center bg-white border border-gray-200 rounded-lg shadow dark:border-gray-700 dark:bg-gray-800  mx-2" style={{ width: "99%" }}>
        <div className="relative mx-4 mt-2 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 w-80" >
          <div id="default-carousel" className="relative" data-carousel="slide">
            <div className="relative h-56 overflow-hidden rounded-lg md:h-90">
              {images.map((image, index) => {
                return <div className="duration-700 ease-in-out" data-carousel-item key={image.imageId} style={{ display: currentIndex === index ? 'block' : 'none' }}>
                  <img src={image.imageURL} alt="" />
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
        <div>
          <div className="flex -space-x-1">
            {playersImages.map((image) => (
              <img
                key={image.avatarId}
                className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
                src={image.avatarUrl}
                alt=""
              />
            ))}
          </div>
          <div className="flex flex-col p-4">
            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white"></h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"></p>
            <div className="mt-auto">
              <p className="text-sm text-sky-500 font-bold">Location:</p>
              <p className="text-sm text-gray-500">Start Time: </p>
              <p className="text-sm text-gray-500">End Time: </p>
            </div>
          </div>
        </div>

      </div>
      <Toaster />
    </>
  )
}

export default CustomGameItem