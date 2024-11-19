import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Dashboarddata from '../Datas/Dashboarddata';

function Landingpage(props) {
    const [value, setData] = useState([]);
    useEffect(() => {
        axios.get('https://e-commerce-be-ti14.onrender.com/product/product')
        .then(res => {
            const {data} = res
            const newarr = data.filter(item => item.ratong >= '4').slice(1,5)
            setData(newarr)
        })
        .catch(error => {
            return (error)
        })
    },[])
  return (
    <div>
        <div className='container'>
            <div className='row'>
                <div className='col-12 col-md-6 mt-3'>
                <h1 className='mt-3'>We offer a handpicked selection of everyday furniture, appliances and electornics for you to buy in afforable price</h1>
                <div className='mt-2 mb-5'>
                    <button className='btn btn-primary mt-2'>Browse our category below</button>
                </div>
                </div>
                <div className='col-12 col-md-6 text-center mt-5'>
                <img src='logo.jpg' className='img-fluid' height={'300px'} width={'550px'} alt='simpleimage' />
            </div>
            </div>
             <h4 className='mt-3'>Our category</h4>
            <div className='d-flex bg-white justify-content-around'>
                {Dashboarddata.map(item => 
                    <Link to={item.path}>
                        <div className='d-flex flex-column'>
                            <img src={item.image} height={'67px'} width={'67px'} alt='...' className='rounded-circle' />
                            <span>{item.title}</span>
                        </div>
                    </Link>
                )}
            </div>   
        </div>
        <div className='container mt-5 bg-light'>
            <div className='row'>
                <div className='col-12'>
                    <h4>About Us</h4>
                     <p>Do you want the best furniture, appliances, or electronics in the market at a budget price? If the answer is yes, make E-commerce your go-to service in Chennai! We are a leading Indian e-commerce company with tens of thousands of satisfied customers all over the country. We provide essential everyday items at a discounted price.

                            E-commerce allows you to buy furniture, appliances, and electronics for your home. Our inventory includes all the latest products in the market, made by reputable brands.

                            If you buy any item from us, you receive benefits like free delivery and return policy. These are benefits you won’t find at a retailer. You can buy from us online in Chennai. The process is simple and takes just 5 minutes of your time. We’ll deliver your item to any neighborhood in Chennai, including Guduvanchery, Karlapakkam, Medavakkam, Kelambakkam, and Kovur.
                        </p>
                </div>
            </div>
        </div>
        <div className='conatiner mt-5'>
            <div>
                <h5>Top Products</h5>
                <div className='row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 mt-2'>
                    {value.map(item => 
                        <div className='col-6 col-md-2 my-2'>
                            <Link className='text-decoration-none' to={`/category/${item.category}/${item._id}`}>
                            <div className='card h-100 p-2 overflow-auto'>
                                {/* Product image */}
                                <img src={item.productImage} alt='...' height={'150px'} width={'150px'} />
                                {/* Product details */}
                                <div className='card-body p-2' style={{ fontSize: '12px'}}>
                                    <div className='text-left'>
                                        {/* Product name */}
                                        <span className='title'>{item.productName}</span>
                                        {/* Product Price */}
                                        <div className='title-review'>
                                            <span className='title-rating'>{item.rating}<FaStar /></span>
                                            <span>({item.review.lenght})</span>
                                        </div>
                                        <div className='title-price'>Rs.{item.productPrice}</div>
                                    </div>
                                </div>
                            </div>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Landingpage