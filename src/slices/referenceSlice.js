import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    newReferenceRequests: [
        {
            memeberApprovalRequestId: null,
            requesterId: null,
            requesterFullName: null,
            requesterEmail: null,
        }
    ],
    approvedReferenceRequests: [
        {
            memeberApprovalRequestId: null,
            requesterId: null,
            requesterFullName: null,
            requesterEmail: null,
        }
    ],
    rejectedReferenceRequests: [
        {
            memeberApprovalRequestId: null,
            requesterId: null,
            requesterFullName: null,
            requesterEmail: null,
        }
    ],
    referrers: [
        {
            memberId: null,
            memberFullName: null,
            memberEmail: null,
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

export const { setAllReferencesRequests, setReferrers } = referenceSlice.actions
export default referenceSlice.reducer