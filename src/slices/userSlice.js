import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {
        userId: null,
        email: null,
        fullName: null,
        phoneNumber: null,
        referrerId: null,
        referrerName: null,
        referrerEmail: null,
        houseNo: null,
        street: null,
        landmark: null,
        city: null,
        state: null,
        country: null,
        dateOfBirth: null
    },
    // get the token from localStorage, null if it does not exist
    token: localStorage.getItem( 'token' ),
    isLoggedIn: false,
}

export const userSlice = createSlice( {
    name: 'user',
    initialState,
    reducers: {

        // methods to manipulate user data go here

        // to set email (an explicit method, since we will need email during otp verification)
        setEmail: ( state, action ) => 
        {
            // set the email
            state.user.email = action.payload;
        },

        // to set the user data
        setUser: ( state, action ) => 
        {
            // set the user data
            state.user = action.payload;
        },

        // to set the token
        setToken: ( state, action ) => 
        {
            // set the token
            state.token = action.payload;
            // also set in localStorage
            localStorage.setItem( 'token', action.payload );
        },

        setIsLoggedIn: ( state, action ) =>
        {
            state.isLoggedIn = action.payload.isLoggedIn
        }

    }
} )

export default userSlice.reducer;

export const { setEmail, setUser, setToken, setIsLoggedIn } = userSlice.actions;