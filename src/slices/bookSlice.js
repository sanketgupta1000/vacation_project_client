import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    availableBooks: [
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
    uploadedBooks: [
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
    borrowedBooks: [
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
    singleBook: {
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
        bookUploadDate: null,
        bookUploadTime: null,
        bookCopies: [
            {
                bookCopyId: null,
                holderId: null,
                holderName: null,
                holderEmail: null,
                holderProfilePhotoURL: null,
                borrowerId: null,
                borrowerName: null,
                borrowerEmail: null,
                borrowerProfilePhotoURL: null,
                requestable: null,
            }
        ]
    },
    singleBookCopy: {
        bookCopyId: null,
        bookId: null,
        bookTitle: null,
        coverPhotoURL: null,
        bookUploadDate: null,
        bookUploadTime: null,
        holderId: null,
        holderName: null,
        holderEmail: null,
        holderProfilePhotoURL: null,
        borrowerId: null,
        borrowerName: null,
        borrowerEmail: null,
        borrowerProfilePhotoURL: null,
        requestable: null,
        canHandover: null,
        bookCopyTransactions: [
            {
                transactionId: null,
                bookGiverId: null,
                bookGiverFullName: null,
                bookGiverEmail: null,
                bookGiverProfilePhotoURL: null,
                bookReceiverId: null,
                bookReceiverFullName: null,
                bookReceiverEmail: null,
                bookReceiverProfilePhotoURL: null,
                transactionDate: null,
                transactionTime: null,
            }
        ]
    }
}

export const bookSlice = createSlice( {
    name: 'book',
    initialState,
    reducers: {

        //set available books 
        setAvailableBooks: ( state, action ) =>
        {
            state.availableBooks = action.payload.availableBooks
        },

        //set available books 
        setUploadedBooks: ( state, action ) =>
        {
            state.availableBooks = action.payload.availableBooks
        },

        //set available books 
        setBorrowedBooks: ( state, action ) =>
        {
            state.availableBooks = action.payload.availableBooks
        },

        //set data for a single book 
        setSingleBook: ( state, action ) => 
        {
            state.singleBook = action.payload
        },

        setSingleBookCopy: ( state, action ) =>
        {
            state.singleBookCopy = action.payload
        },
    }
} )

export default bookSlice.reducer
export const { setAvailableBooks, setUploadedBooks, setBorrowedBooks, setSingleBook, setSingleBookCopy } = bookSlice.actions