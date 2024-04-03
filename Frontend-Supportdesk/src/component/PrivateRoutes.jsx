import React from 'react'
import { useAuthStatus } from '../hooks/useAuthStatus'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoutes = () => {
    const {logginIn, checkingStatus} = useAuthStatus()

 if(checkingStatus){
    return(
        <h1>Loading...</h1>
    )
 }
 return logginIn?<Outlet/>:<Navigate to={"/login"}/>
}

export default PrivateRoutes