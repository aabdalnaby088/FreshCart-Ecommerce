import React from 'react'
import { Link } from 'react-router-dom'
import styles from './ProductItem.module.css'
export default function ProductItem({ product, addToCart, addToWishList, isInWishList, RemoveItemFromWishList }) {
    function handleWishListClick (e) {
        if (!addToWishList) {
            RemoveItemFromWishList(product.id);
        } else {
            addToWishList(e, product.id);
        }
    };

    return (
    <>
    
        <div className='col-lg-2 col-md-6' >
                <div className=" position-relative product p-3 h-100 d-flex flex-column justify-content-between" key={product.id}>
<Link to={"/ProductDetails/" + product.id}>
        <div>
            <img src={product.imageCover} alt="img product" className='w-100' />
            <h6 className='text-main'> {product.category.name}</h6>
            <h5> {product.title.split(" ").splice(0, 2).join(' ')}</h5>
            <div className="d-flex justify-content-between">
                <span> {`${product.price} EGP`} </span>
                <span>
                <i className='fa-solid fa-star rating-color'> </i>
                    {product.ratingsAverage}
                </span>
            </div>
        </div>
</Link>
                    <i onClick={handleWishListClick} className={`${(isInWishList) ? 'fa-solid' :  'fa-regular'} fa-heart ${styles.iconFav}`} ></i>
                    <button onClick={() => { addToCart(product.id)}}  className='btn bg-main text-white d-block w-100 my-3'>Add to chart</button>
            </div>
        </div>
    </>
    )
}
