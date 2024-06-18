import { setLoading, setInfo } from "../slices";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import bookUploadService from "../services/bookUploadService";
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
        const jwt = useSelector(state=>state.userReducer.token)

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
                    throw new Error(await response.json())
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
            <div>

                {/* book details */}
                <div>
                    <h1>{book.bookTitle}</h1>
                    <p>by {book.bookAuthor}</p>
                    <p>Category: {book.bookCategoryName}</p>
                    <p>{book.bookPageCount} pages</p>
                    <p>Quantity: {book.bookQuantity}</p>
                </div>

                {/* owner */}
                <div>
                    <p>Owner: {book.bookOwnerName}</p>
                </div>

                {/* approval status */}
                {showApprovalStatus && 
                (
                    <div>
                        <p>Approval Status: {book.bookApprovalStatus}</p>
                    </div>
                )}

                {/* admin actions */}
                {showAdminActions &&
                (
                    <div>

                        <Button
                            bgColor="green"
                            handleClick={handleAdminApprove}
                        >
                            Approve
                        </Button>

                        <Button
                            bgColor="red"
                            handleClick={handleAdminReject}
                        >
                            Reject
                        </Button>
                    </div>
                )}

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