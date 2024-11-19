import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import "./Login.css"
import axios from 'axios';

function Login(props) {
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [load, setLoad] = useState(true);
    const [users, setUsers] = useState({});

    const handler = (e) => {
        const { name, value } = e.target;
        setUsers({...users, [name]: value})
    }
    const submit = (e) => {
        e.preventDefault();
        //API Fetching
        axios.post('https://e-commerce-be-ti14.onrender.com/user/login', users)
            .then((res) => {
                setError('')
                console.log(res.data.token)
                if(res.data.user === 'admin'){
                    setSuccess('Login Successfull')
                    setLoad(true)
                    window.localStorage.setItem('admintoken', res.data.token)
                    window.location.href = '/admin/dashboard'
                }else{
                    setSuccess('Login Successfull')
                    setLoad(true)
                    window.localStorage.setItem('usertoken', res.data.token)
                    window.location.href ='/'
                }
            })
            .catch((error) => {
                setLoad(true)
                setSuccess('')
                const {data} = error.response;
                setError(data)
            })
    }
  return (
    <div className="emailarea">
        <form className='form'>
            <h3>Login</h3>
            <div className='label'>
                <label>Email Address</label>
            </div>
            <input type='email' className='input' onChange={handler} placeholder='Enter Email Address ...' />
            <div className='label'>
                <label>Password</label>
            </div>
            <input type='password' className='input' onChange={handler} placeholder='Enter Password ...' name='password' />
            <div className='label'>
                {error !== null ? <span className='text-danger'>{error}</span> : null}
                {success !== null ? <span className='text-success'>{success}</span> : null}
            </div>
            <button onClick={(e) => {submit(false)}} className='formButton'>
                {load ? <span>Login</span> : <div className='spinner-border text-primary' role='status'></div>}
            </button>
            <div className='loginFooter'>
                <span> Not a User ? <Link to='/register'>Register</Link></span>
                <span><Link to="/register">Forgot Password</Link></span>
            </div>
            <div className='mt-2'>
                <h2></h2>
            </div>
        </form>
    </div>
  )
}

export default Login