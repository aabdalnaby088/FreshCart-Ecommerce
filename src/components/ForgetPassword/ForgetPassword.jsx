import { useFormik } from 'formik'
import * as yup from 'yup'
import React, { useState } from 'react'
import styles from './ForgetPassword.module.css'
import axios from 'axios'
import { Outlet, useNavigate } from 'react-router-dom'
export default function ForgetPassword() {

    let navg = useNavigate();

    let [errorMsg, setErrorMsg] = useState("");


    let [loading, setLoading] = useState(false);


    // use yup to validate data 

    let validation = yup.object(
        {
            email: yup.string().email('Invalid Email').required("Email is required")
        }
    )

    // use formik to get data 

    let formForgetPassword = useFormik({
        initialValues:
        {
            email: ""
        },
        onSubmit: SendEmail,
        validationSchema: validation
    })

    // function to call api of forget password and send data 
    async function SendEmail(data) {
        setLoading(true);
        let response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', data).catch(err => {
            setErrorMsg(err.response.data.message);
            setLoading(false);
        })
        console.log(response); 
        if (response.data.statusMsg == 'success') {
            setLoading(false);
            navg('/auth/ResetCode');
        }
    }

    return (
        <>
            <section className="ForgetPass my-5">
                <div className="container w-50 py-5 ">
                    <h2 className={`text-center ${styles.forgetPassTitle}`}>Forget Your Password? <br /> <p className='my-3'>No Problem</p> </h2>
                    {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
                    <form action="" className='my-5'>
                        <label htmlFor="email">Enter Your E-mail</label>
                        <input onChange={formForgetPassword.handleChange} onBlur={formForgetPassword.handleBlur} type="email" name="email" id="email" className={` ${(formForgetPassword.touched.email && formForgetPassword.errors.email) && 'is-invalid'}   form-control my-3`} />
                        {(formForgetPassword.touched.email && formForgetPassword.errors.email) && <div className='invalid-feedback mb-3'>{formForgetPassword.errors.email}</div>}

                        {loading ? <button type="button" className={`btn text-white px-5 ${styles.forgetPass_btn}`}>
                            <i className="fas fa-spinner fa-spin"></i>
                        </button> : <button disabled={!(formForgetPassword.dirty && formForgetPassword.isValid)} onClick={formForgetPassword.handleSubmit} className={`btn  text-white px-3 ${styles.forgetPass_btn}`} type='submit'>Sent Verification Mail</button>}
                    </form>
                </div>
            </section>
        </>
    )
}
