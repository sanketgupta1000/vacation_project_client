import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"

import { bookService } from "../services"
import { setInfo, setLoading, setSingleBookCopy } from "../slices"
import { useEffect } from "react"

const BookCopy = ()=>
{
    // dispatch
    const dispatch = useDispatch()

    // bookId from the url
    const {bookCopyId} = useParams()

    // token
    const jwt = useSelector(state=>state.userReducer.token)

    const singleBookCopy = useSelector((state)=>state.book.singleBookCopy)

    
    useEffect(()=>{
        const fetchData = async ()=>{
            const response = bookService.getBookCopyTransactions(jwt, bookCopyId)

            if(!response.ok)
            {
                const errorObj = await response.json()
                throw new Error(errorObj.message)
            }

            const singleBookCopy = await response.json()

            dispatch(setSingleBookCopy(singleBookCopy))
        }
            
        dispatch(setLoading({isLoading: true, loadingMsg: 'Loading data...'}))
        try
        {   
            fetchData()
            navigate("/")
        }
        catch(error)
        {
            dispatch(setInfo({shouldShow: true, isfoMag: error.message, infoType: 'error'}))
        }
        finally
        {
            dispatch(setLoading({isLoading: false, loadingMsg: 'Loading data...'}))
        }
    },[])

    return(
        <div>

            {/* bookCopy details */}

            <div className="flex flex-col md:flex-row bg-gray-100 p-4 rounded-lg shadow-md">
                <div className="md:w-1/3">
                    <h2 className="text-xl font-bold">{singleBookCopy.bookTitle}</h2>
                    <p className="text-gray-500">Book Copy ID: {singleBookCopy.bookCopyId}</p>
                    <p className="text-gray-500">Book ID: {singleBookCopy.bookId}</p>
                </div>
                <div className="md:w-2/3 flex flex-wrap justify-between mt-4 md:mt-0">
                    <div className="flex items-center mb-2 md:mb-0">
                        <span className="text-gray-500 mr-2">Holder</span>
                        <span className="text-gray-700">{singleBookCopy.holderName}</span>
                    </div>
                    <div className="flex items-center mb-2 md:mb-0">
                        <span className="text-gray-500 mr-2">Next will be passed to:</span>
                        <span className="text-gray-700">{singleBookCopy.borrowerName}</span>
                    </div>
                </div>
            </div>
            {/* all copies of the book */}
            <div>

                {singleBookCopy.bookCopyTransactions.map((transaction)=>
                (
                    <BookTransactionRow
                        key={transaction.transactionId}
                        transaction={transaction}
                    />
                ))}

            </div>

        </div>
    )

}