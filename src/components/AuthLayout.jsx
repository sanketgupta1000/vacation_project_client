import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { setLoading } from '../slices'

const AuthLayout = (
    {
        children,
        authentication = 'all'
    }
) => 
{
    const navigate = useNavigate()
    const isLoggedIn = useSelector(state => state.user.isLoggedIn)

    useEffect(()=>
        {
            // set loading state
            dispatch(setLoading({isLoading: true, loadingMsg: 'Loading data...'}))

            // if authentication is required and user is not logged in
            if(authentication=='authenticated' && !isLoggedIn)
            {
                // redirect to login page
                navigate("/login")
            }
            // if authentication is not required and user is logged in
            else if(authentication=='unauthenticated' && isLoggedIn)
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