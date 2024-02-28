import React from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'
import { useContext, useEffect } from 'react';
import { TokenContext } from '../../SharedData/TokenContext.js'
import { CartContext } from '../../SharedData/CartContext.js';
import { WishListContext } from '../../SharedData/WishListContext.js';

export default function Layout() {
//using the set token context to set user token after logged in successfully 

  let { setuserToken } = useContext(TokenContext);

// using the cart context to get the user cart after user logged in successfully 

  let { getUserCart, setItemsInCart } = useContext(CartContext);

// using the context of wishList to get the wish list items after user logged in successfully
  let { setWishListItems, getWishList } = useContext(WishListContext) ; 
  useEffect( () => {

    if (localStorage.getItem('userToken') != null) {
      setuserToken(localStorage.getItem('userToken'));
      getCart(); 
      getWishListItemNumber(); 
    }
  }

  )
  //function to get the user cart after user logged in successfully


  async function getCart ()
    {
    let req = await getUserCart().catch( err => {});
    if (req?.data.numOfCartItems)
    {
      setItemsInCart(req.data.numOfCartItems);
    }
    }

  //function to get wish list items after user logged in successfully to view it in the nav bar 

async function getWishListItemNumber()
{
  let req = await getWishList().catch(err => {});
  if (req?.data.status == 'success') {
    setWishListItems(req.data.count);
  }
}


  return (
    <>
    <Navbar/>
    <Outlet/>
    <Footer/>
    </>
  )
}
