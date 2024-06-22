import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    newMemberApprovalRequests: [
        {
            memberApprovalRequestId: null,
            memberId: null,
            memberFullName: null,
            memberEmail: null,
            memberReferrerId: null,
            memberReferrerFullName: null,
            memberReferrerEmail: null,
            referrerApproval: null,
            adminApproval: null
        }
    ],
    approvedMemberApprovalRequests: [
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

    rejectedMemberApprovalRequests: [
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

export const memberApprovalSlice = createSlice( {
    name: 'memberApproval',
    initialState,
    reducers: {

        // methods to manipulate member approval data go here

        // method to set all requests
        setAllMemberApprovalRequests: ( state, action ) => 
        {
            state.newMemberApprovalRequests = action.payload.unresponded;
            state.approvedMemberApprovalRequests = action.payload.approved;
            state.rejectedMemberApprovalRequests = action.payload.rejected;
        }

    }
} )

export const { setAllMemberApprovalRequests } = memberApprovalSlice.actions

export default memberApprovalSlice.reducer;