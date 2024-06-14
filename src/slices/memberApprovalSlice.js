import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    newRequests: [
        {
            memberApprovalRequestId: null,
            membrrId: null,
            memberFullName: null,
            memberEmail: null,
            memberReferrerId: null,
            memberReferrerFullName: null,
            memberReferrerEmail: null,
            referrerApproval: null,
            adminApproval: null
        }
    ],
    approvedRequests: [
        {
            memberApprovalRequestId: null,
            membrrId: null,
            memberFullName: null,
            memberEmail: null,
            memberReferrerId: null,
            memberReferrerFullName: null,
            memberReferrerEmail: null,
            referrerApproval: null,
            adminApproval: null
        }
    ],
    rejectedRequests: [
        {
            memberApprovalRequestId: null,
            membrrId: null,
            memberFullName: null,
            memberEmail: null,
            memberReferrerId: null,
            memberReferrerFullName: null,
            memberReferrerEmail: null,
            referrerApproval: null,
            adminApproval: null
        }
    ],
}

export const memberApprovalSlice = createSlice({
    name: 'memberApproval',
    initialState,
    reducers: {

        // methods to manipulate member approval data go here

        // method to set all requests
        setAll: (state, action) => 
            {
                state.newRequests = action.payload.unresponded;
                state.approvedRequests = action.payload.approved;
                state.rejectedRequests = action.payload.rejected;
            }

    }
})