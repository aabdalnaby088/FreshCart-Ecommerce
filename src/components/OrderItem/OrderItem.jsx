import React from 'react'

export default function OrderItem({ order }) {
    return (
        <div className="col-lg-4">
            <div className="order bg-secondary-subtle p-3 rounded">
                <h5>Shipping Address: <span className='text-main'>{order.shippingAddress.city}</span> </h5>
                <h6>Total Price : <span className='text-main'>{order.totalOrderPrice}</span> EGP </h6>
                <h6>Payment Method : <span className='text-main'>{order.paymentMethodType}</span> </h6>
                <h6>Items Number : <span className='text-main'>{order.cartItems.length}</span> item/s </h6>
                <h6>Ordered At : <span className='text-main'>{order.createdAt.replace('T' , ' ').substring(0,16)}</span> </h6>
            </div>
        </div>
    )
}
