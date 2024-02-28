import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import axios from 'axios';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import ItemHolder from '../ItemHolder/ItemHolder';
import { Helmet } from 'react-helmet';
export default function Brands() {

// function to get brands 

function getBrands()
{
    return axios.get('https://ecommerce.routemisr.com/api/v1/brands') ; 
}



let {data , isLoading} = useQuery('Brands' , getBrands); 
// useEffect(()=>{
    // },[])
    
// setCategories(data?.data.data);

let brands = data?.data.data; 



    return (
    <>

<Helmet>

                <meta name='Products page' content="This is the products page in our FreshCart app" />


                <title>FreshCart | Brands</title>
</Helmet>


    {isLoading ? <LoadingScreen/> : 
    <section className="Brands my-5">
        <div className="container">
            <h2 className='text-main text-center'>Our Partners</h2>
            <div className="Partners">
            <ItemHolder items = {brands} layer = {'d-none'}/>
            </div>
        </div>
    </section>
    }
    </>
    )
}
