import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import styles from './CategoriesSlider.module.css'; 
export default function CategoriesSlider() {

    // state to store all categories
    let [categories, setCategories] = useState([]);

    // function to get all categories from the api 
    async function getAllCategories() {
        let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
        setCategories(data?.data);
    }

    useEffect(() => {
        getAllCategories();
    }, [])


    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 10,
        slidesToScroll: 5,
        autoplay: true,
        autoplayspeed: 1000,
        responsive: [
            {
                breakpoint: 850,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 500,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true
                }
            }
            ]
    };


    return (
        <div className={`mx-2`}>
            <h3 className='text-main'>Discover our categories</h3>
            <Slider  {...settings}  >
                {
                    categories?.map(category => {
                        return (
                            <div key={category?._id} >
                                <img src={category?.image} className='w-100' height={250} alt="" />
                            </div>
                        )
                    })
                }
            </Slider>
        </div>
    )
}
