import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setAllBookApprovalRequests, setInfo, setLoading } from '../slices'
import { bookUploadService } from '../services'
import {BookCard, Tab} from "./"

function BookApprovalRequestsForMember()
{

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [tab, setTab] = useState("unresponded")

    // jwt token
    const jwt = useSelector((state)=>state.auth.token)

    // requests from store
    const requests = {
        'unresponded': useSelector((state)=>state.bookApproval.newBookApprovalRequests) || [],
        'approved': useSelector((state)=>state.bookApproval.approvedBookApprovalRequests) || [],
        'rejected': useSelector((state)=>state.bookApproval.rejectedBookApprovalRequests) || [],
    }

    // function to fetch requests
    async function fetchRequests()
    {
        // set loading
        dispatch(setLoading({isLoading: true, loadingMsg: "Fetching book approval requests..."}))

        // fetch requests
        try
        {
            const response = await bookUploadService.getMyUploadRequests(jwt)

            // check if request was successful
            if(!response.ok)
            {
                throw new Error((await response.json()).message)
            }

            // set the requests
            dispatch(setAllBookApprovalRequests(await response.json()))
        }
        catch(error)
        {
            dispatch(setInfo({shouldShow: true, infoMsg: error.message, infoType: "error"}))
            // navigate to the home page
            navigate('/')
        }
        finally
        {
            // remove loading
            dispatch(setLoading({isLoading: false, loadingMsg: ""}))
        }
    }

    useEffect(()=>
    {
        fetchRequests()
    }, [])

    return (


        <>
            <div className="flex overflow-x-auto overflow-y-hidden border-b border-gray-200 whitespace-nowrap justify-evenly my-5">
                <Tab active={tab==='unresponded'} onClick={()=>setTab('unresponded')}
                >
                    Unresponded
                </Tab>

                <Tab active={tab==='approved'} onClick={()=>setTab('approved')}
                >
                    Approved
                </Tab>

                <Tab active={tab==='rejected'} onClick={()=>setTab('rejected')}
                >
                    Rejected
                </Tab>
            </div>

            <div className='my-10'>
                {
                    requests[tab].map((request)=>
                        
                        <BookCard
                            book={request}
                            key={request.bookId}
                            isLink={tab==="approved"}
                        />

                    )
                }
            </div>
        </>


    )


}


export default BookApprovalRequestsForMember