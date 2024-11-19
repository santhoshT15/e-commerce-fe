import React, { useEffect, useState } from 'react'
import { FaStar } from 'react-icons/fa';
import './Rating.css'
import axios from 'axios';

function Rating({id}) {
    const [review, setReview] = useState([])
    useEffect(() => {
        axios.get(`https://e-commerce-be-ti14.onrender.com/user/getreview/${id}`)
            .then((res) => {
                setReview(res.data)
            })
            .catch((error) => {
                return error
            })
    },[id])

  return (
    <div>
        { review.map(item => <div key={item._id} className='ratingarea'>
            <div className='rating-section'>
                <div className='rating-no'>
                    <span>{item.rating}</span>
                    <FaStar />
                </div>
                <span>{item.reviewTitle}</span>
            </div>
            <div className='review-title'>
                {item.review}
            </div>
        </div>)}
    </div>
  )
}

export default Rating