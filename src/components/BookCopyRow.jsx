import { Link } from "react-router-dom";
import {Button} from "./"
import { bookBorrowService } from "../services";

function BookCopyRow({bookCopy})
{
 let eligible=bookCopy.requestable
 const jwt = useSelector(state=>state.userReducer.token)
  async function requestHandler()
  {
    dispatch(setLoading({isLoading: true, loadingMsg: "request for borrow is sending."}))
    try
            {
                // call the service
                const response = await bookBorrowService.requestForBorrow(bookCopy.bookId, jwt)

                // custom status exceptions
                if(!response.ok)
                {
                    throw new Error(await response.json())
                }

                // show success message
                dispatch(setInfo({shouldShow: true, infoMsg: await response.text(), infoType: "success"}))

            }
            catch(error)
            {
                // set the error
                dispatch(setInfo({shouldShow: true, infoMsg: error.message, infoType: "error"}))
            }
            finally
            {
                // stop loading
                dispatch(setLoading({isLoading: false, loadingMsg: ""}))

                // navigate
                navigate("/")
            }
 }
   
    return(
        <>
         <Link to = {`/bookCopies/${bookCopy.id}`}  >
        <div >
          <div>
            <li>{bookCopy.bookCopyId}</li>
            <li>{bookCopy.bookTitle}</li>
            <li>{bookCopy.holderName}</li>
            <li>{bookCopy.borrowerName}</li>
          </div>
          {eligible && ( <Button handleClick={requestHandler}> Request for Borrow</Button>)}

          {!eligible && ( <Button disabled> Request for Borrow</Button>)}
        </div>
        </Link>
        </>
    )}

export default BookCopyRow;