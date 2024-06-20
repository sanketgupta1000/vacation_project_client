import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    availableBooks: [
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
    uploadedBooks: [
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
    borrowedBooks: [
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
    singleBook: {
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
        bookCopies: [
            {
                bookCopyId: null,
                holderId: null,
                holderName: null,
                borrowerId: null,
                borrowerName: null,
                requestable: null,
            }
        ]
    },
    singleBookCopy: {
        bookCopyId: null,
        bookId: null,
        bookTitle: null,
        holderId: null,
        holderName: null,
        borrowerId: null,
        borrowerName: null,
        requestable: null,
        bookTransactions: [
            {
                transactionId: null,
                bookGiverId: null,
                bookGiverFullName: null,
                bookGiverEmail: null,
                bookReceiverId: null,
                bookReceiverFullName: null,
                bookReceiverEmail: null,
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
            state.singleBook = action.payload.singleBook
        },

        setSingleBookCopy: ( state, action ) =>
        {
            state.singleBookCopy = action.payload.singleBookCopy
        },
    }
} )

export default bookSlice.reducer
export const { setAvailableBooks, setUploadedBooks, setBorrowedBooks, setSingleBook, setSingleBookCopy } = bookSlice.actions