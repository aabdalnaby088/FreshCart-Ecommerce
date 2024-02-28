import React, { useContext, useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { WishListContext } from './../../SharedData/WishListContext';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import ProductItem from '../ProductItem/ProductItem';
import { CartContext } from '../../SharedData/CartContext';
import cartEmptyImg from '../../images/empty-cart.svg'
import { Helmet } from 'react-helmet';
export default function WishList() {
//Getting the context
    let { getWishList, removeWishListItem, setWishListItems } = useContext(WishListContext) ; 
    //calling cart context to make the items get into cart 
    let { addCart, setItemsInCart } =  useContext(CartContext) ; 

//setting state for the loading screen
let [isLoading , setIsLoading] = useState(false);

//setting state for the user wish list

let [wishList , setWishList] = useState([]); 


//get user wish list 

async function getUserWishList()
{
    setIsLoading(true);
    let req = await getWishList().catch(err => { }); 
    if (req?.data.status == 'success')
    {
    setIsLoading(false);
    setWishList(req.data.data) ;
    setWishListItems(req.data.count); 
    // console.log(req.data.data); 
    }
}
useEffect(  ()=>{
getUserWishList(); 
},[] )

//function to remove item from wish list

    async function RemoveItemFromWishList(id) {
        setIsLoading(true);
        let res = await removeWishListItem(id).catch(err => {});
        if (res?.data.status === 'success') {
            getUserWishList(); 
            setIsLoading(false); 
            toast.success('Item Removed Successfully', {
                position: 'top-center',
                duration: 2000,
                icon: '🚮',
            });
        }
    }

    //Function to add to cart 

    async function addToCart(id) {
        let req = await addCart(id).catch(err => { });
        if (req.data.status == 'success') {
            setItemsInCart(req.data.numOfCartItems);
            toast.success(req.data.message, {
                position: 'top-center',
                duration: 1000,
                icon: '🛒',
            })
        }
    }


    return (
    <>

<Helmet>

<meta name='WishList page'  content="This is Wishlist Page of the user" />
<title>WishList</title>

</Helmet>



    <div className="container">
        <Toaster/>
{isLoading? <LoadingScreen/> : 
<section className="wishList">
    <div className='row g-4 my-5'>
            {wishList.length === 0 ? (
            <div className='d-flex justify-content-center align-items-center vh-100'>

                <div>
                    <img className='w-100' src={cartEmptyImg} alt="" />
                </div>

            </div>
            ) : (
            wishList.map((product, i) => (
                <ProductItem product={product} key={i} addToCart={addToCart} RemoveItemFromWishList={RemoveItemFromWishList} />
            ))
            )}
    </div>
</section>
}
    </div>
    </>
    )
}
