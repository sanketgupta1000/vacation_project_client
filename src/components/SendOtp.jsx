import React from 'react'
import {InputField, Button} from '.'
import { useNavigate, Link } from 'react-router-dom'
import { authService } from '../services'
import { useDispatch } from 'react-redux'
import { setEmail, setLoading } from '../slices'
import { useForm } from 'react-hook-form'

function SendOtp()
{

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit, formState: {errors}} = useForm()

    async function handleSendOtp(data)
    {
        setLoading({isLoading: true, loadingMsg: "Sending OTP..."})

        try
        {
            const response = await authService.sendOtp(data.email)

            if(!response.ok)
            {
                throw new Error((await response.json()).message)
            }

            dispatch(setEmail(data.email))

            navigate("/verifyEmail")
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


        <div className="flex items-center justify-center">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>

                {/* logo */}
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>

                {/* heading */}
                <h2 className="text-center text-2xl font-bold leading-tight">Get OTP</h2>

                {/* form */}
                <form onSubmit={handleSubmit(handleSendOtp)}>
                    <div className='space-y-5'>

                        <div>
                            {
                                errors.email &&
                                <span className="flex items-center  tracking-wide text-red-500 mt-1 ml-1">
                                    {errors.email.message}
                                </span>
                            }
                            <InputField
                                label="Email"
                                placeholder="Enter your email"

                                // integrating react-hook-form
                                {...register("email", {
                                    required: "Email is required.",
                                    pattern:{
                                        value: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
                                        message: "Please enter a valid email address."
                                    }
                                })}
                            />
                        </div>

                        <Button type="submit" className="w-full">
                            Send OTP
                        </Button>
                    </div>
                </form>

                <p className="mt-2 text-center text-base text-black/60">
                    <Link
                        to="/signup"
                        className=" text-primary transition-all duration-200 hover:underline"
                    >
                        Back to Signup
                    </Link>
                </p>

            </div>

        </div>


    )


}


export default SendOtp