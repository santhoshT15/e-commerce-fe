import axios from 'axios';
import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'

function AddProduct(props) {
    const notify = () => toast('Product Added');
    const [product, setProduct] = useState({product:''})

    const handler = (e) => {
        const { name, value } = e.target
        setProduct({ ...product, [name]: value})
    }

    const submit = (e) =>{
        e.preventDefault();
        axios.post('https://e-commerce-be-ti14.onrender.com/admin/createProdcut', product)
        .then((res) => {
            notify()
            return (res)
        })
        .catch((error)=>{
            return (error)
        })
    }
  return (
    <div className='container'>
        {/* Page Heading */}
        <div className='d-sm-flex align-items-center justify-content-between mb-4'>
            <h1 className='h3 mb-0 text-gray-800'>Add New Product</h1>
        </div>
        <form>
            <div className='form-row'>
                <div className='form-group col-md-6'>
                    <label>Product Name</label>
                    <input type='text' className='form-control' name='productName' onChange={handler} placeholder='Name' />
                </div>
                <div className='form-group col-md-6'>
                    <label>Product Price</label>
                    <input type='text' className='form-control' name='productPrice' onChange={handler} placeholder='Product Price' />
                </div>
            </div>
            <div className='form-row'>
                <div className='form-group col-md-6' >
                    <label>category</label>
                    <select className='form-control' name='category' onChange={handler}>
                        <option selected>Choose...</option>
                        <option>Mobiles</option>
                        <option >Furniture</option>
                        <option>Electronics</option>
                        <option>Appliances</option>
                    </select>
                </div>
                <div className='form-group col-md-6'>
                    <label> Product Image Url</label>
                    <input type='text' className='form-control' name='productImage' onChange={handler} placeholder='Product Image' />
                </div>
            </div>
            <div className='form-row'>
                <div className='form-group col-md-6'>
                    <label>Description</label>
                    <textarea type='text' className='form-control' name='decription' onChange={handler} placeholder='Description' />
                </div>
            </div>
            <button type='text' className='btn btn-primary' onClick={(e) => {submit(e)}} >Submit</button>
            <ToastContainer />
        </form>
    </div>
  )
}

export default AddProduct