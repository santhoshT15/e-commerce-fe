import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import '../Login/Login.css'
import Usernav from '../LandingPage/Usernav'
import axios from 'axios';

function Registration(props) {
    const [field, setField] = useState('')
    const [userMessage, setUserMessage] = useState('');
    const [users, setUsers] = useState('')
    const handler = (e) => {
        const {name, value} = e.target;
        setUsers({...users, [name]: value})
    }
    const submit = (e) => {
        e.preventDefault();
        axios.post('https://e-commerce-be-ti14.onrender.com/user/register', users)
            .then((res) =>{
                const response = res.data
                setUserMessage('')
                setField(response)
            })
            .catch((error) =>{
                console.log(error)
                if(Array.isArray(error.response.data.details)){
                    setField("")
                    const {details} =error.response.data
                    const {message} = details[0]
                    setUserMessage(message)
                }else{
                    const response = error.response.data;
                    setUserMessage(response)
                }
            })
    }
  return (
    <div>
        <Usernav />
        <div className='emailarea'>
            <form className='form'>
                <h3>Registration</h3>
                <div className='label'>
                    <label>Email Address</label>
                </div>
                <input type="email" className="input" onChange={handler} name='email' placeholder="Enter Email Address..."></input>
                <div className='label'>
                    <label>UserName</label>
                </div>
                <input type="text" className="input" onChange={handler} name='name' placeholder="Username"></input>
                <div className='label'>
                    <label>Password</label>
                </div>
                <input type="password" className="input" onChange={handler} name='password' placeholder="Password"></input>
                <div className='label'>
                    <label>Corfirm Password</label>
                </div>
                <input type="password" className="input" onChange={handler} name='confirmPassword' placeholder="Password"></input>
                <div className='label'>
                    {userMessage !== null ? <span className='text-danger'>{userMessage}</span> : null}
                    {field !== null ? <span className='text-success'>{field}</span>: null}
                </div>
                <button onClick={submit} className='formbutton'>
                    Register
                </button>
                <div className='loginfooter'>
                    <span>Already a User ? <Link to="/login">Login</Link></span>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Registration