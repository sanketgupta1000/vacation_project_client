import { setLoading, setInfo } from "../slices";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { bookUploadService } from "../services";
import { Button, UserAvatar } from "./"

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
}) {
    // will make a wrapped component, useful to display the book details
    function BookInfo({
        book,
        showApprovalStatus,
        showAdminActions
    }) {
        const navigate = useNavigate()
        const dispatch = useDispatch()
        const jwt = useSelector(state => state.auth.token)

        // handle admin approve
        async function handleAdminApprove() {
            // set loading
            dispatch(setLoading({ isLoading: true, loadingMsg: "Approving book..." }))

            try {

                // call the service
                const response = await bookUploadService.approveBookUploadRequest(book.bookId, jwt)

                // custom status exceptions
                if (!response.ok) {
                    throw new Error(await response.json())
                }

                // show success message
                dispatch(setInfo({ shouldShow: true, infoMsg: await response.text(), infoType: "success" }))

            }
            catch (error) {
                // set the error
                dispatch(setInfo({ shouldShow: true, infoMsg: error.message, infoType: "error" }))
            }
            finally {
                // stop loading
                dispatch(setLoading({ isLoading: false, loadingMsg: "" }))

                // navigate
                navigate("/")
            }

        }

        // handle admin reject
        async function handleAdminReject() {
            // start loading
            dispatch(setLoading({ isLoading: true, loadingMsg: "Rejecting book..." }))

            try {
                // call the service
                const response = await bookUploadService.rejectBookUploadRequest(book.bookId, jwt)

                // custom status exceptions
                if (!response.ok) {
                    throw new Error((await response.json()).message)

                }

                // show success message
                dispatch(setInfo({ shouldShow: true, infoMsg: await response.text(), infoType: "success" }))
            }
            catch (error) {
                // show error
                dispatch(setInfo({ shouldShow: true, infoMsg: error.message, infoType: "error" }))
            }
            finally {
                // stop loading
                dispatch(setLoading({ isLoading: false, loadingMsg: "" }))

                // navigate
                navigate("/")
            }
        }

        return (
            <>
                {/* new card start */}
                {/* <div className="flex min-h-screen items-center justify-center bg-neutral-800">
  <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"> */}
                <div className=" mt-2 mb-2 group relative cursor-pointer items-center justify-center overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30">
                    <div className="h-96 w-72">
                        <img className="h-full w-full object-cover transition-transform duration-500 group-hover:rotate-3 group-hover:scale-125" src="https://marketplace.canva.com/EAFMf17QgBs/1/0/1003w/canva-green-and-yellow-modern-book-cover-business-Ah-do4Y91lk.jpg" alt="" />
                    </div>
                    <div className=" absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>
                    <div className="absolute inset-0 flex translate-y-[60%] flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0">
                        <h1 className="font-serif text-3xl font-bold text-white">{book.bookTitle}</h1>

                        <div className="mb-3 text-lg italic  text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">

                            <p className="font-bold text-gray-50 mt-2">By {book.bookAuthor}</p>
                            <p className="mt-1">
                                catagory  :  {book.bookCategoryName}
                            </p>
                            <p className="mb-3">
                                Quantity  :  {book.bookQuantity} </p>
                            {/* <p> Owner  :  {book.bookOwnerName}</p> */}
                            <UserAvatar user={{ id: 1, name: "Janvi solanki", email: "janvivsolanki2004@gamil.com" }} />

                        </div>
                        {
                            showApprovalStatus &&
                            <p className="text-gray-700 text-base">Approval Status: {book.bookApprovalStatus}</p>
                        }
                        {showAdminActions &&
                            (
                                <div className="px-6 py-4 flex justify-start">

                                    <Button
                                        color="green"
                                        className="mr-1.5"
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
                                    handleClick={() => { navigate("/books/" + book.bookId) }}
                                >
                                    Borrow
                                </Button>
                            </div>
                        }
                    </div>



                </div>
              



      </>
        )
    }


    return (

        isLink ?
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