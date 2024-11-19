import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Mycontext from '../../Context';
import axios from 'axios';
import Searcharea from '../searchArea/Searcharea';
import Filter from '../Filter/Filter'
import { FaStar } from 'react-icons/fa';


function Category(props) {
    const {category} = useParams();
    const [data, setData] = useState([]);
    const {records, setRecords} = useContext(Mycontext);
    const [loading, setloading] = useState(false);

    useEffect(() => {
        axios.get(`https://e-commerce-be-ti14.onrender.com/product/category/${category}`)
        .then((res)=>{
            setloading(true)
            setData(res.data)
            setRecords(res.data)
        })
        .catch((error) => {
            return error
        })
    },[category, setRecords])
  return (
    <div className='container'>
        <Searcharea categoryitem={category} product={data} />
        <div className='row mt-4'>
            <div className='col-md-3'>
                <Filter data={data} />
            </div>
            <div className='col-md-9'>
                <h5>{category}</h5>
                <h6>{`showing${records.length} items`} </h6>
                { loading ? <div className='row gx-4 gx-lg-5 row-cols-md-2 row-cols-xl-4 mt-2' >
                    {records.map(items => <div className='col-12 col-md-3 my-2'>
                        <Link className='text-decoration-none' to={`/category/${items.category}/${items._id}`}>
                        {/* Product Image */}
                        <div className='d-flex justify-content-center imgarea'>
                            <img src={items.productImage} alt='... ' height={'150px'} width={'150px'} />
                        </div>
                        {/* Product Details */}
                        <div className='card-body p-2'>
                            <div className='text-left'>
                                {/* Product Name */}
                                <span className='title'>{items.productName}</span>
                                {/* Product Price */}
                                <div className='title-review'>
                                    <span className='title-rating'>{items.rating}<FaStar /></span>
                                    <span>({items.review.length})</span>
                                </div>
                                <div className='title-price'>₹{items.productPrice}</div>
                            </div>
                        </div>
                        {/* Product actions */}
                        <div className='card-footer p-1 pt-0 border-top-0  bg-transparent'></div>
                        </Link>
                    </div>
                        )}
                    </div> : <section>
                        <div className='container mt-3 text-center'>
                            <div className='spinner-border text-primary' role='status'>
                                <span className='sr-only'>Loading ...</span>
                            </div>
                        </div>
                    </section>
                }
            </div>
        </div>
    </div>
  )
}

export default Category