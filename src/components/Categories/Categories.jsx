import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import ItemHolder from '../ItemHolder/ItemHolder';
import { Helmet } from 'react-helmet';

export default function Categories() {

    //function to get all categories 

function getAllCategories()
{
    return axios.get('https://ecommerce.routemisr.com/api/v1/categories'); 
}

let {data , isLoading} = useQuery('categories' , getAllCategories)


let categories = data?.data.data ; 


    return (
    <>

<Helmet>
    <meta name='Categories page' content='here you will find various categories in our FreshCart App' />
    <title>FreshCart | Categories</title>
</Helmet>


    {
        isLoading ? <LoadingScreen/> : 
                    <section className="Categories my-5">
                        <div className="container">
                            <h2 className='text-main text-center'>We  have a wide range of products in different categories</h2>
                            <div className="Partners">
                                <ItemHolder items={categories} height = {400} />
                            </div>
                        </div>
                    </section>
    }
    
    
    </>
    )
}
