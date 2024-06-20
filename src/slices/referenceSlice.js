import { createSlice } from "@reduxjs/toolkit"
import { act } from "react"

const initialState = {
    newRequests: [
        {
            memeberApprovalRequestId: null,
            requesterId: null,
            requesterFullName: null,
            requesterEmail: null,
        }
    ],
    approvedRequests: [
        {
            memeberApprovalRequestId: null,
            requesterId: null,
            requesterFullName: null,
            requesterEmail: null,
        }
    ],
    rejectedRequests: [
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
        setAllRequests: ( state, action ) =>
        {
            state.newRequests = action.payload.newRequests
            state.approvedRequests = action.payload.approvedRequests
            state.rejectedRequests = action.payload.rejectedRequests
        },

        //set all referrers of current user
        setReferrers: ( state, action ) =>
        {
            state.referrers = action.payload.referrers
        },
    }
} )

export const { setAllRequests, setReferrers } = referenceSlice.actions
export default referenceSlice.reducer