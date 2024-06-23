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

    // for sender
    currentBorrowRequests: [
        {
            borrowRequestId: null,
            bookCopyId: null,
            bookCopyName: null,
            requesterId: null,
            requesterName: null,
            status: null,
        }
    ],
    pastBorrowRequests: [
        {
            borrowRequestId: null,
            bookCopyId: null,
            bookCopyName: null,
            requesterId: null,
            requesterName: null,
            status: null,
        }
    ]
}

export const bookBorrowSlice = createSlice( {
    name: 'bookBorrow',
    initialState,
    reducers: {
        setAllReceiverBorrowRequests: ( state, action ) =>
        {
            state.newBorrowRequests = action.payload.newBorrowRequests
            state.approvedBorrowRequests = action.payload.approvedBorrowRequests
            state.rejectedBorrowRequests = action.payload.rejectedBorrowRequests
        },

        setAllSenderBorrowRequests: ( state, action ) =>
        {
            state.currentBorrowRequests = action.payload.currentBorrowRequests
            state.pastBorrowRequests = action.payload.pastBorrowRequests
        
        }
    }
} )

export default bookBorrowSlice.reducer
export const { setAllReceiverBorrowRequests, setAllSenderBorrowRequests } = bookBorrowSlice.actions