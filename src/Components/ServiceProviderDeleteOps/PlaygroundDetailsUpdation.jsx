import React from 'react'
import ServiceProviderImageDelete from './ServiceProviderImageDelete'
import ServiceProviderSportUpdate from './ServiceProviderSportUpdate'

const PlaygroundDetailsUpdation = () => {
  return (
    <>
      <ServiceProviderImageDelete />
      <hr className="h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700" style={{width:"80%"}}></hr>
      <ServiceProviderSportUpdate/>
      
    </>
  )
}

export default PlaygroundDetailsUpdation