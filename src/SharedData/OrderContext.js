import { createContext, useContext } from "react";
import { TokenContext } from "./TokenContext";
import axios from "axios";



export let OrdersContext = createContext(); 


export function OrdersContextProvider({children})
{

// calling the token context to get the user id 

    let { userData } = useContext(TokenContext);

// console.log(userData.id);
//function to get the user orders 

function GetOrders(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userData.id}`)
}

return (
    <OrdersContext.Provider value={{ GetOrders }}>
        {children}
    </OrdersContext.Provider>
)


}