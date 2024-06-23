import { useSelector,useDispatch } from "react-redux";
import { bookBorrowService, userService } from "../services";
import { useEffect, useState } from "react";
import { setLoading ,setAllReceiverBorrowRequests} from "../slices";
import {Button,Tab} from "./Button";

function ReceviedBorrowRequests()
{
    // const jwt = useSelector(state=>state.userReducer.token)
    const jwt = useSelector((state)=>state.user.token)
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
            return borrow_requests_object;

        }
        catch(error)
        {
            dispatch(setInfo({shouldShow: true, infoMsg: error.message, infoType: "error"}))
        }
    }
   
   
    useEffect(()=>{
       
        try{
            getdata();
        }
        catch(error)
        {
            dispatch(setInfo({shouldShow: true, isfoMag: error.message, infoType: 'error'}))
        }
       

    },[])
  
    const requests={
         'unresponed_request_object' : useSelector(state=>state.bookBorrow.newBorrowRequests),
        ' accepted_request_object':useSelector(state=>state.bookBorrow.approvedBorrowRequests),
         'rejected_request_object':useSelector(state=>state.bookBorrow.rejectedBorrowRequests)
       
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
      

        {Tab==='unresponded' ? <div>{requests[tab].map((request)=>{
            {request}
            <div>
            <Button bgColor="green" handleClick={()=>{bookBorrowService.approveBorrowRequest(request.borrowRequestId,jwt)}}>Accept request</Button>

            <Button bgColor="red"  handleClick={()=>{bookBorrowService.rejectBorrowRequest(request.borrowRequestId,jwt)}}>Reject request</Button>
            </div>
        })}
        </div>
        :
        <div>
            {requests[tab].map((request)=>{
                {request}
            })}
            </div>}
    
        </>
    );


}
export default ReceviedBorrowRequests;