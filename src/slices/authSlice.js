import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    // get the token from localStorage, null if it does not exist
    token: localStorage.getItem( 'token' ),
    email: null,
    authDetails: {
        isLoggedIn: false,
        id: null,
        userType: null,
        profilePhoto: null
    }
}

export const authSlice = createSlice( {
    name: 'auth',
    initialState,
    reducers: {

        // methods to manipulate user data go here

        // to set the token
        setToken: ( state, action ) => 
        {
            // set the token
            state.token = action.payload;
            // also set in localStorage
            localStorage.setItem( 'token', action.payload );
        },

        // to set email (an explicit method, since we will need email during otp verification)
        setEmail: ( state, action ) => 
        {
            // set the email
            state.email = action.payload;
        },

        setAuthDetails: ( state, action ) =>
        {
            state.authDetails = action.payload
        }
    }
} )

export default authSlice.reducer;

export const { setToken, setEmail, setAuthDetails } = authSlice.actions;