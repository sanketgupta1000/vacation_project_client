import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setInfo } from '../slices'
import { bookService } from '../services'

function Book()
{

    // dispatch
    const dispatch = useDispatch()

    // bookId from the url
    const {bookId} = useParams()

    // token
    const jwt = useSelector(state=>state.userReducer.token)

    // state for book data
    const [bookData, setBookData] = useState(
        {
            bookId: bookId,
            bookTitle: "",
            bookAuthor: "",
            bookPageCount: 0,
            bookQuantity: 0,
            bookCategoryId: 0,
            bookCategoryName: "",
            bookApprovalStatus: "",
            bookOwnerId: 0,
            bookOwnerName: ""
        }
    )

    // state for book copies
    const [bookCopies, setBookCopies] = useState([
        {
            bookCopyId: 0,
            bookId: 0,
            bookTitle: "",
            holderId: 0,
            holderName: "",
            borrowerId: 0,
            borrowerName: "",
            requestable: false
        }
    ])

    // useEffect to fetch data on component mount, and whenever bookId changes
    useEffect(async ()=>
    {

        // set loading to true
        dispatch(setLoading({isLoading: true, loadingMsg: "Loading book data..."}))

        // fetch
        try
        {
            const response = await bookService.getBookCopies(jwt, bookId)

            // custom status exceptions
            if(!response.ok)
            {
                throw new Error(await response.json())
            }

            // set data
            const data = await response.json()
            setBookData({
                bookId: data.bookId,
                bookTitle: data.bookTitle,
                bookAuthor: data.bookAuthor,
                bookPageCount: data.bookPageCount,
                bookQuantity: data.bookQuantity,
                bookCategoryId: data.bookCategoryId,
                bookCategoryName: data.bookCategoryName,
                bookApprovalStatus: data.bookApprovalStatus,
                bookOwnerId: data.bookOwnerId,
                bookOwnerName: data.bookOwnerName
            })

            // set copies
            setBookCopies(data.bookCopies)
        }
        catch(error)
        {
            // show error
            useDispatch(setInfo({shouldShow: true, infoMsg: error.message, infoType: "error"}))

            // navigate
            navigate("/")
        }
        finally
        {
            // stop loading
            dispatch(setLoading({isLoading: false, loadingMsg: ""}))
        }

    }, [bookId])

    return (


        <div>

            {/* book details */}

            <div className="flex flex-col md:flex-row bg-gray-100 p-4 rounded-lg shadow-md">
                <div className="md:w-1/3">
                    <h2 className="text-xl font-bold">{bookData.bookTitle}</h2>
                    <p className="text-gray-500">by {bookData.bookAuthor}</p>
                </div>
                <div className="md:w-2/3 flex flex-wrap justify-between mt-4 md:mt-0">
                    <div className="flex items-center mb-2 md:mb-0">
                        <span className="text-gray-500 mr-2">Category:</span>
                        <span className="text-gray-700">{bookData.bookCategoryName}</span>
                    </div>
                    <div className="flex items-center mb-2 md:mb-0">
                        <span className="text-gray-500 mr-2">Quantity:</span>
                        <span className="text-gray-700">{bookData.bookQuantity}</span>
                    </div>
                    <div className="flex items-center mb-2 md:mb-0">
                        <span className="text-gray-500 mr-2">Pages:</span>
                        <span className="text-gray-700">{bookData.bookPageCount}</span>
                    </div>
                    <div className="flex items-center mb-2 md:mb-0">
                        <span className="text-gray-500 mr-2">Owner:</span>
                        <span className="text-gray-700">{bookData.bookOwnerName}</span>
                    </div>
                </div>
            </div>


            {/* all copies of the book */}
            <div>

                {bookCopies.map((bookCopy)=>
                (
                    <BookCopyRow
                        key={bookCopy.bookCopyId}
                        bookCopy={bookCopy}
                    />
                ))}

            </div>

        </div>


    )


}


export default Book