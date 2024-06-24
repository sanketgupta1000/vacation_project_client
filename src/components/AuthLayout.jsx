import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { setLoading } from '../slices'

const AuthLayout = (
    {
        children,
        authentication = false,
        allowedUserTypes = []
    }
) => 
{
    const navigate = useNavigate()
    const isLoggedIn = useSelector(state => state.auth.authDetails.isLoggedIn)
    const userType = useSelector(state => state.auth.authDetails.userType)
    const dispatch = useDispatch()

    useEffect(()=>
        {
            // set loading state
            dispatch(setLoading({isLoading: true, loadingMsg: 'Loading data...'}))
            
            if(authentication)
            {
                if(!isLoggedIn)
                {
                    // authentication required but user is not logged in
                    navigate("/login")
                }
                else if(!allowedUserTypes.includes(userType))
                {
                    // user is logged in but not of allowed user type
                    navigate("/")
                }
            }
            // if authentication is not required and user is logged in
            else if(!authentication && isLoggedIn)
            {
                // redirect to home page
                navigate("/")
            }
            
            // set loading state
            dispatch(setLoading({isLoading: false, loadingMsg: ''}))
    
        }, [isLoggedIn])
  return(
    <>
        {children}
    </>
  )
}

export default AuthLayout