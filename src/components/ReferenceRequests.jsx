import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import {MemberApprovalRequestCard, Tab} from "."
import { memberApprovalService } from "../services"
import { setAllReferenceRequests, setInfo, setLoading } from "../slices"
import { useNavigate } from "react-router-dom"

const ReferenceRequests = ({})=>
{
    const dispatch = useDispatch()
    const [tab, setTab] = useState('unresponded')

    const navigate = useNavigate()

    const requests = {
        'unresponded' : useSelector((state)=>state.reference.newReferenceRequests) || [],
        'approved' : useSelector((state)=>state.reference.approvedReferenceRequests) || [],
        'rejected': useSelector((state)=>state.reference.rejectedReferenceRequests) || [],
    } 

    const jwt = useSelector((state)=>state.auth.token)

    const fetchData = async()=>
    {

        dispatch(setLoading({isLoading: true, loadingMsg:'Loading data...'}))

        try
        {
            const response = await memberApprovalService.seeAllReferences(jwt)

            if(!response.ok)
            {
                const errorObj = await response.json()
                throw new Error(errorObj.message)
            }
            
            const memberApprovalRequests = await response.json()

            dispatch(setAllReferenceRequests(
                {
                    newRequests: memberApprovalRequests.unresponded,
                    approvedRequests: memberApprovalRequests.approved,
                    rejectedRequests: memberApprovalRequests.rejected
                }
            ))

            console.log('Success')
        }
        catch(error)
        {
            dispatch(setInfo({shouldShow: true, isfoMag: error.message, infoType: 'error'}))
            navigate('/')
        }
        finally
        {
            dispatch(setLoading({isLoading: false, loadingMsg: ''}))
        }

    }   
    useEffect(()=>
    {

        fetchData()
        
    },[])

    return(
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

        <div>
            {
                requests[tab].map((request)=>
                    <MemberApprovalRequestCard
                        key={request.memberApprovalRequestId}
                        memberApprovalRequest={request}
                        showAdminApproval
                        showReferrerActions={tab==='unresponded'}
                        fetchData={fetchData}
                    />
                )
            }
        </div>
    </>
    )
}

export default ReferenceRequests