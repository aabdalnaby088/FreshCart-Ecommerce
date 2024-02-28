import userEvent from "@testing-library/user-event";
import axios from "axios";
import { createContext, useState } from "react";


export let CartContext = createContext();


export function CartContextProvider({ children }) {


    //state to manage the number of items in the cart

    let [ItemsInCart, setItemsInCart] = useState(0);

    // function to add to cart using the item id and the user token
    function addCart(id) {
        let body = {
            productId: id
        }

        let options = {
            headers: {
                token: localStorage.getItem('userToken')
            }
        }
        return axios.post('https://ecommerce.routemisr.com/api/v1/cart', body, options)
    }



    // function get user cart data when he opens the website

    function getUserCart() {
        const token = localStorage.getItem('userToken');
        let options =
        {
            headers: {
                token
            }
        }
        return axios.get('https://ecommerce.routemisr.com/api/v1/cart', options)
    }


    //function to delete all cart items

    function deleteAllCartItems() {
        const token = localStorage.getItem('userToken');
        const options = {
            headers:
            {
                token
            }
        }
        return axios.delete('https://ecommerce.routemisr.com/api/v1/cart', options);
    }

    //function to delete specific  item from the cart

    function deleteItem(id) {
        const token = localStorage.getItem('userToken');
        let options =
        {
            headers: {
                token
            }
        }
        const body = {
            productId: id
        }
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, options);
    }

    //function to update user cart 
    function UpdateCart(id, count) {
        const token = localStorage.getItem('userToken');
        let options =
        {
            headers: {
                token
            }
        }
        const body = {
            count
        }
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, body, options); 
    }

    // function to buy online
function PayByCredit (CartId , UserData)
{
    const token = localStorage.getItem('userToken');
    let options =
    {
        headers: {
            token
        }
    }
    let body = {
        shippingAddress: UserData 
    }
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${CartId}?url=http://localhost:3000` , body , options);
}


// function to pay on Delivery 
    function PayOnDelivery(CartId, UserData)
{
    console.log(UserData); 
    const token = localStorage.getItem('userToken');
    let options =
    {
        headers: {
            token
        }
    }
    let body = {
        shippingAddress: UserData
    }
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${CartId}`, body, options);
}

    return (
        <CartContext.Provider value={{ addCart, ItemsInCart, setItemsInCart, getUserCart, deleteAllCartItems, deleteItem, UpdateCart, PayByCredit, PayOnDelivery }}>
            {children}
        </CartContext.Provider>
    )
}