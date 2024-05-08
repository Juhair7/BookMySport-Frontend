import React from 'react'
import Carousel from 'react-material-ui-carousel'
import CarousalItem from './CarousalItem'

const CustomGameCarousel = () => {

    var items = [
        {
            url: "c1.jpg"
        },
        {
            url: "c2.jpg"
        },
        {
            url: "c3.jpg"
        }
    ]

    return (
        <>
            <Carousel className='my-2'>
                {items.map((item, i) => <CarousalItem key={i} item={item} />)}
            </Carousel>
        </>
    )
}

export default CustomGameCarousel