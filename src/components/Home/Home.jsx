import React, { useContext, useEffect, useState } from 'react'
import LoadingScreen from '../LoadingScreen/LoadingScreen'
import axios from 'axios';
import ProductItem from '../ProductItem/ProductItem';
import { useQuery } from 'react-query';
import MainSlider from '../MainSlider/MainSlider';
import CategoriesSlider from '../CategorisSlider/CategoriesSlider';
import { CartContext } from '../../SharedData/CartContext';
import toast, { Toaster } from 'react-hot-toast';
import { WishListContext } from './../../SharedData/WishListContext';
import { Helmet } from 'react-helmet';

export default function Home() {

  // setting state for the loading screen 

  // const [isLoading , setisLoading] = useState(false); 


  // state for storing the data returned from the Api 

  // const [Products , setProducts] = useState([]);

  // calling the getAllProducts function in component did mount
  // useEffect(()=>
  // {
  // getAllProducts(); 
  // },
  // [])


  // function to get data from the Api 


  // async function getAllProducts()
  // {
  //   setisLoading(true); 
  //   let response = await axios.get('https://ecommerce.routemisr.com/api/v1/products')
  //   setisLoading(false); 
  //   setProducts( products => products =  response.data.data) ; 
  // }

  //Getting the context of wishList
  let { addProductsToWishList, getWishList, setWishListItems } = useContext(WishListContext);

  //calling the cart context to handle the add to cart button 

  let { addCart, setItemsInCart } = useContext(CartContext);

  // state for the page number 

  const [page, setPage] = useState(1);

//state for the wish list
  let [wishList, setWishList] = useState([]); 


  // using react-query approtch

  let { isLoading, data, isError, error, isFetching } = useQuery(['products', page], getProducts, {
    cacheTime: 300000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    // refetchInterval : 5000,
  });

  function getProducts(querydata) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products?page=${querydata.queryKey[1]}&limit=36`);
  }

  // get page function 
  function getPage(pageNum) {
    setPage(pageNum);
  }


  //Function to add to cart 

  async function addToCart(id) {
    let req = await addCart(id).catch(err =>{});
if (req.data.status == 'success')
{
  setItemsInCart( req.data.numOfCartItems ); 
toast.success(req.data.message , {
  position: 'top-center',
  duration: 1000,
  icon: '🛒',
})
}
  }

  //function to add product to wishlist
  async function addToWishList(e, id) {
    let req = await addProductsToWishList(id).catch(err => {});
    if (req?.data.status === 'success') {
      const iconElement = e.target;
      if (iconElement.classList.contains('fa-regular')) {
        iconElement.classList.remove('fa-regular');
        iconElement.classList.add('fa-solid');
      }
      setWishListItems(req?.data.data.length)
      toast.success(req.data.message, {
        position: 'top-center',
        duration: 1000,
        icon: '❤️',
      });
    }
  }

//function to get the wish list

  async function getUserWishList() {
    let req = await getWishList().catch(err => {});
    if (req?.data.status == 'success') {
      setWishList(req.data.data);
    }
  }
  useEffect(() => {
    getUserWishList();
  }, [])

//this function checks if product is in the wish list

  function isProductInWishList(product) {
    return wishList.some((wishlistProduct) => wishlistProduct._id == product._id);
  }

  let Products = data?.data.data;
  // console.log(data?.data.metadata.numberOfPages); 
  return (
    <>

<Helmet>
        <meta name='FreshCart Home' content='Home Page of freashCart contains vanities  of products from different categories.' />
  <title>FreshCart Home</title>
</Helmet>


    <Toaster/>
      {isLoading ? <LoadingScreen /> :
        <div className='overflow-hidden'>
          <MainSlider />
          <CategoriesSlider />
          <div className="container my-5">
            <div className='row g-4 my-5'>
              {Products.map((product, i) => {
                const isInWishList = isProductInWishList(product);
                return (
                  <ProductItem
                    product={product}
                    key={i}
                    addToCart={addToCart}
                    addToWishList={addToWishList}
                    isInWishList={isInWishList} 
                  />
                );
              })}
            </div>
            {/* make dynamic list  of pages to navigate throw pages  */}
            <nav aria-label="Page navigation example my-5">
              <ul className="pagination justify-content-center">
                <li className="page-item"><a className="page-link" onClick={() => {
                  getPage(page - 1)
                }} >Previous</a></li>
                {[...Array(data?.data.metadata.numberOfPages)].map((_, i) => (
                  <li className="page-item" key={i}>
                    <a className="page-link" onClick={() => getPage(i + 1)}>{i + 1}</a>
                  </li>
                ))}
                <li className="page-item"><a className="page-link" onClick={() => {
                  getPage(page + 1)
                }}>Next</a></li>
              </ul>
            </nav>


          </div>
        </div>
      }

    </>
  )
}
