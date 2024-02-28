import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './CartItem.module.css'
export default function CartItem({ item, deleteItem, updateCount }) {

const navg = useNavigate(); 

// calling her bitch to work propably  
    function navMeBitch()
    {
        navg(`/ProductDetails/${item.product._id}`);
    }


    return (
    <>            
            <div key={item._id} className="row my-5 align-items-center border rounded-2 ">
                <div className="item col-lg-10">
                    <div className="row itemDetails justify-content-center ">
                        <div onClick={navMeBitch} className={`itemImg col-lg-2 ${styles.cursor}`}>
                            <img src={item.product.imageCover} className='w-100' alt="" />
                        </div>
                        <div className='item-desc col-10 d-flex flex-column align-items-center '>
                            <h3 className='text-main my-3 text-center'>{item.product.title}</h3>
                            <h5 className='my-3'> <span className='text-main'>{item.price}</span> EGP</h5>
                                <button onClick={() => { deleteItem(item.product._id)}} className='btn btn-danger my-3'> <i className='fa-solid fa-trash'></i> Remove</button>
                        </div>
                    </div>
                </div>
                <div className="Quantity col-lg-2 my-3 text-center">
                    <span onClick={() => { updateCount(item.product._id , item.count+=1) }}>
                        <i className='fa-solid fa-plus btn btn-success btn-sm mx-2'></i>
                    </span>
                    <span>
                        {item.count}
                    </span>
                    <span onClick={() => { updateCount(item.product._id, item.count -= 1) }}>
                        <i className='fa-solid fa-minus btn btn-danger btn-sm mx-2'></i>
                    </span>
                </div>
            </div>
{/* <Link to={"/ProductDetails/" + item.product._id}>
            <button className='btn btn-success'>Visit Item</button>
</Link> */}
    </>
    )
}
