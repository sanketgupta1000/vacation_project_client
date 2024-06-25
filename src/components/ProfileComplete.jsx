import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import {InputField, Button} from "."
import { userService } from "../services"
import { setLoading, setInfo, setToken } from "../slices"

const ProfileComplete = ()=>{

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {register, handleSubmit, formState: { errors }} = useForm()
    const jwtToken = useSelector((state)=>state.auth.token)

    const handleProfileComplete = async(data)=>{
        dispatch(setLoading({isLoading: true, loadingMsg: "Completing profile..."}))
        try
        {
            const response = await userService.completeProfile(jwtToken, data)

            if(!response.ok){
                throw new Error((await response.json()).message)
            }

            const jwt = await response.text()
            dispatch(setToken(jwt))
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

    return(
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Complete your profile
          </h2>
        </div>
    
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSubmit(handleProfileComplete)} className="space-y-6">
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
    )
}

export default ProfileComplete