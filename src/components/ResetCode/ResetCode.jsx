import React, { useState } from 'react';
import styles from './ResetCode.module.css';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { json, useNavigate } from 'react-router-dom';

export default function ResetCode() {

let navg = useNavigate(); 

    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(false);

    const validation = yup.object({
        resetCode: yup.string().required("Code is required").min(3, 'Must be at least 3 characters').max(10, 'Must be at most 10 characters'),
    });

    const formCode = useFormik({
        initialValues: {
            resetCode: "",
        },
        onSubmit: VerifyResetCode,
        validationSchema: validation,
    });

    async function VerifyResetCode(data) {
        setLoading(true);
        data.resetCode = data.resetCode.trim(); 
        console.log(data);
        let response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode' , data).catch(err => {
            // console.log(err.response.data.message); 
            setErrorMsg(err.response.data.message);
        }) ;
        setLoading(false);
        if (response?.data?.status == 'Success')
        {
            // console.log('yesss');
            navg('/auth/resetPassword')
        }
    }

    return (
        <>
            <section className="confirmationCode my-5">
                <div className="container w-50">
                    <h2 className={`${styles.confirmationCodeTitle} text-center my-5`}>Enter your Verification Code</h2>
                    {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
                    <form onSubmit={formCode.handleSubmit}>
                        <label htmlFor="code" className={styles.inputLabel}>Verification Code</label>
                        <input
                            onChange={formCode.handleChange}
                            onBlur={formCode.handleBlur}
                            className={`form-control my-3 ${formCode.touched.code && formCode.errors.code ? 'is-invalid' : ''}`}
                            type="text"
                            id="code"
                            name="resetCode"
                        />
                        {(formCode.touched.code && formCode.errors.code) && <div className='invalid-feedback mb-3'>{formCode.errors.code}</div>}

                        {loading ? <button type="button" className={`btn text-white px-5 ${styles.confirmationCode_btn}`}>
                            <i className="fas fa-spinner fa-spin"></i>
                        </button> : <button disabled={!(formCode.dirty && formCode.isValid)} onClick={formCode.handleSubmit} className={`btn  text-white px-3 ${styles.confirmationCode_btn}`} type='submit'>Sent Verification Mail</button>}
                    </form>
                </div>
            </section>
        </>
    );
}
