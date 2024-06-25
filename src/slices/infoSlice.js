import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

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

            // show the toast
            if(action.payload.shouldShow)
            {
                if(action.payload.infoType==="error")
                {
                    toast.error(action.payload.infoMsg)
                }
                else
                {
                    toast.success(action.payload.infoMsg)
                }
            }
        }
    }
})

export const{setInfo} = infoSlice.actions

export default infoSlice.reducer