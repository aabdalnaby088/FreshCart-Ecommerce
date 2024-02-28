import React, { useContext, useState } from 'react'
import styles from './Login.module.css';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { TokenContext } from '../../SharedData/TokenContext.js'
import { CartContext } from '../../SharedData/CartContext.js';

export default function Login() {

// using the cart context to use its feature when user logged in
  let { getUserCart, setItemsInCart } = useContext(CartContext);



  //set use navigate hook to move to Home page After login
  const navg = useNavigate();

  //calling the context to set token in it if user logged in 

  let { setuserToken } = useContext(TokenContext)


  // state for the error massage which appears under the Tiltle in faild to login case 

  let [errorMsg, setErrorMsg] = useState("");


  //state for the loading button which appears when the user submit the form 

  let [isLading, setIsLoading] = useState(false);

  //State for the Success message which appears when the user logged In successfully
  let [SuccessfullyLoggedIn, SetSuccesfullyLoggedIn] = useState(false);


  // yup for validating the input the user Enters

  let validate = yup.object({
    email: yup.string().required('email is required').email('Enter valid email address'),
    password: yup.string().min(8, "Password must be at least 8 characters").required("Please Enter your Password")
  })

  // formik to get the inputs and store it and apply validation 

  let formLogin = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: loginApi,
    validationSchema: validate
  })

  //Function to call the api of login and send data to the backend

  async function loginApi(data) {
    setIsLoading(true);
    let response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', data).catch(
      function (err) {
        setErrorMsg(err?.response?.data.message);
      }

    );
    setIsLoading(false);
    if (response?.data?.message == 'success') {
      SetSuccesfullyLoggedIn(true);
      setuserToken(response.data.token);
      localStorage.setItem('userToken', response.data.token);
      getCart(); 
      navg('/Home');
    }
  }

  //function to get the user cart after user logged in successfully


  async function getCart() {
    let req = await getUserCart().catch(err => {});
    if (req?.data.numOfCartItems) {
      setItemsInCart(req.data.numOfCartItems);
    }
  }


  // return jsx

  return (
    <>
      <section className={`${styles.login} d-flex align-items-center`}>
        <div className={`container w-50`}>


          {/* header for login form */}
          <h2 className={`${styles.loginTitle}   text-center mb-5`}>Login</h2>
          {/* fail to login case  */}
          {(errorMsg != "") && <div className="alert alert-danger">{errorMsg}</div>}

          {/* Success in login case  */}
          {SuccessfullyLoggedIn && <div className='alert alert-success'>Welcome!!</div>}


          <form action="" className=''>

            {/* email Field in login page */}
            <label htmlFor="email">E-mail </label>
            <input onBlur={formLogin.handleBlur} onChange={formLogin.handleChange} type="email" name="email" id="email" className={(formLogin.touched.email && formLogin.errors.email) ? 'form-control my-3 is-invalid' : 'form-control my-3'} />
            {(formLogin.touched.email && formLogin.errors.email) && <div className='invalid-feedback mb-3'>{formLogin.errors.email}</div>}


            {/* password field in login page */}
            <label htmlFor="password">Password</label>
            <input onBlur={formLogin.handleBlur} onChange={formLogin.handleChange} type="password" name='password' id='password' className={(formLogin.touched.password && formLogin.errors.password) ? 'form-control my-3 is-invalid' : 'form-control my-3'} />
            {(formLogin.touched.password && formLogin.errors.password) && <div className='invalid-feedback mb-3'>{formLogin.errors.password}</div>}

            {/* forget Password button  */}
            <button type="button" className={`btn me-3 mt-4 px-3 ${styles.login_btn}`}>
              <Link to="/auth" className='text-white' >
                Forget Your Password ?
              </Link>
            </button>


            {/* login button and loading button and toggle between them */}
            {!isLading ? <button disabled={!(formLogin.dirty && formLogin.isValid)} type="submit" onClick={formLogin.handleSubmit} className={`btn ${styles.login_btn} text-white mt-4`}>Log In</button> :

              <button type="button" className={`btn text-white px-5 mt-4 ${styles.login_btn}`}>
                <i className="fas fa-spinner fa-spin"></i>
              </button>

            }

          </form>
        </div>
      </section>

    </>
  )
}
