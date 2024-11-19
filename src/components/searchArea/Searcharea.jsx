import React, { useContext, useState } from 'react'
import Mycontext from '../../Context';
import { Link } from 'react-router-dom';

function Searcharea({product, categoryitem}) {
    const {setRecords, userdata} = useContext(Mycontext)
    const [category, setCategory] = useState('')
    const handleChange = (e) => {
        const searchcon = (e.target.value).toLowercase();
        setRecords(product.filter(item => item.productName.toLowercase().includes(searchcon)))
    }
    const categoryList = (e) => {
        setCategory(e.target.value)
    }
  return (
    <div className='row'>
            <div className='col-12 col-md-8'>
                <form className="d-flex ml-auto"> <input className="form-control mr-2" type="search" placeholder={`Search in ${categoryitem}`} onChange={handleChange}></input>
                    <select className="form-control" id='category' onChange={categoryList} >
                        <option selected>Choose...</option>
                        <option>Mobiles</option>
                        <option>Furniture</option>
                        <option>Electronics</option>
                        <option>Appliances</option>
                        

                    </select>
                   {userdata.role !=='admin' ? <Link to={`/category/${category}`} className="btn btn-outline-success mx-2" type="submit"  >Search</Link>:
                   <Link  to={`/admin/category/${category}`} className="btn btn-outline-success mx-2" type="submit"  >Search</Link>} </form>
            </div>

        </div>
  )
}

export default Searcharea