import React, { useContext, useEffect} from 'react'
import { FaHome, FaList, FaPlus, FaUserAlt, FaUserCircle } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import FontAwesomeIcon from "font-awesome-icons"
import axios from 'axios'
import Mycontext from '../../Context'
import user from '../Assets/user.svg'


function Usernav(props) {
    const {userdata, item, setItem} = useContext(Mycontext)
    
    useEffect(() =>{
      const email = { email: userdata.email }
      axios.post('https://e-commerce-be-ti14.onrender.com/user/cart', email)
        .then(res => {
          setItem(res.data)
        })
        .catch(error => {
          return(error)
        })
    },[userdata.email, setItem])

    const logout = () => {
      window.localStorage.clear()
      window.location.reload()
    }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-white fixed-top">
        <div className='container mt-2'>
          <h2 className='text-info text-decoration-none'>E-Commerce</h2>
          <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarNavDropdown' aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className='navbar-toggler-icon'></span>
          </button>
          <dov className="navbar-collapse collapse" id='navbarNavDropdown'>

            {!userdata.name ? 
              <ul className='navbar-nav mx-4 ml-auto'>
                <li className='mx-3'>
                  <Link to='/' className='nav-link'><FaHome className='mx-1' />Home</Link>
                </li>
                <li className='mx-3'>
                  <Link to='/login' className='nav-link text-black'>
                    <FaUserCircle className='mx-1'/>Login
                  </Link>
                </li>
                <li className='mx-3'>
                  <Link to='/register'className='nav-link'>
                  <FaUserAlt className='mx-1' />Register
                  </Link>
                </li>
              </ul> : 
              <ul className='navbar-nav mx-4 ml-auto'>
                <li className='mx-3'>
                  <Link to='/' className='nav-link'>
                  <FaHome className='mx-1'/>Home
                  </Link>
                </li>
                <li className='nav-item mx-3'>
                  <Link to='/cart' className='nav-link'>
                  <FontAwesomeIcon icon="fa-light fa-cart-shopping" aria-hidden="true"><span className='supertext'>{item.length}</span></FontAwesomeIcon>
                  </Link>
                </li>
                <li className='nav-item dropdown no-arrow'>
                  <a className='nav-link dropdown-toggle' href='/' id='userDropdown' role='button' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span className='mr-2 d-none d-ld-inline'>{userdata.name}</span>
                    <img className='img-profile rounded-circle' height={'25px'} width={'25px'} src={user} alt='...' />
                  </a>
                  {/* Dropdown - User Information */}
                  <div className='dropdown-menu dropdown-menu-right shadow animated--grow-in' aria-labelledby='userDropdown'>
                    {userdata.role === 'admin'  ? 
                      <div><Link to='/admin/dashboard' className='dropdown-item' href='/'>
                          <i className='fas fa-cogs fa-sm fa-fw mr-2 text-gray-400'></i>
                          Dashboard
                        </Link>
                        <Link to='/admin/addproduct' className='dropdown-item'>
                          <FaPlus className='mr-2 text-gray-400' />
                          Add Product
                        </Link>
                        <Link to='/admin/userdetails' className='dropdown-item'>
                          <FaList className='mr-2 text-gray-400' />
                          Order List
                         </Link>
                      </div> : 
                      <Link to='/myorder' className='dropdown-item' href='/'>
                        <i className='fas fa-shopping-cart fa-sm fa-fw mr-2 text-gray-400' ></i>
                        My Orders
                      </Link>
                    }
                    <div className='dropdown-divider'></div>
                    <Link to='/' className='dropdown-item' href='/' data-toggler='modal' data-target="#logoutModal" onClick={logout} >
                      <i className='fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-200' />
                      Logout
                    </Link>
                  </div>
                </li>
              </ul>
            }
          </dov>
        </div>
      </nav>
    </div>
  )
}

export default Usernav