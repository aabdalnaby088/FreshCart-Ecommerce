import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import logo from '../../images/freshcart-logo.svg'
import { TokenContext } from '../../SharedData/TokenContext.js'
import ModalComp from '../Modal/Modal.jsx';
import { CartContext } from '../../SharedData/CartContext.js';
import styles from './Navbar.module.css'
import WishList from './../WishList/WishList';
import { WishListContext } from '../../SharedData/WishListContext.js';
export default function Navbar() {

    // calling the cart context to use its data in this component 

    let { ItemsInCart } = useContext(CartContext);
    

    //calling the wish list context to use its data in this component
    let { WishListItems } = useContext(WishListContext) ; 

    //create Navigator
    let navg = useNavigate();

    // calling the created context 

    let { userToken, setuserToken, userData } = useContext(TokenContext)
    let [openModal, setoopenModal] = useState(false);
    //Logout Function 

    function logOut() {
        if (localStorage.getItem('userToken') != null) {
            localStorage.removeItem('userToken');
            setuserToken(null);
            navg('/login');
        }
    }


    function checkLogout() {

        setoopenModal(true)

    }


    return (
        <>

            <ModalComp status={openModal} setStatus={setoopenModal} logOut={logOut} />
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="home">
                        <img src={logo} alt="webSite Logo" />

                    </NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">

                        {/* navBar component for logged in users */}

                        {userToken != null &&
                            <ul className="navbar-nav me-auto mb-lg-0">
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="Home">Home</NavLink>
                                </li>
                                <li className="nav-item d-flex justify-content-between align-items-center">
                                    <NavLink className="nav-link" to="WishList">WishList
                                    </NavLink>
                                    <span className='badge text-bg-danger '>{WishListItems}</span>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="Categories">Categories</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="Brands">Brands</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="allorders">Orders</NavLink>
                                </li>
                            </ul>}

                        {console.log(userToken)}

                        {/* navBar for new users or who did not logged in yet  */}


                        <ul className="navbar-nav ms-auto mb-lg-0">
                            <li className="nav-item d-flex justify-content-center align-items-center ">
                                <i className='fa-brands mx-2 fa-facebook'></i>
                                <i className='fa-brands mx-2 fa-twitter'></i>
                                <i className='fa-brands mx-2 fa-instagram'></i>
                                <i className='fa-brands mx-2 fa-spotify'></i>
                                <i className='fa-brands mx-2 fa-youtube'></i>
                                {userToken != null&&
                                <NavLink to='/cart' className= "position-relative mx-4">
                                            <i className="fa-solid fa-cart-shopping fa-lg">
                                            </i>
                                            <span className={`${styles.numbers}`}>{ItemsInCart}</span>
                                </NavLink>
                                }
                            </li>
                            {/* <li className='mx-4 position-relative'> */}
                                        {/* </li> */}
                            {(userToken != null) ?
                                <>

                                    <li className="nav-item align-self-center">
                                        <span className='mx-3'>Welcome ,<span className='text-main' >{userData.name}</span></span>
                                        <span className='cursor-pointer' onClick={checkLogout}>SignOut</span>
                                    </li>

                                </>
                                :
                                <>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="Login">Login</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="SignUp">SignUp</NavLink>
                                    </li>
                                </>

                            }

                        </ul>


                    </div>
                </div>
            </nav>
        </>
    )
}
