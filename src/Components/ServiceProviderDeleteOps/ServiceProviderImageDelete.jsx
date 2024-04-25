import React, { useRef, useState } from 'react'
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Cookies from 'js-cookie';
import { apiConfig } from '../../Constants/ApiConfig'
import { useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LoadingPage from '../Errorpages/LoadingPage'

const ServiceProviderImageDelete = () => {

  const navigate = useNavigate()

  const [images, setimages] = useState([])
  const [selectedImage, setselectedImage] = useState([])

  useEffect(() => {
    const fetchImages = async () => {
      const headers = {
        "Content-Type": "application/json",
        "token": Cookies.get("token"),
        "role": Cookies.get("role")
      }

      const response = await axios.get(`${apiConfig.sp}/getimagesforsp`, { headers })

      const imageData = response.data
      setimages(imageData)
    }

    fetchImages()
  }, [])

  const handleDeleteImage = async (image) => {
    setselectedImage(image)
    setOpen(true)
  }

  const handleConfirmDelete = async () => {
    setOpen(false)
    try {
      const headers = {
        "Content-Type": "application/json"
      }
      const response = await axios.delete(`${apiConfig.sp}/deleteimage`, {
        headers,
        data: {
          imageId: selectedImage.imageId,
          spId: selectedImage.spId
        }
      });

      setimages(prevImages => prevImages.filter(img => img.imageId !== selectedImage.imageId));
      if (response.success) {
        toast.success('Image deletion successfull', {
          duration: 3000,
          position: "top-right"
        })
      }
      else {
        toast.error('Image not found. Refresh the page and try again.', {
          duration: 3000,
          position: "top-right"
        })
      }

    } catch (error) {
      toast.error('Something went wrong. Please try again!', {
        duration: 3000,
        position: "top-right"
      })
    }
  }

  const [open, setOpen] = useState(false)
  const cancelButtonRef = useRef(null)

  return (
    <>
      {images.length !== 0 ? <div className="tour container" style={{ marginTop: "-55px",marginLeft:"20px" }}>
        <div className="tour-head">
        </div>
        <div className="tour-wrapper" style={{ marginTop: "-22px" }}>
          <div className="tour-content">

            <div className="tour-content-block">
              <div className="tour-content-title mx-3">Images of the Arena</div>
              <div className="tour-places">
                <div className="swiper">

                  <div className="grid grid-cols-3" style={{ zIndex: 30 }}>
                    {images.map((image) => {
                      return (
                        <div className="my-3" key={image.imageId} style={{ position: "relative" }}>
                          <div className="mx-3" style={{ position: "relative" }}>
                            <img src={image.imageURL} style={{ width: "520px" }} />
                            <Trash2
                              color='white'
                              style={{ position: "absolute", top: 8, right: 8, cursor: "pointer" }}
                              onClick={() => handleDeleteImage(image)}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <Transition.Root show={open}>
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
                                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                    <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                                  </div>
                                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                      Image deletion!
                                    </Dialog.Title>
                                    <div className="mt-2">
                                      <p className="text-sm text-gray-500">
                                        Are you sure you want to delete the image?
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button
                                  type="button"
                                  className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                  onClick={handleConfirmDelete}
                                >
                                  Delete
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


                </div>
              </div>
            </div>

          </div>
        </div>
        <div>
          <span className='mx-3 font-bold'>To add images</span>
          <Button variant='contained' className='mx-3' onClick={() => navigate('/imagesupload')}>Upload Images</Button>
        </div>
      </div> : <LoadingPage />}

      <script src='../../Styles/BookingInterface.js'></script>
    </>
  )
}

export default ServiceProviderImageDelete