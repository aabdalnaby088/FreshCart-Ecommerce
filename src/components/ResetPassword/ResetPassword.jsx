import React, { useState } from 'react'
import styles from './ResetPassword.module.css'
import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
export default function ResetPassword() {

let navg = useNavigate() ; 

let [errorMsg , setErrorMsg] = useState(""); 

let [loading , setLoading] = useState(false);

    let validation = yup.object(
        {
            email: yup.string().required('Enter your email address').email('Enter Valid Email'),
            newPassword: yup.string().required("Please create Password!").matches(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[@$#%])[A-Za-z0-9@$#%]{8,16}$/, "Make Sure Your password contains at least one Capital letter, small letter, special character and number"),
        }
    )

    let formnewPassword = useFormik({
        initialValues: {
            email : "",
            newPassword : "",
        },
        onSubmit:updatePassword,
        validationSchema : validation
    })

async function updatePassword(data)
{
    setLoading(true);
    let response = await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword' , data).catch(error => {
        setErrorMsg(error.response.data.message); 
    })
    setLoading(false);
    if (response.data.token)
    {
        navg('/Login')
    }
}


    return (
        <>
        <section className="UpdatePass py-5">
        <div className="container w-50 my-5">
            <h2 className={`${styles.UpdatePassTitle } text-center`}>Update your password</h2>
{errorMsg&& <div className="alert alert-danger">{errorMsg}</div> }

            <form action="">
                <label htmlFor="email">E-mail</label>
                        <input onBlur={formnewPassword.handleBlur}  onChange={formnewPassword.handleChange}  type="email" name="email" id="email" className={`form-control my-3 ${(formnewPassword.errors.email && formnewPassword.touched.email) && 'is-invalid'}   ` } />
                        {(formnewPassword.errors.email && formnewPassword.touched.email) && <div className='invalid-feedback mb-3'>{formnewPassword.errors.email}</div> }



                        <label htmlFor="newPassword">New Password</label>
                        <input onBlur={formnewPassword.handleBlur}  onChange={formnewPassword.handleChange}  type="password" name="newPassword" id="newPassword" className={`form-control my-3 ${formnewPassword.errors.newPassword && formnewPassword.touched.newPassword && 'is-invalid'}`  } />
                        {(formnewPassword.errors.newPassword && formnewPassword.touched.newPassword) && <div className='invalid-feedback mb-3'>{formnewPassword.errors.newPassword}</div> }

                        {loading ? <button type="button" className={`btn text-white px-5 mt-4 ${styles.UpdatePass_btn}`}>
                            <i className="fas fa-spinner fa-spin"></i>
                        </button>
                        :
                        <button onClick={formnewPassword.handleSubmit} type="submit" className={`${styles.UpdatePass_btn} btn text-white`}>Update!</button>
                        }


                        
            </form>
        </div>
        </section>
        </>
    )
}
