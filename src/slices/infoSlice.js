import { createSlice } from "@reduxjs/toolkit";

// to represent the information to display in the app
// can be either success or error

const initialState = {
    shouldShow: false,
    infoMsg: "",
    infoType: "success"
}

export const infoSlice = createSlice({
    name: "info",
    initialState,
    reducers: {
        setInfo: (state, action) => {
            state.shouldShow = action.payload.shouldShow
            state.infoMsg = action.payload.infoMsg
            state.infoType = action.payload.infoType
        }
    }
})

export const{setInfo} = infoSlice.actions

export default infoSlice.reducer