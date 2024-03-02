import { Formik, useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import styles from './SignUp.module.css'
import * as yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
export default function SignUp() {
//set navigator to Redirect the user to login page after successful sign up 

const navg = useNavigate(); 


//set state to store the error massage in case user fail to sign up

let [error , setEror] = useState("");

//set state to store the success status if the user sign up successfully

let [accountCreated , setAcoutCreated] = useState(false); 

//set state to store the loading status of the form

let [isLoading , setIsLoading] = useState(false);

//Use yup library to validate the form inputs from the user 

  let validation = yup.object({
    name: yup.string().required("Please Enter Your Name!").min(3, 'Min length 3').max(20, 'Max length 10'),
    email: yup.string().required("Please Enter Your Email!").min(11, 'Min length 11').max(40, 'Max length 40 ').email('Enter Valid Email'),
    phone: yup.string().required("Please Enter Your Phone Number!").matches(/^01[0125][0-9]{8}$/, 'Enter valid phone number'),
    password: yup.string().required("Please create Password!").matches(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[@$#%])[A-Za-z0-9@$#%]{8,16}$/, "Make Sure Your password contains at least one Capital letter, small letter, special character and number"),
    rePassword: yup.string().required("Please Re-Enter Password!").oneOf([yup.ref('password')], 'Password Doesn\'t match ')
  })


  // formik to get the inputs and store it and apply validation 

  let form1 = useFormik(
    {
      initialValues:
      {
        name: "",
        email: "",
        phone: "",
        password: "",
        rePassword: ""
      },
      onSubmit: registerApi,
      validationSchema: validation
    }
  )

//Function to call the api of sign up and send data to the backend

  async function registerApi(data) {
    setAcoutCreated(false); 
    setEror(""); 
    setIsLoading(true); 
    let response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup' , data).catch((error)=>
    { 
      setEror(error.response.data.message) ;
    }
    ) ; 
    setIsLoading(false); 
    if (response.data.message == 'success'){
      setAcoutCreated(true); 
      navg('/login');
    }

  }

  // toggle eye mode when user clicked on the icon

  useEffect(() => {
    const toggleEyeMode = (inputId, iconSelector) => {
      let input = document.getElementById(inputId);
      let icon = document.querySelector(iconSelector);

      icon.addEventListener('click', () => {
        let typee = input.getAttribute('type');
        if (typee === 'password') {
          input.setAttribute('type', 'text');
          icon.classList.remove('fa-eye-slash');
          icon.classList.add('fa-eye');
        } else {
          input.setAttribute('type', 'password');
          icon.classList.remove('fa-eye');
          icon.classList.add('fa-eye-slash');
        }
      });
    };

    toggleEyeMode('password', '.fa-eye-slash');
    toggleEyeMode('repasword', '.rePasswordIcon');
  }, []);




  // const [user , setUser] = useState({
  //   name:"",
  //   phone:""
  // })


  //   function addNme(e)
  //   {
  // let x = e.target.getAttribute('name');
  //     user[x] = e.target.value;
  // setUser(user)
  // console.log(user) ;
  //   }

  // function submit (e) {

  //   e.preventDefault()
  //   console.log(user); 
  // }


//return jsx

  return (
    <>
      <section className='d-flex align-items-center justify-content-center my-5'>
        <div className="container w-50">

        {/* Form header */}

          <h2 className={`mb-5 registerTitle ${styles.registerTitle} text-center`}>Register Now</h2>

          {/* Success in sign up case  */}

          {(error !="") &&  <div className='alert alert-danger'>{error}</div> }

          {/* Success in sign Up case  */}

          {(accountCreated) &&  <div className='alert alert-success'>Account Created</div> }
          <form action="" onSubmit={form1.handleSubmit}>


          {/* Name input  */}

            <label htmlFor="name">Name</label>
            <input onBlur={form1.handleBlur} value={form1.values.name} onChange={form1.handleChange} type="text" className={(form1.touched.name && form1.errors.name) ? 'form-control my-3 is-invalid' : 'form-control my-3'} name='name' id='name' />
            {(form1.touched.name && form1.errors.name) && <div className='invalid-feedback mb-3' >{form1.errors.name}</div>}

          {/* Email input */}

            <label htmlFor="email">E-mail</label>
            <input onBlur={form1.handleBlur} value={form1.values.email} onChange={form1.handleChange} type="email" className={(form1.touched.email && form1.errors.email ) ? 'form-control my-3 is-invalid' : 'form-control my-3' }
              name='email' id='email ' />
            {(form1.touched.email && form1.errors.email) && <div className='invalid-feedback mb-3'>{form1.errors.email}</div>}

          {/* Phone input  */}

            <label htmlFor="phone">Phone</label>
            <input onBlur={form1.handleBlur} value={form1.values.phone} onChange={form1.handleChange} type="tel" className={(form1.touched.phone && form1.errors.phone) ? 'form-control my-3 is-invalid' : 'form-control my-3'} name='phone' id='phone' />
            {(form1.touched.phone && form1.errors.phone) && <div className='invalid-feedback mb-3'>{form1.errors.phone}</div>}

          {/* Password input */}

              <label htmlFor="password">Password</label>
<div className='position-relative'>
              <input onBlur={form1.handleBlur} value={form1.values.password} onChange={form1.handleChange} type="password" className={(form1.touched.password && form1.errors.password) ? 'form-control my-3 is-invalid' : 'form-control my-3'}
                name='password' id='password' />
              <i className={`fa-solid fa-eye-slash position-absolute ${styles.eyePass}`}></i>
            {(form1.touched.password && form1.errors.password) && <div className='invalid-feedback mb-3'>{form1.errors.password}</div>}
</div>

            {/* rePassword input */}

            <label htmlFor="repassword">Re-Enter Your Password</label>

<div className="position-relative">
              <input onBlur={form1.handleBlur} value={form1.values.rePassword} onChange={form1.handleChange} type="password" className={(form1.errors.rePassword && form1.touched.rePassword) ? 'form-control is-invalid my-3' : 'form-control my-3'} name='rePassword' id='repasword' />
              <i className={`fa-solid fa-eye-slash rePasswordIcon position-absolute ${styles.eyePass}`}></i>
            {(form1.touched.rePassword&& form1.errors.rePassword) && <div className='invalid-feedback mb-3'>{form1.errors.rePassword}</div>}
</div>


            {/* <input onChange={addNme} type="text" className='form-control my-3' name='name'  />
          <input onChange={addNme} type="tel" className='form-control my-3' name='phone' />
          <button className='btn btn-primary' onClick={submit}></button> */}


            {/* sign up button and loading button and toggle between them */}

            {!isLoading ? <button disabled={!(form1.isValid && form1.dirty)} type="submit" className={`btn text-white mt-4 ${styles.submit_btn} `}>Sign Up</button> : <button className={`btn text-white mt-4 px-5 ${styles.submit_btn}`}>
              <i className="fas fa-spinner fa-spin"></i>
            </button>
            }
            
          

          </form>
        </div>
      </section>

    </>
  )
}
