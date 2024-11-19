import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Dashboarddata from '../Datas/Dashboarddata'

function Dashboard() {
    const [value, setValue] = useState([]);
    const [product, setProduct] = useState([]);

    useEffect(() => {
        axios.get('https://e-commerce-be-ti14.onrender.com/product/products')
        .then(res => {
            const {data} =res
            setValue(data)
            const newarr = data.filter(item => item.rating >= '4').slice(1,5)
            setProduct(newarr)
        })
        .catch(error => {
            return (error)
        })
    },[])
  return (
    <div className='container px-4 px-lg-5'>
        <div className='d-flex bg-white justify-content-around'>
            {Dashboarddata.map(item => <Link to={`/admim/category/${item.title}`}>
                <div className='d-flex flex-column'>
                    <img src={item.image} height={'67px'} width={'67px'} className='rounded-circle' alt='...'></img>
                    <span>{item.title}</span>
                </div>
                </Link>)}
        </div>
        <div className='d-flex bg-white justify-content-around mt-4 p-2'>
            <div className='card b-1 p-2 d-flex flex-column align-items-center rounded bg-info'>
                <h4>Total Products</h4>
                <h6>{value.length}</h6>
            </div>
            <div className='card b-1 p-2 d-flex flex-column align-items-center rounded bg-primary'>
                <h4>Total Products</h4>
                <h6>4</h6>
            </div>
        </div>
        <div className='mt-2'>
            <h5>Top Products</h5>
            <div className='row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 mt-2'>
                {product.map(item => <div className='col-6 col-md-2 my-2'>
                    <div className='card h-100 p-2'>
                        {/* Product image */}
                        <img src={item.productImage} alt='...' height={'150px'} width={'150px'} ></img>
                        {/* Product details */}
                        <div className='card-body p-2' style={{ fontSize: '12px'}}>
                            <div className='text-left'>
                                {/* Product name */}
                                <span className='font-weight-bold'>{item.productName}</span>
                                {/* Product Price */}
                                <div className='title-review'>
                                    <span className='title-rating'>{item.rating}</span>
                                    <span>({item.review.length})</span>
                                </div>
                                <div className='text-decoration-line-through'>{item.productPrice}</div>
                            </div>
                        </div>
                    </div>
                </div>)}
            </div>
        </div>
    </div>
  )
}

export default Dashboard