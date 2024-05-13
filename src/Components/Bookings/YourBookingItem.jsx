import React, { useEffect } from 'react'
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardActions from '@mui/joy/CardActions';
import Chip from '@mui/joy/Chip';
import Typography from '@mui/joy/Typography';

import { styled } from '@mui/material/styles';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { CalendarCheck, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';

import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import ResheduleModal from './ResheduleModal';
import axios from 'axios';
import { apiConfig } from '../../Constants/ApiConfig';
import { Button } from '@mui/material';

const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
    position: 'absolute',
    '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
    '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
        top: theme.spacing(2),
        left: theme.spacing(2),
    },
}));

const actions = [
    { icon: <CalendarCheck />, name: 'Reschedule' },
    { icon: <Trash2 />, name: 'Delete booking' }
];

const YourBookingItem = (props) => {

    const navigate = useNavigate()

    const [hidden, setHidden] = useState(false);

    const handleHiddenChange = (event) => {
        setHidden(event.target.checked);
    };

    const { data, onDelete } = props

    const timeConverter = (time) => {
        if (0 <= time && time <= 12) {
            return time + "AM"
        }
        return time - 12 + "PM"
    }

    const formatDate = (dateString) => {
        const dateParts = dateString.split('-');
        const year = dateParts[0];
        const month = dateParts[1];
        const day = dateParts[2];

        const formattedDate = new Date(`${year}-${month}-${day}`).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });

        return formattedDate;
    }

    //Delete modal
    const [open, setOpen] = useState(false)
    const cancelButtonRef = useRef(null)
    const handleOpenModal = () => {
        // e.preventDefault()
        setOpen(true)
    }
    const handlePostDeleteOps = () => {
        setOpen(false)
        onDelete(data.slotId)
    }

    //Reschedule slot
    const [editSlotOpen, seteditSlotOpen] = useState(false)
    const handleEditModal = () => {
        seteditSlotOpen(true)
    }

    const handleCloseEditModal=()=>{
        seteditSlotOpen(false)
    }

    const [sportDetails, setsportDetails] = useState(null)
    const [centreDetails, setcentreDetails] = useState(null)

    useEffect(() => {

        const fetchSportNameAndCentreName = async () => {

            const responseForCentreName = await axios.get(`${apiConfig.auth}/getdetailsbyspid`, {
                headers: {
                    spId: data.spId
                }
            })

            const dataForCentreName = await responseForCentreName.data
            setcentreDetails(dataForCentreName)


            const responseForSportName = await axios.get(`${apiConfig.sp}/getsportbyspidandsportid`, {
                headers: {
                    spId: data.spId,
                    sportId: data.sportId
                }
            })

            const dataForSportName = await responseForSportName.data
            setsportDetails(dataForSportName)

        }

        fetchSportNameAndCentreName()
    }, [])

    return (
        <>
            <Card
                variant="solid"
                color="#c6ff00"
                sx={{
                    boxShadow: '20px 20px 40px rgba(0, 0, 0, 0.25)',
                    width: "50",
                    overflow: 'auto',
                    marginTop: "5px",
                    marginLeft: "5px",
                    marginRight: "5px"
                }}
            >
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <Chip size="sm" variant="soft">
                        {sportDetails && sportDetails.sportName}
                    </Chip>
                    <Chip size="sm" variant="soft">
                        {centreDetails && centreDetails.centreName}
                    </Chip>
                    <Chip size="sm" variant="soft">
                        Date: {formatDate(data.dateOfBooking)}
                    </Chip>
                    <Chip size="sm" variant="soft">
                        From: {timeConverter(data.startTime)}
                    </Chip>
                    <Chip size="sm" variant="soft">
                        To: {timeConverter(data.stopTime)}
                    </Chip>

                </Box>
                <div>
                    <Typography level="h2" color='white'>
                        ₹ {data.priceToBePaid}
                    </Typography>
                </div>
                <CardContent>
                    <Typography level="title-lg" color='white'>Courts booked</Typography>
                    <Typography level="body-md" color='white' sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 3, marginTop: 2 }}>
                        {data.courtNumber && data.courtNumber.split(',').sort((a, b) => a - b).map((item) => (
                            <Button
                                key={item}
                                variant="contained"
                            >
                                Court {item}
                            </Button>
                        ))}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Box sx={{ transform: 'translateZ(0px)', flexGrow: 1 }}>
                        <Box sx={{ position: 'relative', mt: 3, height: 100 }}>
                            <StyledSpeedDial
                                ariaLabel="SpeedDial playground example"
                                hidden={hidden}
                                icon={<SpeedDialIcon />}
                                direction="left"
                            >
                                {actions.map((action) => (
                                    <SpeedDialAction
                                        key={action.name}
                                        icon={action.icon}
                                        tooltipTitle={action.name}
                                        onClick={() => {
                                            if (action.name === 'Delete booking') {
                                                handleOpenModal()
                                            }
                                            else {
                                                handleEditModal()
                                            }
                                        }}
                                    />
                                ))}
                            </StyledSpeedDial>
                        </Box>
                    </Box>
                </CardActions>
            </Card>

            <Transition.Root show={open} as={Fragment}>
                <Dialog className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
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
                                as={Fragment}
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
                                                    Slot deletion
                                                </Dialog.Title>
                                                <div className="mt-2">
                                                    <p className="text-sm text-gray-500">
                                                        Are you sure you want to deactivate your booking?
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        <button
                                            type="button"
                                            className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                            onClick={handlePostDeleteOps}
                                        >
                                            Delete booking
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

            <Transition.Root show={editSlotOpen} as={Fragment}>
                <Dialog className="relative z-10" initialFocus={cancelButtonRef} onClose={seteditSlotOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto mt-12">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                    <div className='mt-10'>
                                        <ResheduleModal arenaId={data.spId} sportIdToSearch={data.sportId} slotId={data.slotId} closeModal={handleCloseEditModal}/>
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

export default YourBookingItem