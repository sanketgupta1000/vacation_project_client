import React, { useEffect, useState } from 'react'
import {InputField, Button, SelectInput} from "./"
import { useForm } from 'react-hook-form'
import {categoryService, bookUploadService} from "../services"
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setInfo, setLoading } from '../slices'

function BookUpload()
{

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const jwt = useSelector(state => state.auth.token)

    const [categories, setCategories] = useState([])

    const {register, handleSubmit, formState: {errors}} = useForm()

    // function to fetch categories
    async function fetchCategories()
    {
        dispatch(setLoading({isLoading: true, loadingMsg: "Loading..."}))

        try
        {
            const response = await categoryService.getAllCategories(jwt)

            if(!response.ok)
            {
                throw new Error((await response.json()).message)
            }

            // all good
            const data = await response.json()
            setCategories(data)
        }
        catch(error)
        {
            dispatch(setInfo({shouldShow: true, infoMsg: error.message, infoType: "error"}))
            navigate("/")
        }
        finally
        {
            dispatch(setLoading({isLoading: false, loadingMsg: ""}))
        }
    }

    // fetch categories only after initial render
    useEffect(()=>
    {
        fetchCategories()
    }, [])

    // handle book upload
    async function handleBookUpload(data)
    {
        // set loading
        dispatch(setLoading({isLoading: true, loadingMsg: "Uploading book..."}))

        try
        {
            const response = await bookUploadService.uploadBook(
                                                                data.bookTitle,
                                                                data.authorName,
                                                                data.pageCount,
                                                                data.quantity,
                                                                data.categoryId,
                                                                jwt)

            if(!response.ok)
            {
                throw new Error((await response.json()).message)
            }

            // all good
            // set info
            // console.log(await response.text())
            dispatch(setInfo({shouldShow: true, infoMsg: await response.text(), infoType: "success"}))
            // navigate to home
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

    return (
        <>

        <div class="h-full ">
        <div className=" mt-0 flex items-center justify-center">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>

                {/* heading */}
                <h2 className="text-center text-2xl font-bold leading-tight">Upload Book</h2>

                {/* form */}
                <form onSubmit={handleSubmit(handleBookUpload)}>
                    <div className='space-y-5'>

                        <div>
                            {
                                errors.bookTitle &&
                                <span className="flex items-center  tracking-wide text-red-500 mt-1 ml-1">
                                    {errors.bookTitle.message}
                                </span>
                            }
                            <InputField
                                label="Book Title"
                                placeholder="Enter book title"

                                // integrating react-hook-form
                                {...register("bookTitle", {
                                    // validation rules
                                    required: "Book title is required.",
                                })}
                            />
                        </div>

                        <div>

                            {
                                errors.authorName &&
                                <span className="flex items-center  tracking-wide text-red-500 mt-1 ml-1">
                                    {errors.authorName.message}
                                </span>
                            }

                            <InputField
                                label="Author Name"
                                placeholder="Enter book author name"
                                {...register("authorName",
                                    {
                                        required: "Author name is required.",
                                    }
                                )}
                            />
                        </div>

                        <div>
                            {
                                errors.pageCount &&
                                <span className="flex items-center  tracking-wide text-red-500 mt-1 ml-1">
                                    {errors.pageCount.message}
                                </span>
                            }
                            <InputField
                                label="Page Count"
                                type="number"
                                placeholder="Enter page count of book"
                                {...register("pageCount", {
                                    min: {
                                        value: 1,
                                        message: "Page count should be at least 1."
                                    },
                                    required: "Page count is required.",
                                })}
                            />
                        </div>

                        <div>
                            {
                                errors.quantity &&
                                <span className="flex items-center  tracking-wide text-red-500 mt-1 ml-1">
                                    {errors.quantity.message}
                                </span>
                            }
                            <InputField
                                label="Quantity"
                                placeholder="Enter number of books"
                                type="number"
                                {...register("quantity", {
                                    min: {
                                        value: 1,
                                        message: "Quantity should be at least 1."
                                    },
                                    required: "Quantity is required."
                                })}
                            />
                        </div>

                        <div>

                            <SelectInput
                                label="Category"
                                options={
                                    categories.map((category)=>(
                                        {
                                            value: category.categoryId,
                                            name: category.categoryName
                                        }
                                    ))
                                }
                                {...register("categoryId",
                                    {
                                        required: "Category is required.",
                                    }
                                )}
                            />

                        </div>

                        <Button type="submit" className="w-full">
                            Upload
                        </Button>
                    </div>
                </form>

            </div>

        </div>
        </div>
        </>

    )


}


export default BookUpload