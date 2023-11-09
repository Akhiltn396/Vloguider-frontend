import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoutes = ({isAuthenticated,children}) => {
    if(!isAuthenticated){
        return <Navigate to="/login"  />    }
      return children

}

export default ProtectedRoutes
