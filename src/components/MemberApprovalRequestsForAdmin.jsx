import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { MemberApprovalRequestCard, Tab } from "."
import { memberApprovalService } from "../services"
import { setAllMemberApprovalRequests, setLoading, setInfo } from "../slices"
import { useNavigate } from "react-router-dom"

const MemberApprovalRequestForAdmin = ( { } ) =>
{
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [ tab, setTab ] = useState( 'unresponded' )

    const requests = {
        'unresponded': useSelector( ( state ) => state.memberApproval.newMemberApprovalRequests ) || [],
        'approved': useSelector( ( state ) => state.memberApproval.approvedMemberApprovalRequests ) || [],
        'rejected': useSelector( ( state ) => state.memberApproval.rejectedMemberApprovalRequests ) || [],
    }
    
    const jwt = useSelector( ( state ) => state.auth.token )

    const fetchData = async () =>
    {
        dispatch( setLoading( { isLoading: true, loadingMsg: 'Loading data...' } ) )

        try
        {
            const response = await memberApprovalService.getAllMemberApprovalRequests( jwt )
            if ( !response.ok )
            {
                const errorObj = await response.json()
                throw new Error( errorObj.message )
            }
            
            // console.log(response)
            const memberApprovalRequests = await response.json()

            dispatch( setAllMemberApprovalRequests( memberApprovalRequests ) )

            // console.log( 'Success' )
        }
        catch ( error )
        {
            dispatch( setInfo( { shouldShow: true, isfoMag: error.message, infoType: 'error' } ) )
        }
        finally
        {
            dispatch( setLoading( { isLoading: false, loadingMsg: '' } ) )
        }
        
    }
    useEffect( () =>
    {
        fetchData()
    }, [] )

    // console.log( 're-render' )
    // console.log( requests[ tab ] )

    return (
        <>
         <div class=" bg-gradient-to-tl from-slate-900 via-black to-slate-500">
            <div className="flex overflow-x-auto overflow-y-hidden border-b border-gray-200 whitespace-nowrap justify-evenly my-5">
                <Tab active={ tab === 'unresponded' } onClick={ () => setTab( 'unresponded' ) }
                >
                    Unresponded
                </Tab>

                <Tab active={ tab === 'approved' } onClick={ () => setTab( 'approved' ) }
                >
                    Approved
                </Tab>

                <Tab active={ tab === 'rejected' } onClick={ () => setTab( 'rejected' ) }
                >
                    Rejected
                </Tab>
            </div>
            <div class="flex min-h-screen items-center justify-center bg-neutral-800">
            <div class="grid grid-cols-1 gap-4 xl:grid-cols-2  sm:grid-cols-1">
                {
                    requests[ tab ].map( ( request ) =>
                        <MemberApprovalRequestCard
                            key={ request.memberApprovalRequestId }
                            memberApprovalRequest={ request }
                            showReferrerInfo
                            showAdminApproval={ tab !== 'unresponded' }
                            showAdminActions={ tab === 'unresponded' }
                            fetchData={fetchData}
                        />
                    )
                }
            </div>
            </div>
            </div>
        </>
    )
}

export default MemberApprovalRequestForAdmin