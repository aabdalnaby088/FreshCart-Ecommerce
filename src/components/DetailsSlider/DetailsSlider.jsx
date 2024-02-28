import React from 'react'
import Slider from "react-slick";

export default function DetailsSlider({images}) {

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };


    return (
    <>
            <Slider {...settings}>
                {images.map(image => {
                    return (<div key={image}>
                        <img src={image} className='w-100' alt="Details image" />
                    </div>)

                })}
            </Slider>
    </>
    )
}
