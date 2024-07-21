import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    newBookApprovalRequests: [
        {
            bookId: null,
            bookTitle: null,
            bookAuthor: null,
            bookPageCount: null,
            bookQuantity: null,
            coverPhotoURL: null,
            bookCategoryId: null,
            bookCategoryName: null,
            bookApprovalStatus: null,
            bookOwnerId: null,
            bookOwnerName: null,
            bookOwnerEmail: null,
            bookOwnerProfilePhotoURL: null,
            bookRequestDate: null,
            bookRequestTime: null,
            bookUploadDate: null,
            bookUploadTime: null
        }
    ],
    approvedBookApprovalRequests: [
        {
            bookId: null,
            bookTitle: null,
            bookAuthor: null,
            bookPageCount: null,
            bookQuantity: null,
            coverPhotoURL: null,
            bookCategoryId: null,
            bookCategoryName: null,
            bookApprovalStatus: null,
            bookOwnerId: null,
            bookOwnerName: null,
            bookOwnerEmail: null,
            bookOwnerProfilePhotoURL: null,
            bookRequestDate: null,
            bookRequestTime: null,
            bookUploadDate: null,
            bookUploadTime: null
        }
    ],
    rejectedBookApprovalRequests: [
        {
            bookId: null,
            bookTitle: null,
            bookAuthor: null,
            bookPageCount: null,
            bookQuantity: null,
            coverPhotoURL: null,
            bookCategoryId: null,
            bookCategoryName: null,
            bookApprovalStatus: null,
            bookOwnerId: null,
            bookOwnerName: null,
            bookOwnerEmail: null,
            bookOwnerProfilePhotoURL: null,
            bookRequestDate: null,
            bookRequestTime: null,
            bookUploadDate: null,
            bookUploadTime: null
        }
    ],
}

export const bookApprovalSlice = createSlice( {
    name: 'bookApproval',
    initialState,
    reducers: {

        // method to set all requests
        setAllBookApprovalRequests: ( state, action ) => 
        {
            state.newBookApprovalRequests = action.payload.unresponded.content
            state.approvedBookApprovalRequests = action.payload.approved.content
            state.rejectedBookApprovalRequests = action.payload.rejected.content
        }

    }
} )

export default bookApprovalSlice.reducer;

export const { setAllBookApprovalRequests } = bookApprovalSlice.actions;