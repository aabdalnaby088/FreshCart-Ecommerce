import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import SignUp from './components/SignUp/SignUp';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Categories from './components/Categories/Categories';
import Brands from './components/Brands/Brands';
import NotFound from './components/NotFound/NotFound';
import { TokenContextProvider } from './SharedData/TokenContext.js';
import GaurdRouting from './components/GaurdRouting/GaurdRouting.jsx';
import ForgetPassword from './components/ForgetPassword/ForgetPassword.jsx';
import ResetCode from './components/ResetCode/ResetCode.jsx';
import ResetPassword from './components/ResetPassword/ResetPassword.jsx';
import Layout2 from './components/Layout2/Layout2.jsx';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools'
import ProductDetails from './components/ProductDetails/ProductDetails.jsx';
import { CartContextProvider } from './SharedData/CartContext.js';
import Cart from './components/Cart/Cart.jsx';
import WishList from './components/WishList/WishList.jsx';
import { WishListContextProvider } from './SharedData/WishListContext.js';
import CheckOut from './components/CheckOut/CheckOut.jsx';
import AllOrders from './components/AllOrders/AllOrders.jsx';
import { OrdersContext, OrdersContextProvider } from './SharedData/OrderContext';
import { Offline } from 'react-detect-offline';

let reactQuery = new QueryClient();
const routes = createBrowserRouter(
  [
    {
      path: '', element: <Layout />, children:
        [
          { index: true, element: localStorage.getItem('userToken')? <Home/> :  <SignUp /> },
          { path: 'Signup', element: <SignUp /> },
          { path: 'Login', element: <Login /> },
          { path: 'Home', element: <GaurdRouting> <Home />  </GaurdRouting> },
          { path: 'Categories', element: <GaurdRouting> <Categories /> </GaurdRouting> },
          { path: 'Brands', element: <GaurdRouting> <Brands /> </GaurdRouting> },
          { path: 'WishList', element: <GaurdRouting> <WishList/> </GaurdRouting> },
          { path: 'ProductDetails/:ProductId', element: <GaurdRouting> <ProductDetails /> </GaurdRouting> },
          { path: 'Cart', element: <GaurdRouting> <Cart /> </GaurdRouting> },
          { path: 'checkout/:id', element: <GaurdRouting> <CheckOut/> </GaurdRouting> },
          { path: 'allorders', element: <GaurdRouting> <AllOrders/> </GaurdRouting> },
          {
            path: 'auth', element: <Layout2 />, children: [
              { index: true, element: <ForgetPassword /> },
              { path: 'ResetCode', element: <ResetCode /> },
              { path: 'resetPassword', element: <ResetPassword /> },
            ]
          },

          { path: '*', element: <NotFound /> },
        ]
    }
  ]

)


function App() {


  return (
<>

<div className='position-fixed bottom-0 start-0 m-3 p-2 rounded z-3 bg-secondary'>

        <Offline> <h5 className='text-white'>You're offline right now</h5> </Offline>

</div>

    <QueryClientProvider client={reactQuery}>
      <ReactQueryDevtools />
      <TokenContextProvider>
        <CartContextProvider>
            <WishListContextProvider>
              <OrdersContextProvider>
                <RouterProvider router={routes} />
              </OrdersContextProvider>
            </WishListContextProvider>
        </CartContextProvider>
      </TokenContextProvider>
    </QueryClientProvider>

</>



  );
}

export default App;
