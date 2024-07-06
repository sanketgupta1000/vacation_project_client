import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    newMemberApprovalRequests: [
        {
            memberApprovalRequestId: null,
            memberId: null,
            memberFullName: null,
            memberEmail: null,
            memberPhoneNumber: null,
            memberReferrerId: null,
            memberReferrerFullName: null,
            memberReferrerEmail: null,
            memberReferrerProfilePhotoURL: null,
            referrerApproval: null,
            adminApproval: null,
            requestDate: null,
            requestTime: null
        }
    ],
    approvedMemberApprovalRequests: [
        {
            memberApprovalRequestId: null,
            memberId: null,
            memberFullName: null,
            memberEmail: null,
            memberPhoneNumber: null,
            memberReferrerId: null,
            memberReferrerFullName: null,
            memberReferrerEmail: null,
            memberReferrerProfilePhotoURL: null,
            referrerApproval: null,
            adminApproval: null,
            requestDate: null,
            requestTime: null
        }
    ],

    rejectedMemberApprovalRequests: [
        {
            memberApprovalRequestId: null,
            memberId: null,
            memberFullName: null,
            memberEmail: null,
            memberPhoneNumber: null,
            memberReferrerId: null,
            memberReferrerFullName: null,
            memberReferrerEmail: null,
            memberReferrerProfilePhotoURL: null,
            referrerApproval: null,
            adminApproval: null,
            requestDate: null,
            requestTime: null
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