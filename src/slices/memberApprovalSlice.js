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
            requestTime: null,
            responseDate: null,
            responseTime: null,
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
            requestTime: null,
            responseDate: null,
            responseTime: null,
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
            requestTime: null,
            responseDate: null,
            responseTime: null,
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
            state.newMemberApprovalRequests = action.payload.unresponded.content;
            state.approvedMemberApprovalRequests = action.payload.approved.content;
            state.rejectedMemberApprovalRequests = action.payload.rejected.content;
        }

    }
} )

export const { setAllMemberApprovalRequests } = memberApprovalSlice.actions

export default memberApprovalSlice.reducer;