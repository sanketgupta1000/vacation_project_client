// import from bookApprovalSlice.js
import { setAllBookApprovalRequests } from "./bookApprovalSlice"
import bookApprovalReducer from "./bookApprovalSlice"

// import from bookBorrowSlice.js
import { setAllReceiverBorrowRequests, setAllSenderBorrowRequests } from "./bookBorrowSlice"
import bookBorrowReducer from "./bookBorrowSlice"

// import from bookSlice.js
import { setAvailableBooks, setUploadedBooks, setBorrowedBooks, setSingleBook, setSingleBookCopy } from "./bookSlice"
import bookReducer from "./bookSlice"

// import from infoSlice.js
import { setInfo } from "./infoSlice";
import infoReducer from "./infoSlice";

// import from loadingSlice.js
import { setLoading } from "./loadingSlice";
import loadingReducer from "./loadingSlice";

// import from memberApprovalSlice.js
import { setAllMemberApprovalRequests } from "./memberApprovalSlice";
import memberApprovalReducer from "./memberApprovalSlice";

// import from referenceSlice.js
import { setAllReferenceRequests, setReferrers } from "./referenceSlice";
import referenceReducer from "./referenceSlice";

// import from userSlice.js
import { setUser } from "./userSlice"
import userReducer from "./userSlice"

import { setToken, setEmail, setAuthDetails } from './authSlice'
import authReducer from './authSlice'

// export all reducers
export
{

    setAllBookApprovalRequests,
    bookApprovalReducer,

    setAllReceiverBorrowRequests,
    setAllSenderBorrowRequests,
    bookBorrowReducer,

    setAvailableBooks,
    setUploadedBooks,
    setBorrowedBooks,
    setSingleBook,
    setSingleBookCopy,
    bookReducer,

    setAllMemberApprovalRequests,
    memberApprovalReducer,

    setAllReferenceRequests,
    setReferrers,
    referenceReducer,

    setToken,
    setEmail,
    setAuthDetails,
    authReducer,

    setUser,
    userReducer,

    setLoading,
    loadingReducer,

    setInfo,
    infoReducer,
}