import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setInfo, setSingleBook } from '../slices'
import { bookService } from '../services'
import {BookCopyRow} from "./"

function Book()
{

    // dispatch
    const dispatch = useDispatch()

    // navigate
    const navigate = useNavigate()

    // bookId from the url
    const {bookId} = useParams()

    // token
    const jwt = useSelector(state=>state.userReducer.token)

    // using singleBook from the store
    const singleBook = useSelector(state=>state.bookReducer.singleBook)

    // function to fetch data
    async function fetchBook()
    {
        const response = await bookService.getBookCopies(jwt, bookId)

        // custom status exceptions
        if(!response.ok)
        {
            throw new Error(await response.json())
        }

        // set data
        const data = await response.json()

        dispatch(setSingleBook(data))
    }

    // useEffect to fetch data on component mount
    useEffect(()=>
    {

        // set loading to true
        dispatch(setLoading({isLoading: true, loadingMsg: "Loading book data..."}))

        // fetch
        try
        {
            fetchBook()

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

    }, [])

    return (


        <div>

            {/* book details */}

            <div className="flex flex-col md:flex-row bg-gray-100 p-4 rounded-lg shadow-md">
                <div className="md:w-1/3">
                    <h2 className="text-xl font-bold">{singleBook.bookTitle}</h2>
                    <p className="text-gray-500">by {singleBook.bookAuthor}</p>
                </div>
                <div className="md:w-2/3 flex flex-wrap justify-between mt-4 md:mt-0">
                    <div className="flex items-center mb-2 md:mb-0">
                        <span className="text-gray-500 mr-2">Category:</span>
                        <span className="text-gray-700">{singleBook.bookCategoryName}</span>
                    </div>
                    <div className="flex items-center mb-2 md:mb-0">
                        <span className="text-gray-500 mr-2">Quantity:</span>
                        <span className="text-gray-700">{singleBook.bookQuantity}</span>
                    </div>
                    <div className="flex items-center mb-2 md:mb-0">
                        <span className="text-gray-500 mr-2">Pages:</span>
                        <span className="text-gray-700">{singleBook.bookPageCount}</span>
                    </div>
                    <div className="flex items-center mb-2 md:mb-0">
                        <span className="text-gray-500 mr-2">Owner:</span>
                        <span className="text-gray-700">{singleBook.bookOwnerName}</span>
                    </div>
                </div>
            </div>


            {/* all copies of the book */}
            <div>

                {singleBook.bookCopies.map((bookCopy)=>
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