import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {
        userId: "",
        email: "",
        fullName: "",
        userType: "",
        phoneNumber: "",
        referrerId: "",
        referrerName: "",
        referrerEmail: "",
        houseNo: "",
        street: "",
        landmark: "",
        city: "",
        state: "",
        country: "",
        dateOfBirth: ""
    },
}

export const userSlice = createSlice( {
    name: 'user',
    initialState,
    reducers: {
        // to set the user data
        setUser: ( state, action ) => 
        {
            // set the user data
            state.user = action.payload;
        }
    }
} )

export default userSlice.reducer;

export const { setUser } = userSlice.actions;