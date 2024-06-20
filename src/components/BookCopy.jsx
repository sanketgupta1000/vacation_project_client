import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"

import { bookService } from "../services"
import { setInfo, setLoading } from "../slices"
import { useEffect } from "react"

const BookCopy = ()=>
{
    // dispatch
    const dispatch = useDispatch()

    // bookId from the url
    const {bookCopyId} = useParams()

    // token
    const jwt = useSelector(state=>state.userReducer.token)

    
    useEffect(()=>{
        const fetchData = async ()=>{
            const response = bookService.getBookCopyTransactions(jwt, bookCopyId)

            if(!response.ok)
            {
                throw new Error(await response.json())
            }

            const data = await response.json()

            const singleBookCopy = {
                bookCopyId: data.bookCopyId,
                bookId: data.bookId,
                bookTitle: data.bookTitle,
                holderId: null,
                holderName: null,
                borrowerId: null,
                borrowerName: null,
                requestable: null,
                bookTransactions: [
                    {
                        transactionId: null,
                        bookGiverId: null,
                        bookGiverFullName: null,
                        bookGiverEmail: null,
                        bookReceiverId: null,
                        bookReceiverFullName: null,
                        bookReceiverEmail: null,
                        transactionDate: null,
                        transactionTime: null,
                    }
                ]
            }
        }    
        dispatch(setLoading({isLoading: true, loadingMsg: 'Loading data...'}))
        try
        {   
            

            
        }
        catch(error)
        {
            dispatch(setInfo({shouldShow: true, isfoMag: error.message, infoType: 'error'}))
        }
        finally
        {

        }
    },[])



}