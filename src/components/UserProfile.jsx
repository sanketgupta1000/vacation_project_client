import { useEffect, useRef, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link, useNavigate, useParams } from "react-router-dom"
import { setLoading, setUser, setInfo } from "../slices"
import { userService } from "../services"
import {UserAvatar, Button, Logo, InputField} from '.'

import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { useForm } from "react-hook-form"

const UserProfile = ()=>
{
    const { userId }= useParams()
    const jwt = useSelector((state)=>state.auth.token)
    const currentUserId = useSelector((state)=>state.auth.authDetails.id)
    const userData = useSelector((state)=>state.user.user)
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [isUpdatable, setIsUpdatable] = useState(false)
    const [isUpadateModalOpen, setIsUpadateModalOpen] = useState(false)
    const { register, handleSubmit, formState: {errors}} = useForm()

    const fetchData = async()=>{
        dispatch(setLoading({isLoading: true, loadingMsg: 'Loading data...'}))
        try
        {
            const response = await userService.getUserDetails(jwt, userId)
            if(!response.ok)
            {
                const errorObj = await response.json()
                throw new Error(errorObj.message)
            }
            const userData = await response.json()
            dispatch(setUser(userData))
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

    function formatDate(date)
    {
        if(date)
        {
            const [day, month, year] = date?.split('-')
            return `${year}-${month}-${day}`
        }
    }

    useEffect(()=>{
        fetchData() 
    },[userId])

    useEffect(()=>{
        setIsUpdatable(currentUserId===userData.userId? true : false)
    },[currentUserId, userData])

    const handleUpdate = async (data) =>
    {
        dispatch(setLoading({isLoading: true, loadingMsg: "Updating Profile"}))

        try
        {
            const response = await userService.updateUserDetails(jwt, data)

            // custom status exceptions
            if(!response.ok)
            {
                const errorObj = await response.json()
                throw new Error(errorObj.message)
            }

            // show success message
            dispatch(setInfo({shouldShow: true, infoMsg: await response.text(), infoType: "success"}))
            fetchData()
            setIsUpadateModalOpen(false)
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

    return (
    <div>
        <div className="md:grid grid-cols-4 grid-rows-2  bg-white gap-2 p-4 rounded-xl">
            <div className="md:col-span-1 h-screen shadow-xl ">
                <div className="flex w-full h-full relative">
                    <img src="https://res.cloudinary.com/dboafhu31/image/upload/v1625318266/imagen_2021-07-03_091743_vtbkf8.png" className="w-44 h-44 m-auto" alt=""/>
                </div>
            </div>
            <div className="md:col-span-3 h-screen shadow-xl p-4 space-y-2">
                <div className="flex ">
                    <span
                        className="text-sm  font-bold uppercase border-2 rounded-l px-4 py-2 bg-gray-50 whitespace-no-wrap w-2/6">User Id:</span>
                    <input 
                        className="px-4 border-l-0 cursor-default border-gray-300 focus:outline-none  rounded-md rounded-l-none shadow-sm -ml-1 w-4/6"
                        type="text" value={userData.userId}  readOnly/>
                </div>
                <div className="flex ">
                    <span
                        className="text-sm  font-bold uppercase border-2 rounded-l px-4 py-2 bg-gray-50 whitespace-no-wrap w-2/6">Name:</span>
                    <input 
                        className="px-4 border-l-0 cursor-default border-gray-300 focus:outline-none  rounded-md rounded-l-none shadow-sm -ml-1 w-4/6"
                        type="text" value={userData.fullName}  readOnly/>
                </div>
                <div className="flex ">
                    <span
                        className="text-sm  font-bold uppercase border-2 rounded-l px-4 py-2 bg-gray-50 whitespace-no-wrap w-2/6">Role:</span>
                    <input 
                        className="px-4 border-l-0 cursor-default border-gray-300 focus:outline-none  rounded-md rounded-l-none shadow-sm -ml-1 w-4/6"
                        type="text" value={userData.userType}  readOnly/>
                </div>
                <div className="flex ">
                    <span
                        className="text-sm font-bold uppercase border-2 rounded-l px-4 py-2 bg-gray-50 whitespace-no-wrap w-2/6">Date of birth:</span>
                    <input 
                        className="px-4 border-l-0 cursor-default border-gray-300 focus:outline-none  rounded-md rounded-l-none shadow-sm -ml-1 w-4/6"
                        type="text" value={userData.dateOfBirth}  readOnly/>
                </div>
                 <div className="flex ">
                    <span
                        className="text-sm  font-bold uppercase border-2 rounded-l px-4 py-2 bg-gray-50 whitespace-no-wrap w-2/6">Email:</span>
                    <input 
                        className="px-4 border-l-0 cursor-default border-gray-300 focus:outline-none  rounded-md rounded-l-none shadow-sm -ml-1 w-4/6"
                        type="text" value={userData.email}  readOnly/>
                </div>
                 <div className="flex ">
                    <span
                        className="text-sm  font-bold uppercase border-2 rounded-l px-4 py-2 bg-gray-50 whitespace-no-wrap w-2/6">Phone Number:</span>
                    <input 
                        className="px-4 border-l-0 cursor-default border-gray-300 focus:outline-none  rounded-md rounded-l-none shadow-sm -ml-1 w-4/6"
                        type="text" value={userData.phoneNumber}  readOnly/>
                </div>
                 <div className="flex ">
                    <span
                        className="text-sm  font-bold uppercase border-2 rounded-l px-4 py-2 bg-gray-50 whitespace-no-wrap w-2/6">Address:</span>
                    <input 
                        className="px-4 border-l-0 cursor-default border-gray-300 focus:outline-none  rounded-md rounded-l-none shadow-sm -ml-1 w-4/6"
                        type="text" value={`${userData.houseNo}, ${userData.street}, near ${userData.landmark}, ${userData.city}, ${userData.state}, ${userData.country}`}  readOnly/>
                </div>
                 <div className="flex ">
                    <span className="text-sm  font-bold uppercase border-2 rounded-l px-4 py-2 bg-gray-50 whitespace-no-wrap w-2/6">Reference:</span>
                    <Link to={`/users/${userData.referrerId}`}>
                        <UserAvatar user={{id:userData.referrerId, name: userData.referrerName, email: userData.referrerEmail}} />
                    </Link>
                </div>
                {
                    isUpdatable ? 
                    <div>
                        <Button color='blue' handleClick={()=>setIsUpadateModalOpen(true)}>Update</Button>
                        <Modal open={isUpadateModalOpen} onClose={()=>setIsUpadateModalOpen(false)} center>
                            <div className="flex items-center justify-center">
                                <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>

                                    {/* logo */}
                                    <div className="mb-2 flex justify-center">
                                        <span className="inline-block w-full max-w-[100px]">
                                            <Logo width="100%" />
                                        </span>
                                    </div>

                                    {/* heading */}
                                    <h2 className="text-center text-2xl font-bold leading-tight">Update your profile</h2>

                                    {/* form */}
                                    <form onSubmit={handleSubmit(handleUpdate)}>
                                        <div>
                                            {
                                                errors.fullName &&
                                                <span className="flex items-center  tracking-wide text-red-500 mt-1 ml-1">
                                                    {errors.fullName.message}
                                                </span>
                                            }
                                            <InputField
                                                label="Full Name"
                                                placeholder="Enter your Full Name"
                                                defaultValue={userData.fullName}
                                                // integrating react-hook-form
                                                {...register("fullName", {
                                                    // validation rules
                                                    minLength: {
                                                        value: 5,
                                                        message: "Full Name should be at least 5 characters long."
                                                    },
                                                    required: "Full Name is required.",
                                                })}
                                            />
                                        </div>
                                        <div>
                                            {
                                                errors.phoneNumber &&
                                                <span className="flex items-center  tracking-wide text-red-500 mt-1 ml-1">
                                                    {errors.phoneNumber.message}
                                                </span>
                                            }
                                            <InputField
                                                label="Phone Number: "
                                                placeholder="Enter your Phone Number"
                                                type="tel"
                                                defaultValue={userData.phoneNumber}
                                                {...register("phoneNumber", {
                                                    required: "Phone Number is required.",
                                                    pattern: {
                                                        value: /^[0-9]{10}$/g,
                                                        message: "Please enter a valid 10 digit phone number."
                                                    }
                                                })}
                                            />
                                        </div>
                                        <div>
                                            {
                                                errors.dateOfBirth &&
                                                <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                                                    {errors.dateOfBirth.message}
                                                </span>
                                            }
                                                    
                                            <InputField
                                                label='Date Of birth'
                                                type='date'
                                                placeholder='Enter your Birth date'
                                                defaultValue={formatDate(userData.dateOfBirth)}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                {
                                                ...register('dateOfBirth',{
                                                    required: "Birth date is required.",
                                                })
                                                }
                                            />
                                        </div>
                                        <div>
                                            {
                                                errors.houseNo &&
                                                <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                                                    {errors.houseNo.message}
                                                </span>
                                            }
                                                    
                                            <InputField
                                                label='House No'
                                                type='text'
                                                placeholder='Enter your House No'
                                                defaultValue={userData.houseNo}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                {
                                                ...register('houseNo',{
                                                    required: "House No. is required.",
                                                })
                                                }
                                            />
                                        </div>
                                        <div>
                                            {
                                                errors.street &&
                                                <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                                                    {errors.street.message}
                                                </span>
                                            }
                                                    
                                            <InputField
                                                label='Street'
                                                type='text'
                                                placeholder='Enter your street'
                                                defaultValue={userData.street}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                {
                                                ...register('street',{
                                                    required: "Street is required.",
                                                })
                                                }
                                            />
                                        </div>
                                        <div>
                                            {
                                                errors.landmark &&
                                                <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                                                    {errors.landmark.message}
                                                </span>
                                            }
                                                    
                                            <InputField
                                                label='Landmark'
                                                type='text'
                                                placeholder='Enter a landmark'
                                                defaultValue={userData.landmark}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                {
                                                ...register('landmark',{
                                                    required: "Landmark is required.",
                                                })
                                                }
                                            />
                                        </div>
                                        <div>
                                            {
                                                errors.city &&
                                                <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                                                    {errors.city.message}
                                                </span>
                                            }
                                                    
                                            <InputField
                                                label='City'
                                                type='text'
                                                placeholder='Enter your city'
                                                defaultValue={userData.city}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                {
                                                ...register('city',{
                                                    required: "City is required.",
                                                })
                                                }
                                            />
                                        </div>
                                        <div>
                                            {
                                                errors.state &&
                                                <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                                                    {errors.state.message}
                                                </span>
                                            }
                                                    
                                            <InputField
                                                label='State'
                                                type='text'
                                                placeholder='Enter your state'
                                                defaultValue={userData.state}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                {
                                                ...register('state',{
                                                    required: "State is required.",
                                                })
                                                }
                                            />
                                        </div>
                                        <div>
                                            {
                                                errors.country &&
                                                <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                                                    {errors.country.message}
                                                </span>
                                            }
                                                    
                                            <InputField
                                                label='Country'
                                                type='text'
                                                placeholder='Enter your country'
                                                defaultValue={userData.country}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                {
                                                ...register('country',{
                                                    required: "Country is required.",
                                                })
                                                }
                                            />
                                        </div>
                                        <div>
                                            <Button
                                                type="submit"
                                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                            >
                                                Save
                                            </Button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </Modal>
                    </div>
                    :
                    <></>
                }
            </div>
        </div>
    </div>
    )
}

export default UserProfile