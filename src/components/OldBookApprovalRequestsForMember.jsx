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

    
    const Size=requests[tab].length;
    
    // console.log(requests['unresponded'])

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
         {/* <div class=" bg-gradient-to-tl from-slate-900 via-black to-slate-500"> */}
            <div className="flex overflow-x-auto overflow-y-hidden border-b border-gray-200 whitespace-nowrap justify-evenly ">

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
{/* </div> */}
            
                {Size===0 ? 
                <>
                <h1 className='text-yellow-500 mb-8 text-center mx-auto min-h-screen mt-[10%] font-serif font-bold text-4xl'>
                    You don't have any
                    <br ></br>
                     {tab} requests !!!

                </h1>
                </>:<>
                <div class="flex min-h-screen items-center justify-center bg-neutral-800">
                    <div class="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                        
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
  </div>
                </>
                
                }

             
            
        </>


    )


}


export default BookApprovalRequestsForMember