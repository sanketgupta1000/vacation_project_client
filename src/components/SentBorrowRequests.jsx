import { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { bookBorrowService, bookService, userService } from "../services";
import { setAllSenderBorrowRequests, setLoading } from "../slices";

function SentBorrowRequests()
{
    // to see current borrow request status
    const dispatch = useDispatch()
    const[currentBorrowRequestStatus, setcurrentBorrowRequestStatus]=useState(false);
    const[pastBorrowRequestsHistory,setpastBorrowRequestsHistory]=useState(false);
   const jwt = useSelector(state=>state.user.token);
    const pastHistory=useSelector(state=>state.bookBorrow.pastBorrowRequests);
    const currentRequest=useSelector(state=>state.bookBorrow.currentBorrowRequest);

    // const user=userService.getUserDetails(jwt);

    async function getPastBorrowHistory()
    {
        dispatch(setLoading({isLoading: true, loadingMsg: "Loading your borrow history..."}))
        try{
           
            const pastBorrowRequests=await bookService.getBorrowedRequestHistory(jwt);

            if(!pastBorrowRequests.ok)
            {
                const error=await pastBorrowRequests.json()
                throw new Error(error.message)
             }
            const data=await pastBorrowRequests.json();
           
            // setpastBorrowRequest(data);
            //question: what about current detail?
            dispatch(setAllSenderBorrowRequests(data));
        }
        catch(error)
        {
                // show error
                dispatch(setInfo({shouldShow: true, infoMsg: error.message, infoType: "error"}))
    
                // navigate
                navigate("/")
            }
            finally
            {
                // stop loading
                dispatch(setLoading({isLoading: false, loadingMsg: ""}))
            }
        }
    
    useEffect(()=>{
            try{
                getPastBorrowHistory();
            }
            catch(error)
            {
                dispatch(setInfo({shouldShow: true, isfoMag: error.message, infoType: 'error'}))
            }
    },[])

    async function getMyrequest()
    {
        dispatch(setLoading({isLoading:true,loadingMsg: "Loading your request..."}))
        try{
            const response=await  bookBorrowService.getMyBorrowRequests(jwt);
            if(!response.ok)
                {
                    const error=response.json();
                    throw new Error(error.message);
                }

            const myRequest=response.json();
          
            dispatch(setAllSenderBorrowRequests(myRequest));
        }
        catch(error)
        {
                // show error
                dispatch(setInfo({shouldShow: true, infoMsg: error.message, infoType: "error"}))
    
                // navigate
                navigate("/")
            }
            finally
            {
                // stop loading
                dispatch(setLoading({isLoading: false, loadingMsg: ""}))
            }
        }

        useEffect(()=>{
            try
            {
                getMyrequest();
            }
            catch(error)
            {
                dispatch(setInfo({shouldShow: true, isfoMag: error.message, infoType: 'error'}))
         
            }
        },[])

   
    return(
        <>
        
        {/* side nav bar for 2 states */}
        <div className="bg-green-500">
            <button className="mx-5" onClick={()=>{
                setcurrentBorrowRequestStatus(true);
                setpastBorrowRequestsHistory(false);
            }}>Current borrow request status</button>

            <button onClick={()=>{
                setpastBorrowRequestsHistory(true);
                setcurrentBorrowRequestStatus(false);
            }}>View borrowed history</button>
        </div>

            { currentBorrowRequestStatus && 
          
            currentRequest?.map((row)=>{row})
       
            }

            { pastBorrowRequestsHistory && 
          
          pastHistory?.map((row)=>{
                    {row}
                })
           
                }
               
        
        </>
    );
}

export default SentBorrowRequests;