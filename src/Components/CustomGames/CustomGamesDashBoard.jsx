import React, { useEffect, useState } from 'react'
import '../../Styles/BookingInterface.css'
import axios from 'axios'
import { apiConfig } from '../../Constants/ApiConfig'
import CustomGameItem from './CustomGameItem'

const CustomGamesDashBoard = () => {

    const [customGames, setcustomGames] = useState([])


    useEffect(() => {
        const fetchCustomGames = async () => {
            const responseFromCustomGames = await axios.get(`${apiConfig.customGames}/getcustomgames`)
            const data = await responseFromCustomGames.data
            setcustomGames(data)
        }

        fetchCustomGames()
    }, [])

    return (
        <>
            <div className='grid gap-3 my-2' >
                {customGames.map((game) => (
                    <CustomGameItem key={game.gameId} game={game} />
                ))}
            </div>

        </>
    )
}

export default CustomGamesDashBoard