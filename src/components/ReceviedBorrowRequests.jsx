import { useSelector,useDispatch } from "react-redux";
import { bookBorrowService, userService } from "../services";
import { useEffect, useState } from "react";
import { setLoading ,setAllReceiverBorrowRequests} from "../slices";
import Button from "./Button";

function ReceviedBorrowRequests()
{
    // const jwt = useSelector(state=>state.userReducer.token)
    const jwt = useSelector((state)=>state.user.token)
    const dispatch = useDispatch()
    
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
            setborrowRequest(getdata());
        }
        catch(error)
        {
            dispatch(setInfo({shouldShow: true, isfoMag: error.message, infoType: 'error'}))
        }
       

    },[])
  
    const unresponed_request_object = useSelector(state=>state.bookBorrow.newBorrowRequests)
    const accepted_request_object=useSelector(state=>state.bookBorrow.approvedBorrowRequests)
    const rejected_request_object=useSelector(state=>state.bookBorrow.rejectedBorrowRequests)
    const [UnrespondedRequest,setUnrespondedRequest]=useState(true);
    const [rejectedRequest,setrejectedRequest]=useState(false);
    const [acceptedRequest,setacceptedRequest]=useState(false);
    const[ borrowRequest, setborrowRequest]=useState({});
    
    // console.log(unresponed_request_object)
//    console.log(accepted_request_object)
//    console.log(rejected_request_object)
    return(
        <>

        {/* remaining: filter by book */}

        {/* side nav bar for three states */}
        <div>
            <button onClick={()=>{
                setUnrespondedRequest(true);
                setrejectedRequest(false);
                setacceptedRequest(false);
            }}>
                Unresponded Request</button>

            <button onClick={()=>{
                setacceptedRequest(true);
                setrejectedRequest(false);
                setUnrespondedRequest(false);
            }}>Accepted request </button>

            <button onClick={()=>{
                setrejectedRequest(true);
                setacceptedRequest(false);
                setUnrespondedRequest(false);
            }}>Rejected request</button>
        </div>



        {/* to display all borrow requests */}
        { UnrespondedRequest &&
     
     unresponed_request_object ?.map((row)=>{
            {row}
            <div>
            <Button bgColor="green" handleClick={()=>{bookBorrowService.approveBorrowRequest(bookid,jwt)}}>Accept request</Button>

            <Button bgColor="red"  handleClick={()=>{bookBorrowService.rejectBorrowRequest(bookid,jwt)}}>Reject request</Button>
            </div>
            
        })
      
    }
        {rejectedRequest && 
            rejected_request_object?.map((row)=>{
                {row}
            })
        }


        {acceptedRequest && 
    
           accepted_request_object?.map((row)=>{
            {row}
           })
    
        }
        </>
    );


}
export default ReceviedBorrowRequests;