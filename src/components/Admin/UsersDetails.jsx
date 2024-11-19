import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaArrowUp, FaFolderOpen, FaRegTrashAlt } from 'react-icons/fa'

function UsersDetails(props) {
    const [users, setUsers] = useState([])
    const [data, setData] = useState('')

    const dateChange = (orders) => {
        const newData = orders.map((item) => {
            return{
                ...item, orderedDate: new Date(item.orderedDate).toLocaleString()
            }
        })
        setUsers(newData)
    }

    useEffect(() => {
        axios.get('http://localhost:3001/admin/users')
        .then((res) => {
            const {data} = res
            dateChange(data)
        })
        .catch((error) => {
            return(error)
        })
    },[])

    const updateUser = (id) => {
        const value = {status: document.getElementById('Status').value,
            id:id
        }
        axios.post('https://e-commerce-be-ti14.onrender.com/admin/updateStatus', value)
        .then((res) => {
            const {data} = res.data;
            data.map(item => item.orderId === id ? item.status=value.status: null)
            dateChange(data) 
        })
        .catch((error) => {
            return (error)
        })
    }

    const deleteUser = (id) => {
        axios.delete(`https://e-commerce-be-ti14.onrender.com/user/deleteUser/${id}`)
        .then((res) => {
            if(res.data.deletedCount === 1) {
                setUsers(users.filter((user) => user._id !== id))
            }
        })
        .catch((error) => {
            return (error)
        })
    }
  return (
    <div className='container'>
        <h4>Customers</h4>
        <table className='table table-striped table-responsive'>
            <thead>
                <tr className='text-center'>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Status</th>
                    <th></th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {users.map((items) => {
                    return (
                        <tr key={items._id} className='text-center' style={{fontSize:'13px'}}>
                            <td>{items.userName}</td>
                            <td>{items.userEmail}</td>
                            <td>{items.productName}</td>
                            <td>{items.quantity}</td>
                            <td style={{ fontWeight:'bold'}}>
                                {items.status === "Order placed" ? <span style={{ color:'darksalmon'}}>{items.status}</span>  : <span style={{ color: 'darkgoldenrod' }}>{items.status}</span>}
                            </td>
                            <td className='status-area'>
                                <select id="status">
                                    <option>Order placed</option>
                                    <option>In Transist</option>
                                    <option>Delivered</option>
                                    <option>Returned</option>
                                </select>
                                <button type='button' className='btn btn-warning' style={{padding: '0.1rem 0.2rem'}} onClick={() => updateUser(items.orderId)}><FaArrowUp/></button>
                            </td>
                            <td>
                                <button className='btn btn-warning' data-toggle="modal" data-target="#exampleModal" onClick={() => setData(items)}><FaFolderOpen /></button>
                                <button className='btn btn-warning mx-2' onClick={() => deleteUser(items._id)} ><FaRegTrashAlt /></button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
        <div className='modal fade' id='exampleModal' tabindex='-1' role='dialog' aria-labelledby='exampleModalLabel' aria-hidden="true">
            <div className='modal-dialog' role='document'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <h5 className='modal-title' id='exampleModalLabel' >Order Details</h5>
                        <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className='modal-body'>
                        <div className='d-flex-column mx-3'>
                            <div className='d-flex justify-content-between'>
                                <label>Product Name</label>
                                <span>{data.productName}</span>
                            </div>
                            <div className='d-flex justify-content-between'>
                                <label>User</label>
                                <span>{data.userName}</span>
                            </div>
                            <div className='d-flex justify-content-between'>
                                <label>Email</label>
                                <span>{data.userEmail}</span>
                            </div>
                            <div className='d-flex justify-content-between'>
                                <label>Ordered On</label>
                                <span>{data.orderedDate}</span>
                            </div>
                            <div className='d-flex justify-content-between'>
                                <label>Delivery address</label>
                                <span>{data.deliveryAddress}</span>
                            </div>
                            <div className='d-flex justify-content-between'>
                                <label>Payment</label>
                                <span style={{ color:'green', fontWeight:'bold'}}>{data.payment}</span>
                            </div>
                            <div className='d-flex justify-content-between'>
                                <label>Status</label>
                                <span>{data.status}</span>
                            </div>
                        </div>
                    </div>
                    <div className='modal-footer'>
                        <button type='button' className='btn btn-secondary' data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default UsersDetails