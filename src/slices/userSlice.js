import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {
        userId: null,
        email: null,
        fullName: null,
        phoneNumber: null,
        userType: null,
        dateOfBirth: null,
        profilePhotoURL: null,
        houseNo: null,
        street: null,
        landmark: null,
        city: null,
        state: null,
        country: null,
        referrerId: null,
        referrerName: null,
        referrerEmail: null,
        referrerProfilePhotoURL: null,
        joinDate: null,
        joinTime: null,
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