import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import {InputField, Button} from "."
import { authService } from "../services"
import { setToken, setLoading, setInfo, } from "../slices"


const Login = ({})=>
{
    const dispatch = useDispatch()
    // const navigate = useNavigate()
    const {register, handleSubmit, formState: { errors }} = useForm()

    const handleLogin = async(data)=>{
        dispatch(setLoading({ loading: true, loadingMsg: "Logging in..." }))
        try
        {
            const response = await authService.login(data)

            if(!response.ok){
                const errorMsg = response.status == 401 ? "Invlaid Email or Password" : (await response.json()).message 
                throw new Error(errorMsg)
            }

            const jwt = await response.text()

            dispatch(setToken(jwt))
            console.log('success')
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
            Login to your account
            </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
                <div>
                    {
                        errors.email &&
                        <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                            {errors.email.message}
                        </span>
                    }
                    
                    <InputField
                        label='Email'
                        type='email'
                        placeholder='Enter your email.'
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        {
                            ...register('email',{
                                required: "Email is required.",
                                pattern:{
                                    value:/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
                                    message: 'Invalid Email'
                                }
                            })
                        }
                    />
                </div>

                <div>
                    {
                        errors.password &&
                        <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                            {errors.password.message}
                        </span>
                    }
                    <InputField
                        label='Password'
                        type='password'
                        placeholder='Enter password'
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        {
                            ...register('password',{
                                required: 'Password is Required'

                            })
                        }
                    />
                </div>

                <div>
                    <Button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Login
                    </Button>
                </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{' '}
            {/* <Link to="/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                Request Membership here
            </Link> */}
            </p>
        </div>
    </div>
    )
}

export default Login