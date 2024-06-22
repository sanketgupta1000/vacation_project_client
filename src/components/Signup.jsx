import React from 'react'
import { useForm } from 'react-hook-form'
import { setLoading, setInfo, setEmail } from '../slices'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { authService } from '../services'
import { InputField, Button, Logo } from './'
import ReferrerSelector from './ReferrerSelector'


function Signup()
{

    // useForm to include react hook form
    const { register, handleSubmit, formState: {errors}} = useForm()

    const dispatch = useDispatch()
    const navigate = useNavigate()

    // signup submit handler
    async function handleSignup(data)
    {
        // set loading
        dispatch(setLoading({isLoading: true, loadingMsg: "Signing up..."}))

        try
        {

            // console.log(Number(data.referrerId))

            // signup
            const response = await authService.signup(
                data.email,
                data.password,
                data.fullName,
                data.phoneNumber,
                (data.referrerId!=="no-referrer") ? Number(data.referrerId) : null
            )

            // custom status exceptions
            if(!response.ok)
            {
                const errorObj = await response.json()
                throw new Error(errorObj.message)
            }

            // show success message
            dispatch(setInfo({shouldShow: true, infoMsg: await response.text(), infoType: "success"}))
            
            // set email for verification
            dispatch(setEmail(data.email))

            // navigate to verify email
            navigate("/verifyEmail")

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
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>

                {/* form */}
                <form onSubmit={handleSubmit(handleSignup)}>
                    <div className='space-y-5'>

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
                                errors.email &&
                                <span className="flex items-center  tracking-wide text-red-500 mt-1 ml-1">
                                    {errors.email.message}
                                </span>
                            }

                            <InputField
                                label="Email: "
                                placeholder="Enter your Email"
                                type="email"
                                {...register("email",
                                    {
                                        required: "Email is required.",
                                        pattern:{
                                            value: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
                                            message: "Please enter a valid email address."
                                        }
                                    }
                                )}
                            />
                        </div>

                        <div>
                            {
                                errors.password &&
                                <span className="flex items-center  tracking-wide text-red-500 mt-1 ml-1">
                                    {errors.password.message}
                                </span>
                            }
                            <InputField
                                label="Password: "
                                type="password"
                                placeholder="Enter your Password"
                                {...register("password", {
                                    minLength: {
                                        value: 8,
                                        message: "Password should be at least 8 characters long."
                                    },
                                    required: "Password is required.",
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
                                {...register("phoneNumber", {
                                    required: "Phone Number is required.",
                                    pattern: {
                                        value: /^[0-9]{10}$/g,
                                        message: "Please enter a valid 10 digit phone number."
                                    }
                                })}
                            />
                        </div>

                        {/* referrer */}
                        <ReferrerSelector
                            {...register("referrerId", {})}
                        />

                        <Button type="submit" className="w-full">
                            Signup
                        </Button>
                    </div>
                </form>

                <p className="mt-2 text-center text-base text-black/60">
                    Already a member?&nbsp;
                    <Link
                        to="/login"
                        className=" text-primary transition-all duration-200 hover:underline"
                    >
                        Login
                    </Link>
                </p>

                <p className="mt-2 text-center text-base text-black/60">
                    Already signed up?&nbsp;
                    <Link
                        to="/sendOtp"
                        className=" text-primary transition-all duration-200 hover:underline"
                    >
                        Verify Email
                    </Link>
                </p>

            </div>

        </div>


    )


}


export default Signup