import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    newRequests: [
        {
            bookId: null,
            bookTitle: null,
            bookAuthor: null,
            bookPageCount: null,
            bookQuantity: null,
            bookCategoryId: null,
            bookCategoryName: null,
            bookApprovalStatus: null,
            bookOwnerId: null,
            bookOwnerName: null,
        }
    ],
    approvedRequests: [
        {
            bookId: null,
            bookTitle: null,
            bookAuthor: null,
            bookPageCount: null,
            bookQuantity: null,
            bookCategoryId: null,
            bookCategoryName: null,
            bookApprovalStatus: null,
            bookOwnerId: null,
            bookOwnerName: null,
        }
    ],
    rejectedRequests: [
        {
            bookId: null,
            bookTitle: null,
            bookAuthor: null,
            bookPageCount: null,
            bookQuantity: null,
            bookCategoryId: null,
            bookCategoryName: null,
            bookApprovalStatus: null,
            bookOwnerId: null,
            bookOwnerName: null,
        }
    ]
}

export const bookApprovalSlice = createSlice({
    name: 'bookApproval',
    initialState,
    reducers: {

        // method to set all requests
        setAll: (state, action) => 
            {
                state.newRequests = action.payload.unresponded;
                state.approvedRequests = action.payload.approved;
                state.rejectedRequests = action.payload.rejected;
            }

    }
})

export default bookApprovalSlice.reducer;

export const { setAll } = bookApprovalSlice.actions;