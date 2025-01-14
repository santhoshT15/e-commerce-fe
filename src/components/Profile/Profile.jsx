import React, { useState } from 'react'
import Usernav from '../LandingPage/Usernav'
import './Profile.css'

function Profile(props) {
    const [user, setUser] = useState(props.userdata)
    const handler = (e) =>{
      const { name, value } = e.target;
      setUser({...user, [name] : value})
    }
    const edit = (e) => {
      e.preventDefault()
      const btn = document.getElementById('editbutton')
      btn.style.display = 'none'
    }

  return (
    <div>
      <Usernav />
      <div className='container'>
        <h3 className='mt-4'>Profile</h3>
        <div className='card mt-4'>
          <form>
            <div className='d-flex justify-content-end'>
              <button id='editbutton' onClick={edit} className='btn btn-primary'>Sign In</button>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label for="inputEmail4">Email</label>
                <input type="email" className="form-control" value={props.userdata.email} onChange={(e)=>{handler(e)}} name='email'  placeholder="Email"/>
              </div>
              <div className="form-group col-md-6">
                <label >Name</label>
                <input type="text" className="form-control" value={props.userdata.name} onChange={handler} name='name' placeholder="Name"/>
              </div>
            </div>
            <div className="form-group">
              <label >Address</label>
              <input type="text" className="form-control" name='address'  value={props.userdata.email} onChange={handler}  placeholder="1234 Main St"/>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label >City</label>
                <input type="text" className="form-control" onChange={handler} name='city'/>
              </div>
              <div className="form-group col-md-4">
                <label >State</label>
                <select  className="form-control" onChange={handler} name='state'>
                  <option selected>Choose...</option>
                  <option>...</option>
                </select>
              </div>
              <div className="form-group col-md-2">
                <label >Zip</label>
                <input type="text" className="form-control" onChange={handler} name='zip'/>
              </div>
            </div>
          </form>

        </div>
        
      </div>
    </div>
  )
}

export default Profile