import React from 'react';
import { Paper, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CarousalItem = (props) => {

    const navigate=useNavigate()
    return (
        <Paper style={{ position: "relative" }}>
            <div
                id="carouselExampleCaptions"
                className="relative z-2"
                data-twe-carousel-init
                data-twe-ride="carousel"
            >
                <div
                    className="relative w-full overflow-hidden after:clear-both after:block after:content-['']"
                    data-twe-carousel-active
                    data-twe-carousel-item
                    style={{ backfaceVisibility: "hidden" }}>
                    <img
                        src={props.item.url}
                        className="block w-full h-auto"
                        alt="..."
                        style={{ maxHeight: "520px", objectFit: "cover" }}
                    />
                </div>
                <Button
                    variant='contained'
                    className="CheckButton"
                    style={{
                        position: "absolute",
                        left: "50%",
                        bottom: "10px",
                        transform: "translateX(-50%)",
                        zIndex: "3"
                    }}
                    onClick={()=>navigate('/createcustomgame')}
                >
                    Create Game Now
                </Button>
            </div>
        </Paper>
    );
}

export default CarousalItem;
