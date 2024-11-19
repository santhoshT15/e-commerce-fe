import React, { useState } from 'react'
import { FaStar } from 'react-icons/fa';
import './Rating.css';
import axios from 'axios';


function RatingModel({data, userName}) {
    const [reviewdata, setdata] = useState({rating:0, userName: userName})
    const review = (i) => {
        if(window.localStorage.getItem('usertoken')){
            reviewdata.rating = Number(i + 1);
            setdata({...reviewdata})
        }else{
            alert('please login to review')
        }
    }
    const handler = (e) => {
        const {name, value} = e.target;
        setdata({...reviewdata, [name] : value})
    }

    const submit = () => {
        if(reviewdata.rating <= 0 || reviewdata.review === ""){
            return alert('Rating and review field cannot be empty')
        }else{
            axios.post(`https://e-commerce-be-ti14.onrender.com/user/postreview/${data._id}`, reviewdata)
                .then((res) => {
                    if(res){
                        window.location.reload()
                    }
                })
                .catch((error) => {
                    return (error)
                })
        }
    }
  return (
    <div>
        <button className='modalbutton' data-toggle="modal" data-target="#exampleModal">Write review</button>

            { /* Modal */}
            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">{data.productName}</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form>
                                <div className='form-group'>
                                    <label>Review Title</label>
                                    <input className='form-control' placeholder='Title' name='reviewTitle' onChange={handler}></input>
                                </div>
                                <div className='form-group'>
                                    <label>Rating</label>
                                    <div className='star-rate'>
                                        {Array(5).fill().map((_, i) =>
                                            <FaStar className={reviewdata.rating > 0 && i < reviewdata.rating ? 'star' : 'starnull'} name='rating' onClick={() => review(i)} />)}
                                    </div>
                                </div>
                                <div className='form-group'>
                                    <label>Review</label>
                                    <textarea className='form-control' placeholder='write review' name='review' onChange={handler}></textarea>
                                </div>
                            </form>




                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-warning" onClick={() => submit()} >Submit</button>

                        </div>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default RatingModel