import { setLoading, setInfo } from "../slices";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {bookUploadService} from "../services";
import {Button} from "./"

// a general component to display a book in the form of card
function BookCard({
    // data of the book
    book,
    // should the approval status be displayed?
    showApprovalStatus = false,
    // should the action buttons be displayed?
    showAdminActions = false,
    // should the card be displayed in a link
    isLink = false,
    // should the borrow button be displayed
    showBorrowButton = false
})
{
    // will make a wrapped component, useful to display the book details
    function BookInfo({
        book,
        showApprovalStatus,
        showAdminActions
    })
    {
        const navigate = useNavigate()
        const dispatch = useDispatch()
        const jwt = useSelector(state=>state.auth.token)

        // handle admin approve
        async function handleAdminApprove()
        {
            // set loading
            dispatch(setLoading({isLoading: true, loadingMsg: "Approving book..."}))

            try
            {

                // call the service
                const response = await bookUploadService.approveBookUploadRequest(book.bookId, jwt)

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

        // handle admin reject
        async function handleAdminReject()
        {
            // start loading
            dispatch(setLoading({isLoading: true, loadingMsg: "Rejecting book..."}))

            try
            {
                // call the service
                const response = await bookUploadService.rejectBookUploadRequest(book.bookId, jwt)

                // custom status exceptions
                if(!response.ok)
                {
                    throw new Error((await response.json()).message)
                    
                }

                // show success message
                dispatch(setInfo({shouldShow: true, infoMsg: await response.text(), infoType: "success"}))
            }
            catch(error)
            {
                // show error
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

        return (
            <div className="max-w-sm rounded-xl overflow-hidden shadow-lg">

                {/* book details */}
                <div className="px-6 py-4">
                    <h1 className="font-bold text-xl mb-2">{book.bookTitle}</h1>
                    <p className="text-gray-500 text-sm mb-4">by {book.bookAuthor}</p>

                    <div className="flex flex-col">
                        <p className="text-gray-700 text-base">Category: {book.bookCategoryName}</p>
                        <p className="text-gray-700 text-base">Quantity: {book.bookQuantity}</p>
                        <p className="text-gray-700 text-base">Owner: {book.bookOwnerName}</p>
                        {
                            showApprovalStatus && 
                            <p className="text-gray-700 text-base">Approval Status: {book.bookApprovalStatus}</p>
                        }
                    </div>

                </div>

                {/* admin actions */}
                {showAdminActions &&
                (
                    <div className="px-6 py-4 flex justify-start">

                        <Button
                            color="green"
                            handleClick={handleAdminApprove}
                        >
                            Approve
                        </Button>

                        <Button
                            color="red"
                            handleClick={handleAdminReject}
                        >
                            Reject
                        </Button>
                    </div>
                )}

                {showBorrowButton && 

                    <div className="px-6 py-4 flex justify-start">
                        <Button
                            color="blue"
                            handleClick={()=>{navigate("/books/"+book.bookId)}}
                        >
                            Borrow
                        </Button>
                    </div>
                }

            </div>
        )

    }

    return (

        isLink?
        <Link
            to={`/books/${book.bookId}`}
        >
            <BookInfo
                book={book}
                showApprovalStatus={showApprovalStatus}
                showAdminActions={showAdminActions}
            />
        </Link>
        :
        <BookInfo
            book={book}
            showApprovalStatus={showApprovalStatus}
            showAdminActions={showAdminActions}
        />
    )
}

export default BookCard