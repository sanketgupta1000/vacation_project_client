import React from 'react'
import {Button} from "./"
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {setLoading, setInfo} from "../slices"
import { bookBorrowService } from '../services'

function BorrowRequestCard({
    borrowRequest,
    showRequesterInfo=false,
    showStatus=false,
    showOwnerActions=false
})
{

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const jwt = useSelector(state=>reastate.auth.token)

    async function handleApproveBorrowRequest()
    {
        // set loading
        dispatch(setLoading({isLoading: true, loadingMsg: "Approving borrow request..."}))

        try
        {
            const response = await bookBorrowService.approveBorrowRequest(borrowRequest.borrowRequestId, jwt)

            if(!response.ok)
            {
                throw new Error((await response.json()).message)
            }

            // successfully approved
            dispatch(setInfo({shouldShow: true, infoMsg: await response.text(), infoType: "success"}))

            navigate("/")
        }
        catch(error)
        {
            dispatch(setInfo({shouldShow: true, infoMsg: error.message, infoType: "error"}))
        }
        finally
        {
            dispatch(setLoading({isLoading: false, loadingMsg: ""}))
        }
    }

    async function handleRejectBorrowRequest()
    {
        // set loading
        dispatch(setLoading({isLoading: true, loadingMsg: "Rejecting borrow request..."}))

        try
        {
            const response = await bookBorrowService.rejectBorrowRequest(borrowRequest.borrowRequestId, jwt)

            if(!response.ok)
            {
                throw new Error((await response.json()).message)
            }

            // successfully rejected
            dispatch(setInfo({shouldShow: true, infoMsg: await response.text(), infoType: "success"}))

            navigate("/")
        }
        catch(error)
        {
            dispatch(setInfo({shouldShow: true, infoMsg: error.message, infoType: "error"}))
        }
        finally
        {
            dispatch(setLoading({isLoading: false, loadingMsg: ""}))
        }
    }

    return (


        <div className="bg-white shadow-md rounded-lg p-4 m-10">

            {/* book copy info */}
            <div>
                <h1 className='text-2xl font-bold mb-2'>{borrowRequest.bookCopyName}</h1>
                <p className='text-gray-500 mb-4'>Book Copy: 
                    <Link to={`/bookCopies/${borrowRequest.bookCopyId}`}>
                        {borrowRequest.bookCopyId}
                    </Link>
                </p>
            </div>

            {/* requester info */}
            {showRequesterInfo && (
                <div>
                    <p className='text-gray-500 mb-2'>Requested By</p>
                    <p className='text-gray-500 mb-2'>
                        <Link
                            to={`/members/${borrowRequest.requesterId}`}
                        >
                            {borrowRequest.requesterName}
                        </Link>
                    </p>
                </div>
            )}

            {/* owner approval status */}
            {showStatus && (
                <div>
                    <p className='text-gray-500 mb-4'>Owner Approval: {borrowRequest.status}</p>
                </div>
            )}

            {/* owner actions */}
            {showOwnerActions && (
                <div>
                    <Button
                        color='green'
                        handleClick={handleApproveBorrowRequest}
                    >
                        Approve
                    </Button>

                    <Button
                        color='red'
                        handleClick={handleRejectBorrowRequest}
                    >
                        Reject
                    </Button>
                </div>
            )}

        </div>


    )


}


export default BorrowRequestCard