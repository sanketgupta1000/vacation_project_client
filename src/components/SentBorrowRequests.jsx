import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { bookBorrowService, bookService, userService } from "../services";
import { setAllBorrowRequests, setLoading } from "../slices";

function SentBorrowRequests()
{
    const[currentBorrowRequestStatus, setcurrentBorrowRequestStatus]=useState(false);
    const[pastBorrowRequestsHistory,setpastBorrowRequestsHistory]=useState(false);
    const [pastBorrowRequest,setpastBorrowRequest]=useState({});
    const[currentBorrowRequest,setcurrentBorrowRequest]=useState({});
 
    const jwt = useSelector(state=>state.userReducer.token);
    // const user=userService.getUserDetails(jwt);

    async function getPastHistory()
    {
        dispatch(setLoading({isLoading: true, loadingMsg: "Loading your borrow history..."}))
        try{
           
            const pastBorrowRequests=await bookService.getBorrowedBookCopies(jwt);

            if(!pastBorrowRequests.ok)
            {
                const error=await pastBorrowRequests.json()
                throw new Error(error)
             }
            const data=await pastBorrowRequests.json();
            //question : where i should set all past borrow requests
            setpastBorrowRequest(data);
            dispatch(setAllBorrowRequests(data));
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
    }
    useEffect(()=>{
            try{
                getPastHistory();
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
                    throw new Error(error);
                }

            const myRequest=response.json();
            setcurrentBorrowRequest(myRequest);
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
        <div>
            <button onClick={()=>{
                setcurrentBorrowRequestStatus(true);
                setpastBorrowRequestsHistory(false);
            }}>Current borrow request status</button>

            <button onClick={()=>{
                setpastBorrowRequestsHistory(true);
                setcurrentBorrowRequestStatus(false);
            }}>View borrowed history</button>
        </div>

            { currentBorrowRequestStatus && 
            <div>
            {currentBorrowRequest}
            </div>
            }

            { pastBorrowRequestsHistory && 
          
                pastBorrowRequest?.map((row)=>{
                    {row}
                })
           
                }
               
        
        </>
    );

export default SentBorrowRequests;