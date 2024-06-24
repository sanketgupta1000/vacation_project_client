import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import {MemberApprovalRequestCard, Tab} from "."
import { memberApprovalService } from "../services"
import { setAllMemberApprovalRequests, setLoading, setInfo } from "../slices"

const MemberApprovalRequestForAdmin = ({})=>
{
    const dispatch = useDispatch()
    const [tab, setTab] = useState('unresponded')

    const requests = {
        'unresponded' : useSelector((state)=>state.memberApproval.newMemberApprovalRequests) || [],
        'approved' : useSelector((state)=>state.memberApproval.approvedMemberApprovalRequests) || [],
        'rejected': useSelector((state)=>state.memberApproval.rejectedMemberApprovalRequests) || [],
    } 

    const jwt = useSelector((state)=>reastate.auth.token)

    useEffect(()=>
    {
        const fetchData = async()=>{
            const response = await memberApprovalService.getAllMemberApprovalRequests(jwt)

            if(!response.ok)
            {
                const errorObj = await response.json()
                throw new Error(errorObj.message)
            }

            const memberApprovalRequests = await response.json()

            dispatch(setAllMemberApprovalRequests(memberApprovalRequests))

            console.log('Success')
        }   

        dispatch(setLoading({isLoading: true, loadingMsg:'Loading data...'}))

        try
        {
            fetchData()
        }
        catch(error)
        {
            dispatch(setInfo({shouldShow: true, isfoMag: error.message, infoType: 'error'}))
        }
        finally
        {
            dispatch(setLoading({isLoading: false, loadingMsg: ''}))
        }
        
    },[])

    console.log('re-render')
    console.log(requests[tab])

    return(
    <>
        <div className="flex overflow-x-auto overflow-y-hidden border-b border-gray-200 whitespace-nowrap">
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
                        showReferrerInfo
                        showAdminApproval={tab==='unresponded'}
                        showAdminActions
                    />
                )
            }
        </div>
    </>
    )
}

export default MemberApprovalRequestForAdmin