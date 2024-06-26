import React from 'react'
import {Button, UserAvatar} from "./"
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '../slices'
import { setInfo } from '../slices/infoSlice'
import { useNavigate } from 'react-router-dom'
import { memberApprovalService } from '../services'

// a general card component to display a member approval request
// will be used on MemberApprovalRequestsPage, as well as ReferralsPage
function MemberApprovalRequestCard({
    memberApprovalRequest,
    // should the referrer info be displayed?
    showReferrerInfo = false,
    // should the admin approval status be displayed?
    showAdminApproval = false,
    // should the accept/reject actions for admin be displayed?
    showAdminActions = false,
    // should the accept/reject actions for referrer be displayed?
    showReferrerActions = false,
    // fetch Data function
    fetchData
})
{

    // dispatcher
    const dispatch = useDispatch()

    // navigator
    const navigate = useNavigate()

    // jwt token
    const jwt = useSelector(state=>state.auth.token)

    // handle admin accept
    async function handleAdminAccept()
    {
        // start loading
        dispatch(setLoading({isLoading: true, loadingMsg: "Accepting member approval request..."}))

        try
        {
    
            // call the service to accept the member approval request
            const response = await memberApprovalService
                .approveMemberApprovalRequestFromAdmin(memberApprovalRequest.memberApprovalRequestId, jwt)

            // throwing custom status exceptions, other than cors and rejected promises
            if(!response.ok)
            {
                throw new Error(await response.json())
            }

            // show success message
            dispatch(setInfo({shouldShow: true, infoMsg: await response.text(), infoType: "success"}))
            
            // fetch data
            fetchData()
        }
        catch(error)
        {
            dispatch(setInfo({shouldShow: true, infoMsg: error.message, infoType: "error"}))
        }
        finally
        {
            // stop loading
            dispatch(setLoading({isLoading: false, loadingMsg: ""}))
        } 
    }

    // handle admin reject
    async function handleAdminReject()
    {
        // start loading
        dispatch(setLoading({isLoading: true, loadingMsg: "Rejecting member approval request..."}))

        try
        {
    
            // call the service to reject the member approval request
            const response = await memberApprovalService
                .rejectMemberApprovalRequestFromAdmin(memberApprovalRequest.memberApprovalRequestId, jwt)

            // throwing custom status exceptions, other than cors and rejected promises
            if(!response.ok)
            {
                throw new Error(await response.json())
            }

            // show success message
            dispatch(setInfo({shouldShow: true, infoMsg: await response.text(), infoType: "success"}))

            // fetch data
            fetchData()
        }
        catch(error)
        {
            dispatch(setInfo({shouldShow: true, infoMsg: error.message, infoType: "error"}))
        }
        finally
        {
            // stop loading
            dispatch(setLoading({isLoading: false, loadingMsg: ""}))
        } 
    }

    // handle referrer accept
    async function handleReferrerAccept()
    {
        // start loading
        dispatch(setLoading({isLoading: true, loadingMsg: "Accepting referral request..."}))

        try
        {
    
            // call the service to accept the member approval request
            const response = await memberApprovalService
                .approveMemberApprovalRequestFromReference(memberApprovalRequest.memberApprovalRequestId, jwt)

            // throwing custom status exceptions, other than cors and rejected promises
            if(!response.ok)
            {
                throw new Error(await response.json())
            }

            // show success message
            dispatch(setInfo({shouldShow: true, infoMsg: await response.text(), infoType: "success"}))

            // fetch data
            fetchData()
        }
        catch(error)
        {
            dispatch(setInfo({shouldShow: true, infoMsg: error.message, infoType: "error"}))
        }
        finally
        {
            // stop loading
            dispatch(setLoading({isLoading: false, loadingMsg: ""}))
        } 
    }

    // handle referrer reject
    async function handleReferrerReject()
    {
        // start loading
        dispatch(setLoading({isLoading: true, loadingMsg: "Rejecting referral request..."}))

        try
        {
    
            // call the service to reject the member approval request
            const response = await memberApprovalService
                .rejectMemberApprovalRequestFromReference(memberApprovalRequest.memberApprovalRequestId, jwt)

            // throwing custom status exceptions, other than cors and rejected promises
            if(!response.ok)
            {
                throw new Error(await response.json())
            }

            // show success message
            dispatch(setInfo({shouldShow: true, infoMsg: await response.text(), infoType: "success"}))

            // fetch data
            fetchData()
        }
        catch(error)
        {
            dispatch(setInfo({shouldShow: true, infoMsg: error.message, infoType: "error"}))
        }
        finally
        {
            // stop loading
            dispatch(setLoading({isLoading: false, loadingMsg: ""}))
        } 
    }


    return (


        <div className="bg-white shadow-md rounded-lg p-4 m-10">

            {/* member info */}
            <div>
                <h1 className='text-2xl font-bold mb-2'>{memberApprovalRequest.memberFullName}</h1>
                <p className='text-gray-500 mb-4'>{memberApprovalRequest.memberEmail}</p>
            </div>

            {/* referrer info */}
            {showReferrerInfo && (memberApprovalRequest.memberReferrerId!=null) && (

                <div>
                    <p className='text-gray-500 mb-2'>Referred By</p>
                    <UserAvatar
                        user={{

                            id: memberApprovalRequest.memberReferrerId,
                            name: memberApprovalRequest.memberReferrerFullName,
                            email: memberApprovalRequest.memberReferrerEmail,
                        }}
                    />
                </div>
            )}

            {/* admin approval status */}
            {showAdminApproval && (
                <div>
                    <p className='text-gray-500 mb-4'>Admin Approval: {memberApprovalRequest.adminApproval}</p>
                </div>
            )}

            {/* admin actions */}
            {showAdminActions && (
                <div>
                    <Button
                        color='green'
                        handleClick={handleAdminAccept}
                    >
                        Accept
                    </Button>

                    <Button
                        color='red'
                        handleClick={handleAdminReject}
                    >
                        Reject
                    </Button>
                </div>
            )}

            {/* referrer actions */}
            {showReferrerActions && (
                <div>
                    <Button
                        color='green'
                        handleClick={handleReferrerAccept}
                    >
                        Accept
                    </Button>

                    <Button
                        color='red'
                        handleClick={handleReferrerReject}
                    >
                        Reject
                    </Button>
                </div>
            )}

        </div>


    )


}


export default MemberApprovalRequestCard