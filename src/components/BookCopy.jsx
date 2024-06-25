import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"

import { bookBorrowService, bookService } from "../services"
import { setInfo, setLoading, setSingleBookCopy } from "../slices"
import { useEffect, useState } from "react"
import {BookTransactionRow, Button, InputField} from "./"
import Modal from "react-responsive-modal"
import { useForm } from "react-hook-form"

const BookCopy = ()=>
{
    // dispatch
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // bookId from the url
    const {bookCopyId} = useParams()

    // token
    const jwt = useSelector(state=>state.auth.token)

    const singleBookCopy = useSelector((state)=>state.book.singleBookCopy)

    // state for controlling modal
    const [showModal, setShowModal] = useState(false)

    // useForm hook
    const {register, handleSubmit, formState: {errors}} = useForm()

    
    useEffect(()=>{
        const fetchData = async ()=>{
            dispatch(setLoading({isLoading: true, loadingMsg: 'Loading data...'}))
            try
            {
                const response = await bookService.getBookCopyTransactions(jwt, bookCopyId)
                if(!response.ok)
                {
                    const errorObj = await response.json()
                    throw new Error(errorObj.message)
                }
    
                const singleBookCopy = await response.json()
    
                dispatch(setSingleBookCopy(singleBookCopy))
            }
            catch(error)
            {
                dispatch(setInfo({shouldShow: true, infoMsg: error.message, infoType: 'error'}))
                navigate("/")
            }
            finally
            {
                dispatch(setLoading({isLoading: false, loadingMsg: ''}))
            }
        }
        fetchData()
    },[])

    async function handleRequestBorrow()
    {
        // set loading
        dispatch(setLoading({isLoading: true, loadingMsg: "Requesting for borrow..."}))

        try
        {
            const response = await bookBorrowService.requestForBorrow(bookCopyId, jwt)

            if(!response.ok)
            {
                throw new Error((await response.json()).message)
            }

            // successfully requested
            dispatch(setInfo({shouldShow: true, infoMsg: await response.text(), infoType: "success"}))

            navigate("/")
        }
        catch(error)
        {
            dispatch(setInfo({shouldShow: true, infoMsg: error.message, infoType: "error"}))
        }
        finally
        {
            dispatch(setLoading({isLoading: false, loadingMsg: ""}))
        }
    }

    async function handleInitiateHandover()
    {
        // start loading
        dispatch(setLoading({isLoading: true, loadingMsg: "Initiating handover..."}))

        try
        {
            // call the service
            const response = await bookBorrowService.initiateHandover(bookCopyId, jwt)

            // custom status exceptions
            if(!response.ok)
            {
                throw new Error((await response.json()).message)
            }

            // all good, otp sent to the borrower
            // open the modal
            setShowModal(true)
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
        }
    }

    async function handleHandover(data)
    {
        // hide the modal
        setShowModal(false)

        // start loading
        dispatch(setLoading({isLoading: true, loadingMsg: "Verifying handover..."}))

        try
        {
            const response = bookBorrowService.handoverBookCopy(bookCopyId, data.otp, jwt)

            if(!response.ok)
            {
                throw new Error((await response.json()).message)
            }

            // show success message
            dispatch(setInfo({shouldShow: true, infoMsg: await response.text(), infoType: "success"}))

            // navigate
            navigate("/")
        }
        catch(error)
        {
            dispatch(setInfo({shouldShow: true, infoMsg: error.message, infoType: "error"}))
        }
        finally
        {
            // stop loading
            dispatch(setLoading({isLoading: false, loadingMsg: ""}))
        }
    }

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

                {/* request for borrow button */}
                {singleBookCopy.requestable && 
                (
                    <Button
                        handleClick={handleRequestBorrow}
                    >
                        Request for Borrow
                    </Button>
                )}

                {/* handover button */}
                {singleBookCopy.canHandover &&
                (
                    <Button
                        color="green"
                        handleClick={handleInitiateHandover}
                    >
                        Handover
                    </Button>
                )}

            </div>
            {/* all copies of the book */}
            <div>

                {singleBookCopy.bookCopyTransactions.map((transaction)=>
                (
                    <BookTransactionRow
                        key={transaction.transactionId}
                        BookTransactionDTO={transaction}
                    />
                ))}

            </div>

            {/* modal */}
            <Modal
                open={showModal}
                onClose={()=>setShowModal(false)}
                center
            >

                <div className="flex items-center justify-center">
                    <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>

                        {/* heading */}
                        <h2 className="text-center text-2xl font-bold leading-tight">Verify Handover</h2>

                        {/* form */}
                        <form onSubmit={handleSubmit(handleHandover)}>
                            <div className='space-y-5'>

                                <div>
                                    {
                                        errors.otp &&
                                        <span className="flex items-center  tracking-wide text-red-500 mt-1 ml-1">
                                            {errors.otp.message}
                                        </span>
                                    }
                                    <InputField
                                        label="OTP"
                                        placeholder="Enter OTP sent to the borrower's email"

                                        // integrating react-hook-form
                                        {...register("otp", {
                                            required: "OTP is required.",
                                        })}
                                    />
                                </div>

                                <Button type="submit" className="w-full">
                                    Verify
                                </Button>
                            </div>
                        </form>

                    </div>

                </div>

            </Modal>
            

        </div>
    )

}

export default BookCopy