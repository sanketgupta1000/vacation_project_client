import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    newReferenceRequests: [
        {
            memberApprovalRequestId: null,
            memberId: null,
            memberFullName: null,
            memberEmail: null,
            memberPhoneNumber: null,
            requestDate: null,
            requestTime: null,
        }
    ],
    approvedReferenceRequests: [
        {
            memberApprovalRequestId: null,
            memberId: null,
            memberFullName: null,
            memberEmail: null,
            memberPhoneNumber: null,
            requestDate: null,
            requestTime: null,
        }
    ],
    rejectedReferenceRequests: [
        {
            memberApprovalRequestId: null,
            memberId: null,
            memberFullName: null,
            memberEmail: null,
            memberPhoneNumber: null,
            requestDate: null,
            requestTime: null,
        }
    ],
    referrers: [
        {
            memberId: null,
            memberFullName: null,
            memberEmail: null,
            memberProfilePhotoURL: null
        }
    ]
}

export const referenceSlice = createSlice( {
    name: 'referenceRequests',
    initialState,
    reducers: {

        //set all requests
        setAllReferenceRequests: ( state, action ) =>
        {
            state.newReferenceRequests = action.payload.newRequests
            state.approvedReferenceRequests = action.payload.approvedRequests
            state.rejectedReferenceRequests = action.payload.rejectedRequests
        },

        //set all referrers of current user
        setReferrers: ( state, action ) =>
        {
            state.referrers = action.payload.referrers
        },
    }
} )

export const { setAllReferenceRequests, setReferrers } = referenceSlice.actions
export default referenceSlice.reducer