import React, { useEffect, useState } from 'react'
import PlayerSlotBookItem from './PlayerSlotBookItem'
import axios from 'axios'

const PlayerSlotBooking = () => {

  const [arenas, setarenas] = useState([])

  useEffect(() => {

    const fetchAllarenas = async () => {

      const response = await axios.get('api/getallarenas')

      const data = await response.data
      setarenas(data)
    }

    fetchAllarenas()
  }, [])

  return (
    <>
      <div className='grid grid-cols-4 gap-4 content-center'>
        {arenas.map((arena) => {
          return <PlayerSlotBookItem key={arena.id} arena={arena} />
        })}
      </div>
    </>
  )
}

export default PlayerSlotBooking