import React, { useContext } from 'react'
import Mycontext from '../../Context';

function Filter({data}) {
    const {records, setRecords} = useContext(Mycontext);

    const handle = (e) => {
        const arr = document.getElementById("price").ariaValueMax.split(' ')
        const filter = data.filter((item) => item.productPrice >= (+arr[1]) && item.productPrice <=(+arr[4]))
        setRecords(filter)
    }
    const clear = ()=>{
        setRecords(data)
    }
    const handleRating = (e) =>{
        const filter = data.filter((item) => item.rating >=(+e.target.value))
        setRecords(filter)
    }

    const handleChange = (e) =>{
        if(e.target.value === '1'){
            records.sort((a,b) => b.rating-a.rating)
            setRecords([...records])
        }else if(e.target.value === '2'){
            records.sort((a,b) => a.productPrice-b.productPrice)
            setRecords([...records])
        }else{
            records.sort((a,b) => b.productPrice-a.productPrice)
            setRecords([...records])
        }
    }
  return (
    <>
    <div className='row d-flex flex-column p-2 mb-2' style={{ backgroundColor: '#ffb300'}}>
        <h6>Filter</h6>
        <h6>By Price</h6>
        <select style={{ width:'80%'}} id='price'>
            <option selected>Select</option>
            <option>Rs.0 - Rs.1000</option>
            <option>Rs.1000 - Rs.5000</option>
            <option>Rs.5000 - Rs.10000</option>
            <option>Rs.10000 - Rs.50000</option>
            <option>Rs.50000 - Rs.200000</option>
        </select>
        <div className='d-flex justify-content-between mt-3'>
            <button className='btn btn-primary' onClick={clear} >Clear</button>
            <button className='btn  btn0-primary' onClick={handle} >Apply</button>
        </div>
    </div>
    <div className='row d-flex flex-column p-2 mb-2' style={{backgroundColor: '#ffb300'}}>
        <h6>Filter By Rating</h6>
        <div className='d-flex flex-column'>
            <span><input className='mx-2' type='Radio' name='rate' value='4' onClick={handleRating} />4 & above</span>
            <span><input className='mx-2' type='Radio' name='rate' value='3' onClick={handleRating} />3 & above</span>
            <span><input className='mx-2' type='Radio' name='rate' value='2' onClick={handleRating} />2 & above</span>
            <span><input className='mx-2' type='Radio' name='rate' value='1' onClick={handleRating} />1 & above</span>
        </div>
        <div className='d-flex justify-content-end'>
            <button className='btn btn-primary' onClick={clear} >Clear</button>
        </div>
    </div>
    <div className='row d-flex flex-column p-2 mb-4' style={{ backgroundColor: '#ffb300'}}>
        <h6>Sort By</h6>
        <div className='d-flex flex-column'>
            <span><input className='mx-2' type='Radio' name='sorty' value='1' onClick={handleChange} />Popularity</span>
            <span><input className='mx-2' type='Radio' name='sorty' value='2' onClick={handleChange} />Price -- Low to High</span>
            <span><input className='mx-2' type='Radio' name='sorty' value='3' onClick={handleChange} />Price -- High to Low</span>
        </div>
    </div>
    </>
  )
}

export default Filter