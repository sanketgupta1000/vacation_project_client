import React, {useEffect} from 'react'
import { BookCard } from '.'
import { useSelector, useDispatch } from 'react-redux'
import { setInfo, setLoading, setAvailableBooks } from '../slices'
import { bookService } from '../services'
import  '../styles/backgroud1.css'

function AllBooks()
{

    const dispatch = useDispatch()
    const jwt = useSelector(state => state.auth.token)
    const availableBooks = useSelector(state => state.book.availableBooks)

    // fetch all available books
    async function fetchAvailableBooks()
    {
        dispatch(setLoading({ isLoading: true, loadingMsg: "Loading books..." }))

        try
        {
            const response = await bookService.getBooks(jwt)

            if (!response.ok)
            {
                throw new Error((await response.json()).message)
            }

            const data = await response.json()
            dispatch(setAvailableBooks({ availableBooks: data }))
        }
        catch (error)
        {
            dispatch(setInfo({ shouldShow: true, infoMsg: error.message, infoType: "error" }))
            navigate("/")
        }
        finally
        {
            dispatch(setLoading({ isLoading: false, loadingMsg: "" }))
        }
    }

    // fetch available books only after initial render
    useEffect(() =>
    {
        fetchAvailableBooks()
    }, [])

    return (
        <>
        <div class=" bg-gradient-to-tl from-slate-900 via-black to-slate-500">
       

        <div className='mx-28 my-3'> 
        <div >

            {availableBooks.map((book)=>
            (
                <BookCard
                    key={book.bookId}
                    book={book}
                    isLink
                    showBorrowButton
                />
            ))}

        </div>
        </div>
        </div>
        </>
    )
   

}


export default AllBooks