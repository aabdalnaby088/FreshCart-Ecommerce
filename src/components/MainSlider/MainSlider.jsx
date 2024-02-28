import React from 'react'
import Slider from "react-slick";
import slide1 from '../../images/slider-image-1.jpeg'
import slide2 from '../../images/slider-image-2.jpeg'
import slide3 from '../../images/slider-image-3.jpeg'
import styles from './MainSlider.module.css'
export default function MainSlider() {

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay : true , 
        autoplayspeed : 1500,

    };

    return (
        <>        
            <Slider {...settings} className='my-4 mx-2'>
                <div className={`${styles.slickSlider} ${styles.slide1}`} >
                    <img src={slide1} alt="Fist slide image" />
                </div>
                <div className={`${styles.slickSlider} ${styles.slide2}`}>
                    <img src={slide2} alt="Fist slide image" />
                </div>
                <div className={`${styles.slickSlider} ${styles.slide3}`}>
                    <img src={slide3} alt="Fist slide image" />
                </div>
            </Slider>
        </>
    )
}
