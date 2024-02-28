import React, { useContext, useEffect, useState } from 'react'
import OrderItem from '../OrderItem/OrderItem'
import { OrdersContext } from '../../SharedData/OrderContext';
import { TokenContext } from '../../SharedData/TokenContext';
import axios from 'axios';
import { Helmet } from 'react-helmet';

export default function AllOrders() {
// using the context of orders to get all orders 

    let { GetOrders } = useContext(OrdersContext) ; 


    let { userData } = useContext(TokenContext);


//setting state to hold all user orders

let [orders , setOrders] = useState([]); 

console.log(userData.id);
//function to get all orders 
async function AllOrders()
{
    let req = await GetOrders().catch(err => {console.log(err)}) ; 
    if (req?.data.length)
    setOrders(req?.data.reverse()) ;
}

useEffect(() => {
    AllOrders();
}, [userData]);



    return (

<>

<Helmet>

<meta name='FreshCart orders page' content='all the orders of the user since he created his account' />

    <title>FreshCart | User Orders</title>
</Helmet>


    <section className="AllOrders my-5">
        <h3 className='text-main my-5 text-center'>Your Orders History</h3>
        <div className="container">
            <div className="row g-4">
                    {orders.map((order, i) => {
                        return <OrderItem key={i} order={order} />;
                    })}
            </div>
        </div>
    </section>
</>


    )
}
