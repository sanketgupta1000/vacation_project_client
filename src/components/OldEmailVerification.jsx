import React from 'react'
import {Button, InputField, Logo} from './'
import {useForm} from 'react-hook-form'
import { authService } from '../services'
import { useDispatch, useSelector } from 'react-redux'
import { setInfo, setLoading } from '../slices'
import { useNavigate } from 'react-router-dom'


function EmailVerification()
{

    const {register, handleSubmit, formState: {errors}} = useForm()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const email = useSelector(state=>state.auth.email)

    async function handleVerification(data)
    {
        // set loading
        dispatch(setLoading({isLoading: true, loadingMsg: "Verifying email..."}))

        try
        {
            const response = await authService.verifyOtp(email, data.otp)

            // custom status exceptions
            if(!response.ok)
            {
                const errorObj = await response.json()
                throw new Error(errorObj.message)
            }

            // show success message
            dispatch(setInfo({shouldShow: true, infoMsg: await response.text(), infoType: "success"}))

            // navigate to login
            navigate("/login")
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

    async function handleResendOtp(e)
    {
        e.preventDefault()
        // set loading
        dispatch(setLoading({isLoading: true, loadingMsg: "Resending OTP..."}))

        try
        {
            const response = await authService.sendOtp(email)

            // custom status exceptions
            if(!response.ok)
            {
                const errorObj = await response.json()
                throw new Error(errorObj.message)
            }

            // show success message
            dispatch(setInfo({shouldShow: true, infoMsg: await response.text(), infoType: "success"}))

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


        <div className="flex items-center justify-center">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>

                {/* logo */}
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>

                {/* heading */}
                <h2 className="text-center text-2xl font-bold leading-tight">Verify Email</h2>

                {/* form */}
                <form onSubmit={handleSubmit(handleVerification)}>
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
                                placeholder="Enter OTP sent to your email"

                                // integrating react-hook-form
                                {...register("otp", {
                                    required: "OTP is required.",
                                })}
                            />
                        </div>

                        <Button type="submit" className="w-full">
                            Verify
                        </Button>
                        {/* resend otp */}
                        <Button
                            className='w-full'
                            handleClick={handleResendOtp}
                        >
                            Resend OTP
                        </Button>
                    </div>
                </form>


            </div>

        </div>


    )


}


export default EmailVerification