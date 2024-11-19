import React, { useContext, useState } from 'react'
import { FaMinusCircle, FaPlusCircle } from 'react-icons/fa'
import Mycontext from '../../Context'
import axios from 'axios'

const Cart = (props) => {
    const {item, setitem, userData} = useContext(Mycontext)
    const [user, setUser] = useState({orderid:"",address:'',email:''})
    // increase quantity
    const increase = (id) => {
        const find = item.findIndex((value) => value._id === id)
        if(item[find].quantity !== 1){
            item[find].quantity -= 1
        }
        setitem([...item])
    }

    const decrease = (id) => {
        const find = item.findIndex((value) => value._id === id)
        if (item[find].quantity !== 1) {
            item[find].quantity -= 1
        }
        setitem([...item])
    }

    //remove cart item 
    const removeItem = (id) => {
        axios.post(`https://e-commerce-be-ti14.onrender.com/user/cart/${id}`, {email: userData.email})
        .then(res => {
            const find = item.findIndex((value) => value._id === id)
            item.splice(find, 1)
            setitem([...item])
        })
        .catch(error => {
            return (error)
        })
    }

    //total amount
    const total = item.reduce((a,b) => {
        return(a = a+b.productPrice*b.quantity);
    }, 0);
    const handler =(e) => {
        const {name, value} = e.target;
        setUser({...user,[name]:value})
    }

    const handlePayment = () =>{
        if(user.address === ""){
            alert('please add delivery address')
        }else{
            alert('payment is successful')
        }
    }
  return (
    <div className='container'>
        <div className='row mt-2'>
            <div className='col-md-8'>
                {item.map(items => 
                    <div className='card p-3'>
                        <div className='cardarea'>
                            <img src={items.productImage} height={'100px'} width={'100px'} alt='...' />
                            <div className='desarea'>
                                <span>{items.productName} </span>
                                <span className='font-weight-bold'>₹{items.productPrice} </span>
                            </div>
                        </div>
                        <div className='bottom-area'>
                            <div className='crement'>
                                <FaMinusCircle className='icon' onClick={() => { decrease(items._id)}} /><span>{items.quantity} </span><FaPlusCircle className='icon' onClick={() => { increase(items._id)}} />
                            </div>
                            <button onClick={() => { removeItem(items._id)}} >Remove</button>
                        </div>
                    </div>
                )}
            </div>
            <div className='col-md-4 p-0'>
                <div>
                    <div className='card-title'>
                        <span>Price Details</span>
                    </div>
                    <div className='d-flex flex-column'>
                        <div className='pricearea'>
                            <label>Price</label>
                            <span>₹{total}</span>
                        </div>
                        <div className='pricearea'>
                            <label>Delivery Charges</label>
                            <span style={{color:'green'}}>Free</span>
                        </div>
                        <div className='totalarea'>
                            <label>Total</label>
                            <span>₹{total}</span>
                        </div>
                    </div>
                </div>
                <div className='card p-4 mt-2'>
                    <label style={{color:'grey'}}>Delivery Address</label>
                    <textarea onChange={handler} name='address' />
                </div>
                <button className='btn btn-warning w-100 font-weight-bold' onClick={() => handlePayment()} style={{color:'white', fontSize:'1.2rem'}}>Place order</button>
            </div>
        </div>
    </div>
  )
}

export default Cart