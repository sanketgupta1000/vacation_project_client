import { useSelector,useDispatch } from "react-redux";
import { bookBorrowService, userService } from "../services";
import { useEffect, useState } from "react";
import { setLoading ,setAllReceiverBorrowRequests} from "../slices";
import {Button,Tab} from ".";
import { BorrowRequestCard } from ".";

function ReceviedBorrowRequests()
{
    // const jwt = useSelector(state=>state.userReducer.token)
    const jwt = useSelector((state)=>state.auth.token)
    const dispatch = useDispatch()
    const [tab,setTab]=useState('unresponded');

    async function getdata()
    {
        dispatch(setLoading({isLoading: true, loadingMsg: "Loading data..."}))
        try{
            //getting all borrow requests
            const borrow_requests=await bookBorrowService.getAllBorrowRequests(jwt)
            
            if(!borrow_requests.ok)
            {
                    throw new Error(await response.json())
                }
            // we got the object

            const borrow_requests_object=await borrow_requests.json();
            dispatch(setAllReceiverBorrowRequests(borrow_requests_object));

        }
        catch(error)
        {
            dispatch(setInfo({shouldShow: true, infoMsg: error.message, infoType: "error"}))
        }
    }
   
   
    useEffect(()=>{
       
        getdata()
       

    },[])
  
    const requests={
        'unresponded' : useSelector(state=>state.bookBorrow.newBorrowRequests) || [],
        'approved':useSelector(state=>state.bookBorrow.approvedBorrowRequests) || [],
        'rejected':useSelector(state=>state.bookBorrow.rejectedBorrowRequests) || []
    }
    
    return(
        <>

        {/* remaining: filter by book */}

        {/* side nav bar for three states */}
        <div className="flex overflow-x-auto overflow-y-hidden border-b border-gray-200 whitespace-nowrap">
            <Tab active={tab==='unresponded'} onClick={()=>setTab('unresponded')}
            >
                Unresponded requests
            </Tab>

            <Tab active={tab==='approved'} onClick={()=>setTab('approved')}
            >
                Approved requests
            </Tab>

            <Tab active={tab==='rejected'} onClick={()=>setTab('rejected')}
            >
                Rejected requests
            </Tab>
        </div>
      

        
        <div>
            {requests[tab].map((request)=>(
                
                <BorrowRequestCard
                    key={request.borrowRequestId}
                    borrowRequest={request}
                    showRequesterInfo
                    showOwnerActions={tab==='unresponded'}
                />

            ))}
        </div>
    
        </>
    );


}
export default ReceviedBorrowRequests;