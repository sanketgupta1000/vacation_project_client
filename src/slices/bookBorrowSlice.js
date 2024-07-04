import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    newBorrowRequests: [
        {
            borrowRequestId: null,
            bookCopyId: null,
            bookCopyName: null,
            coverPhotoURL: null,
            requesterId: null,
            requesterName: null,
            requesterEmail: null,
            requesterProfilePhotoURL: null,
            requestDate: null,
            requestTime: null,
            responseDate: null,
            responseTime: null,
            receiveDate: null,
            receiveTime: null,
            returnDate: null,
            returnTime: null,
            status: null,
        }
    ],
    approvedBorrowRequests: [
        {
            borrowRequestId: null,
            bookCopyId: null,
            bookCopyName: null,
            coverPhotoURL: null,
            requesterId: null,
            requesterName: null,
            requesterEmail: null,
            requesterProfilePhotoURL: null,
            requestDate: null,
            requestTime: null,
            responseDate: null,
            responseTime: null,
            receiveDate: null,
            receiveTime: null,
            returnDate: null,
            returnTime: null,
            status: null,
        }
    ],
    rejectedBorrowRequests: [
        {
            borrowRequestId: null,
            bookCopyId: null,
            bookCopyName: null,
            coverPhotoURL: null,
            requesterId: null,
            requesterName: null,
            requesterEmail: null,
            requesterProfilePhotoURL: null,
            requestDate: null,
            requestTime: null,
            responseDate: null,
            responseTime: null,
            receiveDate: null,
            receiveTime: null,
            returnDate: null,
            returnTime: null,
            status: null,
        }
    ],

    // for sender
    currentBorrowRequests: [
        {
            borrowRequestId: null,
            bookCopyId: null,
            bookCopyName: null,
            coverPhotoURL: null,
            requesterId: null,
            requesterName: null,
            requesterEmail: null,
            requesterProfilePhotoURL: null,
            requestDate: null,
            requestTime: null,
            responseDate: null,
            responseTime: null,
            receiveDate: null,
            receiveTime: null,
            returnDate: null,
            returnTime: null,
            status: null,
        }
    ],
    pastBorrowRequests: [
        {
            borrowRequestId: null,
            bookCopyId: null,
            bookCopyName: null,
            coverPhotoURL: null,
            requesterId: null,
            requesterName: null,
            requesterEmail: null,
            requesterProfilePhotoURL: null,
            requestDate: null,
            requestTime: null,
            responseDate: null,
            responseTime: null,
            receiveDate: null,
            receiveTime: null,
            returnDate: null,
            returnTime: null,
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
            state.newBorrowRequests = action.payload.unresponded
            state.approvedBorrowRequests = action.payload.approved
            state.rejectedBorrowRequests = action.payload.rejected
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