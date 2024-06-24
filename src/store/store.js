import { configureStore } from "@reduxjs/toolkit";
import
{
    bookApprovalReducer,
    bookBorrowReducer,
    bookReducer,
    infoReducer,
    loadingReducer,
    memberApprovalReducer,
    referenceReducer,
    userReducer,
    authReducer,
} from "../slices";

// create store
const store = configureStore( {
    reducer: {
        bookApproval: bookApprovalReducer,
        bookBorrow: bookBorrowReducer,
        book: bookReducer,
        info: infoReducer,
        loading: loadingReducer,
        memberApproval: memberApprovalReducer,
        reference: referenceReducer,
        user: userReducer,
        auth: authReducer,
    }
} )

export default store