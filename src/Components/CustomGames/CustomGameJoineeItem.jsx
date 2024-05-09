import React, { useEffect, useRef, useState } from 'react'
import { ChevronRight, ChevronLeft } from 'lucide-react';
import axios from 'axios';
import { apiConfig } from '../../Constants/ApiConfig'
import { toast, Toaster } from 'react-hot-toast'
import Rating from '@mui/material/Rating';
import dayjs from 'dayjs';
import Cookies from 'js-cookie';
import { Dialog, Transition } from '@headlessui/react'
import { CheckBadgeIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom';

const CustomGameJoineeItem = (props) => {

  const navigate=useNavigate()

  const { game } = props
  const [images, setimages] = useState([])
  const [players, setplayers] = useState([])
  const [playersImages, setplayersImages] = useState([])

  const [currentIndex, setCurrentIndex] = useState(0);

  const [hostDetails, sethostDetails] = useState(null)

  const [arenaDetails, setarenaDetails] = useState(null)
  const [sportDetails, setsportDetails] = useState(null)

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

        const fetchHostDetails = await axios.get(`${apiConfig.auth}/getuserdetailsbyuserid`, {
          headers: {
            "Content-Type": "application/json",
            "userId": game.userId
          }
        })

        const dataOfHost = await fetchHostDetails.data
        sethostDetails(dataOfHost)

        const fetchArenaDetails = await axios.get(`${apiConfig.auth}/getdetailsbyspid`, {
          headers: {
            "Content-Type": "application/json",
            "spId": game.arenaId
          }
        })

        const dataOfArena = await fetchArenaDetails.data
        setarenaDetails(dataOfArena)

        const fetchSportDetails = await axios.get(`${apiConfig.sp}/getsportbyspidandsportid`, {
          headers: {
            "spId": game.arenaId,
            "sportId": game.sportId
          }
        })

        const dataOfSport = await fetchSportDetails.data
        setsportDetails(dataOfSport)

      } catch (error) {
        toast.error('Something went wrong. Please try again!', {
          duration: 3000,
          position: "top-right"
        })
      }

    };

    fetchData();
  }, []);

  const timeConverter = (time) => {
    if (0 <= time && time <= 12) {
      return time + "AM"
    }
    return time - 12 + "PM"
  }

  const handleJoinCustomGame = async (e) => {
    setOpen(false)
    const loadingToastId = toast.loading('Joining game', {
      duration: Infinity,
      position: 'top-right'
    });
    try {
      e.preventDefault()
      const headers = {
        "Content-Type": "application/json",
        "token": Cookies.get("token"),
        "role": Cookies.get("role"),
        "gameId": game.gameId
      }

      const responseForJoiningCustomGame = await axios.post(`${apiConfig.customGames}/joingame`, {}, { headers })
      const dataForJoiningGame = await responseForJoiningCustomGame.data

      if (dataForJoiningGame.success) {
        toast.success("You have joined the game", {
          duration: 3000,
          position: "top-right"
        })
        setTimeout(()=>{
          navigate('/')
        },2000)
      }
      else {
        toast.error(dataForJoiningGame.message, {
          duration: 3000,
          position: "top-right"
        })
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again!", {
        duration: 3000,
        position: "top-right"
      })
    }
    finally {
      toast.dismiss(loadingToastId);
    }

  }

  const [open, setOpen] = useState(false)
  const cancelButtonRef = useRef(null)

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
          <p className="text-sm text-sky-500 font-bold mb-4 ml-3">Created by : {hostDetails && hostDetails.userName} </p>
          <div className="flex -space-x-1 ml-3">
            {playersImages.map((image, index) => (
              <img
                key={`${image.avatarId}-${index}`}
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

              <p className="text-sm text-sky-500 font-bold">Date: {dayjs(game.dateOfBooking).format("DD-MMMM-YYYY")}</p>
              <p className="text-sm text-sky-500 font-bold">Price for {game.numberOfPlayers} players: ₹{game.pricePaid}</p>
              <p className="text-sm text-sky-500 font-bold">From: {timeConverter(game.startTime)}</p>
              <p className="text-sm text-sky-500 font-bold">To: {timeConverter(game.stopTime)}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col p-4" style={{ marginTop: "-125px" }}>
          <p className="text-sm text-sky-500 font-bold">Sport: {sportDetails && sportDetails.sportName}</p>
          <p className="text-sm text-sky-500 font-bold">Price Per Hour: ₹{sportDetails && sportDetails.pricePerHour}</p>
          <Rating name="read-only" value={sportDetails && sportDetails.rating} precision={0.1} readOnly />
        </div>

        <div className="flex flex-col p-3" style={{ marginBottom: "-80px" }}>
          <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white"></h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"></p>
          <div className="mt-auto">
            <p className="text-sm text-sky-500 font-bold">Arena address: {arenaDetails && arenaDetails.address}</p>
            <p className="text-sm text-sky-500 font-bold">Arena Name: {arenaDetails && arenaDetails.centreName}</p>
            <p className="text-sm text-sky-500 font-bold">Arena Open time: {arenaDetails && timeConverter(arenaDetails.startTime)}</p>
            <p className="text-sm text-sky-500 font-bold">Arena Close time: {arenaDetails && timeConverter(arenaDetails.stopTime)}</p>

          </div>
        </div>

        <div className="flex flex-col p-4" style={{ marginTop: "-140px" }}>
          <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white"></h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"></p>
          <div className="mt-auto">
            <p className="text-sm text-sky-500 font-bold">Courts booked: {game.courtNumber}</p>
            <p className="text-sm text-sky-500 font-bold">Total Number of Players entered by host: {game.numberOfPlayers}</p>
            <p className="text-sm text-sky-500 font-bold">Number of players joined: {players.length}</p>
            <p className="text-sm text-sky-500 font-bold">Slots empty: {game.numberOfPlayers - players.length} </p>

          </div>
        </div>

        <div className='flex flex-col' style={{ marginTop: "145px" }}>
          <button type="button" className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            onClick={() => setOpen(true)}
          >Join Game</button>
        </div>

      </div>

      <Transition.Root show={open} >
        <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
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

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
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
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-white-100 sm:mx-0 sm:h-10 sm:w-10">
                        <CheckBadgeIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                      </div>
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                          Join the Game
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Are you sure you want to join the game?
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                      onClick={handleJoinCustomGame}
                    >
                      Join
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setOpen(false)}
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
      <Toaster />
    </>
  )
}

export default CustomGameJoineeItem