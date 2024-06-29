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
<>

        {/* new card start */}

        {/* <div class=" h-[40vh] w-[100vw] mx-auto  bg-slate-950 text-white">
  <div class="card-wrapper h-[200px] w-[70%] mx-auto  ">
    <div class="card-content  text-xl text-yellow-700 mt-3 mb-3" >
    <p className=" px-6 font-bold">
                {memberApprovalRequest.memberEmail}
                </p> 


                <div class="justify-between mt-4">
        {showReferrerInfo && (

            {/* member info */}
            {/* <div>
                <h1 className='text-2xl font-bold mb-2'>{memberApprovalRequest.memberFullName}</h1>
                <p className='text-gray-500 mb-4'>{memberApprovalRequest.memberEmail}</p>
            </div>

            {/* referrer info */}
            {/* {showReferrerInfo && (memberApprovalRequest.memberReferrerId!=null) && (

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

{showAdminApproval && (
                <div>
                    <p className='text-gray-500 mb-4'>Admin Approval: {memberApprovalRequest.adminApproval}</p>
                </div>
            )}  */}

 {/* {showAdminActions && (
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

    
            {showReferrerActions && (
                <div >
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
            )}  */}
    {/* </div>
  </div>
</div>
</div>  */}
<div className='bg-black  '>
<div className='box '>
    <div className='abc'>
<p className=" px-2 font-bold text-xl font-serif text-yellow-300">
                {memberApprovalRequest.memberEmail}
                </p>

                <div className="justify-between mt-4">
        {showReferrerInfo && (
                <div >
                    <p className='text-slate-300 mb-2'>Referred By</p>
                    <p className='text-slate-300 mb-2'>{memberApprovalRequest.memberReferrerFullName}</p>
                    <p className='text-slate-300 mb-2'>{memberApprovalRequest.memberReferrerEmail}</p>
                    <p className='text-slate-300 mb-4'>Referrer Approval: {memberApprovalRequest.referrerApproval}</p>
                </div>
            )}

{showAdminApproval && (
                <div>
                    <p className='text-slate-300 mb-4'>Admin Approval: {memberApprovalRequest.adminApproval}</p>
                </div>
            )} 

 {showAdminActions && (
                <div>
                    <Button className='mr-2'
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

          
            {showReferrerActions && (
                <div >
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

 </div>

</div>
</div>



</> )}

        {/* new card end */}

        {/* <div class="justify-center mt-5 mx-auto py-6 px-9 hover:bg-slate-100 hover:scale-105 bg-white  shadow-sm shadow-gray-400  dark:bg-gray-800 ">
        {/* <div class=" items-center justify-between">
            <span class="text-sm font-light text-gray-600 dark:text-gray-400"></span>
            {/* <a class="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-300 transform bg-gray-600 rounded cursor-pointer hover:bg-gray-500" tabindex="0" role="button">Design</a> */}
        {/* </div>  */}
{/*     
        <div class="mt-1">
            <p class="text-2xl font-serif font-extrabold text-red-700 dark:text-white  dark:hover:text-gray-200" >{memberApprovalRequest.memberFullName}</p>
            <p class="flex pr-2 mt-2 pl-4 text-gray-600 dark:text-gray-300">
                <p className=" px-2 font-bold">
                {memberApprovalRequest.memberEmail}
                </p> */}
                {/* </p>
        </div> 
    
        <div class="justify-between mt-4">
        {showReferrerInfo && (
                <div>
                    <p className='text-gray-500 mb-2'>Referred By</p>
                    <p className='text-gray-500 mb-2'>{memberApprovalRequest.memberReferrerFullName}</p>
                    <p className='text-gray-500 mb-2'>{memberApprovalRequest.memberReferrerEmail}</p>
                    <p className='text-gray-500 mb-4'>Referrer Approval: {memberApprovalRequest.referrerApproval}</p>
                </div>
            )}

{showAdminApproval && (
                <div>
                    <p className='text-gray-500 mb-4'>Admin Approval: {memberApprovalRequest.adminApproval}</p>
                </div>
            )} */}

{/* {showAdminActions && (
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
            )} */}

            {/* referrer actions
            {showReferrerActions && (
                <div >
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
            )} */}

 














        {/* <p className="text-sky-800   ">Category: {book.bookCategoryName}</p>
        <br></br> */}
                            {/* <p className="text-sky-800  ">Quantity: {book.bookQuantity}</p> */}
                            {/* <br></br> */}
                            {/* <p className="text-sky-800  ">Owner: {book.bookOwnerName}</p> */}
                            {/* <br></br> */}
                            {/* {
                                showApprovalStatus && 
                                <p className="text-gray-700 text-base">Approval Status: {book.bookApprovalStatus}</p>
                            } */}
            {/* <div class="flex items-center">
                <img class="hidden object-cover w-10 h-10 mx-4 rounded-full sm:block" src="https://images.unsplash.com/photo-1502980426475-b83966705988?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=40&q=80" alt="avatar"/>
                <a class="font-bold text-gray-700 cursor-pointer dark:text-gray-200" tabindex="0" role="link">Khatab wedaa</a>
            </div> */}
        {/* </div>
    </div> */}

        {/* <div className="bg-white shadow-md rounded-lg p-4 m-10">

            {/* member info */}
            {/* <div>
                <h1 className='text-2xl font-bold mb-2'>{memberApprovalRequest.memberFullName}</h1>
                <p className='text-gray-500 mb-4'>{memberApprovalRequest.memberEmail}</p>
            </div> */}

            {/* referrer info */}
            {/* {showReferrerInfo && (
                <div>
                    <p className='text-gray-500 mb-2'>Referred By</p>
                    <p className='text-gray-500 mb-2'>{memberApprovalRequest.memberReferrerFullName}</p>
                    <p className='text-gray-500 mb-2'>{memberApprovalRequest.memberReferrerEmail}</p>
                    <p className='text-gray-500 mb-4'>Referrer Approval: {memberApprovalRequest.referrerApproval}</p>
                </div> 
            )}

            {/* admin approval status */}
            {/* {showAdminApproval && (
                <div>
                    <p className='text-gray-500 mb-4'>Admin Approval: {memberApprovalRequest.adminApproval}</p>
                </div>
            )} */}

            {/* admin actions */}
            {/* {showAdminActions && (
                <div>
                    <Button
                        color='green'
                        handleClick={handleAdminAccept}
                    >
                        Accept
                    </Button> */}

                    {/* <Button
                        color='red'
                        handleClick={handleAdminReject}
                    >
                        Reject
                    </Button>
                </div>
            )}

            {/* referrer actions */}
            {/* {showReferrerActions && (
                <div>
                    <Button
                        color='green'
                        handleClick={handleReferrerAccept}
                    >
                        Accept
                    </Button> */}

                    {/* <Button 
                        color='red'
                        handleClick={handleReferrerReject}
                    >
                        Reject
                    </Button>
                </div>
            )} */} 

        

  

export default MemberApprovalRequestCard