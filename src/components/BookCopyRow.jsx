import { Link } from "react-router-dom";
import {Button} from "./"
import { bookBorrowService } from "../services";

function BookCopyRow({bookCopiesDTO})
{
 let eligible=bookCopiesDTO.requestable
 const jwt = useSelector(state=>state.userReducer.token)
  async function requestHandler()
  {
    dispatch(setLoading({isLoading: true, loadingMsg: "request for borrow is sending."}))
    try
            {
                // call the service
                const response = await bookBorrowService.requestForBorrow(bookCopiesDTO.bookId, jwt)

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
         <Link to = {`/bookCopies/${bookCopiesDTO.id}`}  >
        <div >
          <div>
            <li>{bookCopiesDTO.bookCopyId}</li>
            <li>{bookCopiesDTO.bookTitle}</li>
            <li>{bookCopiesDTO.holderName}</li>
            <li>{bookCopiesDTO.borrowerName}</li>
          </div>
          {eligible && ( <Button onClick={requestHandler}> request for borrow</Button>)}

          {!eligible && (  <Button> You have already requested for a book. </Button>)}
        </div>
        </Link>
        </>
    )}

export default BookCopyRow;