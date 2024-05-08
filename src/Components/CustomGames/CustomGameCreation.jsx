import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { apiConfig } from '../../Constants/ApiConfig'
import CustomGameCreateItem from './CustomGameCreateItem'

const CustomGameCreation = () => {

    const [arenas, setarenas] = useState([])

    useEffect(() => {

        const fetchAllarenas = async () => {

            const response = await axios.get(`${apiConfig.auth}/getallarenas`)

            const data = await response.data
            setarenas(data)
        }

        fetchAllarenas()
    }, [])

    return (
        <>
            <div className='grid grid-cols-4 gap-4 content-center'>
                {arenas.map((arena) => {
                    return <CustomGameCreateItem key={arena.id} arena={arena} />
                })}
            </div>
        </>
    )
}

export default CustomGameCreation