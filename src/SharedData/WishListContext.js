import axios from "axios";
import { createContext, useState } from "react";



export let WishListContext = createContext();


export function WishListContextProvider({ children }) {

    //setting sate to get all wish list items 

    let [WishListItems, setWishListItems] = useState(0);


    //function to add product to wish List

    function addProductsToWishList(id) {


        let options =
        {
            headers: {
                token: localStorage.getItem('userToken')
            }
        }
        const body = {
            productId: id
        }
        return axios.post('https://ecommerce.routemisr.com/api/v1/wishlist', body, options);
    }

    //function to get the wish list of user after he succesfully logged in 
    function getWishList() {
        let options =
        {
            headers: {
                token: localStorage.getItem('userToken')
            }
        }
        return axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', options);
    }

    //function to remove item from wish list
    function removeWishListItem(id) {
        let options =
        {
            headers: {
                token: localStorage.getItem('userToken')
            }
        }
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, options);
    }

    return (

        <WishListContext.Provider value={{ addProductsToWishList, getWishList, removeWishListItem, WishListItems, setWishListItems }}>
            {children}
        </WishListContext.Provider>
    )

}