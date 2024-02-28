import React, { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { CartContext } from '../../SharedData/CartContext';
import { Helmet } from 'react-helmet';
export default function CheckOut() {
    // use navigate to navigate programmatically 
let navg = useNavigate(); 

    //use the context to get data from it 

    let { PayByCredit, PayOnDelivery, setItemsInCart } = useContext(CartContext);


    // setting user params to get me the params in the url 
    let params = useParams();

    // using yup to validate the form 

    let validate = yup.object(
        {
            city: yup.string().required('Enter Shipping Address').matches(/^(?:[\w\s-]{3,})?$/, 'Enter valid shipping city'),
            phone: yup.string().required('Enter your phone number').matches(/^01[0125][0-9]{8}$/, 'Enter your phone number'),
            details: yup.string(),
        }
    )

    // use formic to handle form inputs

    let fromAddress = useFormik(
        {
            initialValues: {
                details: "",
                phone: "",
                city: "",
            },
            onSubmit: OnlinePayment,
            validationSchema: validate,
        }
    )

    //function to redirect you and handle online payment 

    async function OnlinePayment(values) {
        let res = await PayByCredit(params.id, values).catch(err => {});
        if (res?.data.status == 'success') {
            window.open(res.data.session.url,'_self');
        }
    }

//Function to handle cash on delivery 

    // ...

    async function PayCash() {
        const userValues = fromAddress.values;
// console.log(userValues); 
        let req = await PayOnDelivery(params.id, userValues);
        if (req?.data.status === 'success') {
            setItemsInCart(0); 
            navg('/allorders');
        }
    }


    return (


<>

<Helmet>
    <meta name='This page is for user checkOut' content='User Checkout Page' />
    <title>CheckOut | AddressDetails</title>
</Helmet>




        <section className="CheckOut my-5">
            <h3 className='text-main my-5 text-center'>Shipping Information</h3>
            <div className="container d-flex justify-content-center">
                <form action="" className='w-75' onSubmit={fromAddress.handleSubmit}>
                    <input
                        onChange={fromAddress.handleChange}
                        onBlur={fromAddress.handleBlur}
                        className={`my-4 form-control ${fromAddress.touched.city && fromAddress.errors.city ? 'is-invalid' : ''}`}
                        type="text"
                        name="city"
                        placeholder="Enter your shipping order "
                    />

                    {(fromAddress.touched.city && fromAddress.errors.city) && <p className='invalid-feedback'>{fromAddress.errors.city}</p>}


                    <input onChange={fromAddress.handleChange} onBlur={fromAddress.handleBlur}
                        className={`my-4 form-control ${fromAddress.touched.phone && fromAddress.errors.phone ? 'is-invalid' : ''}`}
                        type="text" name='phone' placeholder='Enter your Phone Number' />

                    {(fromAddress.touched.phone && fromAddress.errors.phone) && <p className='invalid-feedback'>{fromAddress.errors.phone}</p>}



                    <textarea onChange={fromAddress.handleChange}
                        onBlur={fromAddress.handleBlur}
                        name="details" id=""
                        className={`form-control ${fromAddress.touched.details && fromAddress.errors.details ? 'is-invalid' : ''}`}
                        placeholder='Any Details'></textarea>

                    {(fromAddress.touched.details && fromAddress.errors.details) && <p className='invalid-feedback'>{fromAddress.errors.details}</p>}


                    <div className='my-4 d-flex justify-content-around my-4'>
                        <button type='submit' className='btn bg-main text-white'>pay by Credit 💳</button>
                        <button onClick={PayCash}  type='button' className='btn bg-main text-white'>pay On Delivery 🚗</button>
                    </div>
                </form>
            </div>
        </section>
</>
    )
}
