import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    newBorrowRequests: [
        {
            borrowRequestId: null,
            bookCopyId: null,
            bookCopyName: null,
            requesterId: null,
            requesterName: null,
            status: null,
        }
    ],
    approvedBorrowRequests: [
        {
            borrowRequestId: null,
            bookCopyId: null,
            bookCopyName: null,
            requesterId: null,
            requesterName: null,
            status: null,
        }
    ],
    rejectedBorrowRequests: [
        {
            borrowRequestId: null,
            bookCopyId: null,
            bookCopyName: null,
            requesterId: null,
            requesterName: null,
            status: null,
        }
    ],
}

export const bookBorrowSlice = createSlice( {
    name: 'bookBorrow',
    initialState,
    reducers: {
        setAll: ( state, action ) =>
        {
            state.newBorrowRequests = action.payload.newBorrowRequests
            state.approvedBorrowRequests = action.payload.approvedBorrowRequests
            state.rejectedBorrowRequests = action.payload.rejectedBorrowRequests
        },
    }
} )

export default bookBorrowSlice.reducer
export const { setAll } = bookBorrowSlice.actions