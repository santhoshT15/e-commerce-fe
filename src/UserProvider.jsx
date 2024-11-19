import React, { useEffect, useState } from 'react'
import Mycontext from './Context'
import axios from 'axios'


const UserProvider= ({children}) => {
    const [item, setItem] = useState([])
    const [user, setUser] = useState({})
    const [records, setRecords] = useState([])

    useEffect(() => {
        const userToken = {
            token : window.localStorage.getItem('admintoken')
        }
        if(!userToken.token){
            userToken.token = window.localStorage.getitem('usertoken')
        }
        axios.post('https://e-commerce-be-ti14.onrender.com/user/verifylogin',userToken)
            .then((res) =>{
                const { data } = res
                setUser(data)
            })
            .catch((error) =>{
                return (error)
            })
    },[])
  return (
    <Mycontext.Provider value={{item, setItem, user, records, setRecords}}>{children}</Mycontext.Provider>
  )
}

export default UserProvider