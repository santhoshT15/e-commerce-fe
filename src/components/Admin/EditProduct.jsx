import axios from 'axios';
import React, { useState } from 'react'
import { ToastContainer } from 'react-toastify';

function EditProduct(props) {
    const notify = () => ('Product updated');
    const [product, setProduct] = useState(props.user)

    const handler = (e) => {
        const {name, value} = e.target;
        setProduct({...product, [name]: value})
    }
    const submit = (e) => {
        e.preventDefault()
        axios.put(`https://e-commerce-be-ti14.onrender.com/admin/updateProduct/${product._id}`, product)
        .then((res) =>{
            notify()
            return (res)
        })
        .catch((error) => {
            return (error)
        })
    }
  return (
    <div className='container'>
        {/* Page Heading */}
        <div className='d-sm-flex align-items-center justify-content-between mb-4'>
            <h1 className='h3 mb-0 text-gray-800'>Edit Product</h1>
        </div>
        <form>
            <div className='form-row'>
                <div className='form-group col-md-6'>
                    <label>Product Name</label>
                    <input type="text" className='form-control' name='productName' onChange={handler} value={product.productName}></input>
                </div>
                <div className='form-group col-md-6'>
                    <label>Product Price</label>
                    <input type='text' className='form-control' name='productPrice' onChange={handler} value={product.productPrice} />
                </div>
            </div>
            <div className='form-row'>
                <div className='form-group col-md-6'>
                    <label>category</label>
                    <select className='form-control' name='category' value={product.category} onChange={handler}>
                        <option selected>Choose...</option>
                        <option>Furniture</option>
                        <option>Applicanes</option>
                        <option>Electornics</option>
                        <option>Mobiles</option>
                    </select>
                </div>
                <div className='form-group col-md-6'>
                    <label>Product Image Url</label>
                    <input type='text' className='form-control' name='productImage' onChange={handler} value={product.productImage}/>
                </div>
            </div>
            <div className='form-row'>
                <div className='form-group col-md-6'>
                    <label>Description</label>
                    <textarea type="text" className='form-control' name='description' onChange={handler} value={product.decription} placeholder='Description' />
                </div>
            </div>
            <button type='button' onClick={(e) => {submit(e)}} className='btn btn-primary' >Submit</button>
            <ToastContainer />
        </form>
    </div>
  )
}

export default EditProduct