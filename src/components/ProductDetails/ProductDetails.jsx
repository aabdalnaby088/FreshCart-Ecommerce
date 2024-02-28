import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { useQuery } from 'react-query';
import DetailsSlider from '../DetailsSlider/DetailsSlider';
import toast, { Toaster } from 'react-hot-toast';
import { CartContext } from '../../SharedData/CartContext';
import { Helmet } from 'react-helmet';

export default function ProductDetails() {

//getting user context to use cart context

    let { addCart, setItemsInCart } = useContext(CartContext) ; 

    // get the product id passed in the url as parameter
    let { ProductId } = useParams();
console.log(ProductId) ;
    // function to get the product details from the Api
    function getProductDetails(queryData) {
            return  axios.get(`https://ecommerce.routemisr.com/api/v1/products/${queryData.queryKey[1]}`);
            
        } 

    // state for id for react query
    let [Id, setId] = useState('');

    useEffect(() => {
        setId(ProductId);
    }, [ProductId]); 

    let { data, isLoading } = useQuery(['ProductDetails', Id], getProductDetails);

    let Product = data?.data.data;
    console.log(Product); 

//function add to cart 

async function addToCart(id)
{
let req = await addCart(id); 

if (req?.data.status == 'success')
{
setItemsInCart( req.data.numOfCartItems ); 

toast.success(req.data.message , {
    position: 'top-center',
    duration: 1000 , 
})
}
}


    return (
        <>
<Helmet>
    <title>{Product?.title}</title>
</Helmet>

        <Toaster/>
            {isLoading ? (
                <LoadingScreen />
            ) : (
                <section className="details my-5">
                    <div className="row w-100 align-items-center gx-5">
                        <div className="col-lg-4 col-md-12 mx-4 my-4">
                            <DetailsSlider images = {Product.images}/>
                        </div>
                        <div className="col-lg-7 col-md-12 mx-4">
                            <h1 className="text-main">{Product?.title}</h1>
                            <p className="text-muted">{Product?.description}</p>
                            <h4 className="text-main">{Product?.category?.name}</h4>
                            <div className="d-flex justify-content-between my-5">
                                <span>{Product?.price} EGP</span>
                                <span>
                                    <i className="fa-solid fa-star rating-color"> </i>
                                    {Product?.ratingsAverage}
                                </span>
                            </div>
                                <button onClick={() => { addToCart(Product._id)}} className="btn bg-main text-white d-block w-100 my-3">Add to chart</button>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}
