import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../SharedData/CartContext';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import CartItem from '../CartItem/CartItem';
import toast, { Toaster } from 'react-hot-toast';
import cartEmptyImg from '../../images/empty-cart.svg'
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
export default function Cart() {
    // Create state to hold the cart details
    let [cart, setCart] = useState(null);
    let [totalPrice, setTotalPrice] = useState(0);
    let[cartId , setCartId] = useState(''); 
    // Set loading state
    let [isLoading, setisLoading] = useState(false);
    // Get the context to get the user cart data
    let { getUserCart, deleteItem, deleteAllCartItems, setItemsInCart, UpdateCart } = useContext(CartContext);

    // Function to get the user cart data
    async function GetUserData() {
        setisLoading(true);
        let req = await getUserCart().catch((err) => {
            if (err?.response.data.statusMsg == 'fail') {
                setCart(null);
                setisLoading(false);
            }
        });
        if (req?.data.status == 'success') {
            setisLoading(false);
            setTotalPrice(req?.data.data.totalCartPrice);
            if (req?.data.numOfCartItems == 0)
            {
                setCart(null); 
            }
            else {
                setCart(req?.data.data.products);
                setCartId(req?.data.data._id);
            }
        }
    }

    //function to remove item from cart 

    async function removeCartItem(id) {
        setisLoading(true);
        let req = await deleteItem(id);
        if (req?.data.status === 'success') {
            console.log(req?.data.numOfCartItems) ; 
            (req?.data.numOfCartItems == 0)
                ? setCart(null)
                : setCart(req?.data.data.products);
            setTotalPrice(req?.data.data.totalCartPrice);
            setItemsInCart(req?.data.numOfCartItems);
            setisLoading(false);
            toast.success('Item Removed Successfully', {
                position: 'top-center',
                duration: 2000,
                icon: '🚮',
            });
        }
    }

    // function to clear all cart items

    async function ClearCart() {
        let req = await deleteAllCartItems();
        if (req?.data.message == 'success') {
            setItemsInCart(0);
            setCart(null);
            toast.success('Your Cart is empty', {
                position: 'top-center',
                duration: 2000,
            })
        }
    }

    //function to update cart item 

    async function updateCartItem(id, count) {
        if (count == 0) {
            removeCartItem(id); 
        }
        else {
            let req = await UpdateCart(id, count);
            if (req.data.status == 'success')
            {
                setCart(req?.data.data.products);
            }
        }
    }

    useEffect(() => {
        GetUserData();
    }, []);

    return (
        <>

<Helmet>
    <meta name='Cart page' content='This is the user cart page' />
    <title>FreshCart | UserCart</title>
</Helmet>



            <Toaster />
            <section className="cart">
                <div className="container">
                    {isLoading ? (
                        <LoadingScreen />
                    ) : cart != null ? (
                        <>
                            <button
                                className="btn btn-danger my-4 float-end"
                                onClick={ClearCart}
                            >
                                <i className='fa-solid fa-trash'></i> Clear my Cart
                            </button>
                            <div className='clearfix'></div>
                            {cart.map((item) => (
                                <CartItem key={item._id} item={item} deleteItem={removeCartItem} updateCount={updateCartItem} />
                            ))}
                    <div className="container d-flex justify-content-center align-items-center flex-column mb-5">
                                    <h3 className="text-center">
                                        Total Price: <span className="text-main">{totalPrice}</span> EGP
                                    </h3>
                                    <Link to={`/checkout/${cartId}`} className='bg-main btn btn-sm text-white mt-3'>Proceed To Checkout</Link>
                        </div>
                        </>
                    ) : (
                        <div className='d-flex justify-content-center align-items-center vh-100'>

                            <div>
                                <img className='w-100' src={cartEmptyImg} alt="" />
                            </div>

                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
