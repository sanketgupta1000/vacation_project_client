import React from 'react'
import { useForm } from 'react-hook-form'
import { setLoading, setInfo, setEmail } from '../slices'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { authService } from '../services'
import { InputField, Button, Logo } from './'


function Signup()
{

    // useForm to include react hook form
    const { register, handleSubmit} = useForm()

    const dispatch = useDispatch()
    // const navigate = useNavigate()

    // signup submit handler
    async function handleSignup(data)
    {
        // set loading
        dispatch(setLoading({isLoading: true, loadingMsg: "Signing up..."}))

        try
        {
            // signup
            const response = await authService.signup(
                data.email,
                data.password,
                data.fullName,
                data.phoneNumber,
                (data.referrerId!="") ? Number(data.referrerId) : null
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
            // navigate("/verifyEmail")
            console.log("Signup successful")

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

                        <InputField
                            label="Full Name"
                            placeholder="Enter your Full Name"

                            // integrating react-hook-form
                            {...register("fullName", {
                                // validation rules
                                minLength: 5,
                                required: true,
                            })}
                        />

                        <InputField
                            label="Email: "
                            placeholder="Enter your Email"
                            type="email"
                            {...register("email",
                                {
                                    required: true,
                                    pattern: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
                                }
                            )}
                        />

                        <InputField
                            label="Password: "
                            type="password"
                            placeholder="Enter your Password"
                            {...register("password", {
                                minLength: 8,
                                required: true,
                            })}
                        />

                        <InputField
                            label="Phone Number: "
                            placeholder="Enter your Phone Number"
                            type="tel"
                            {...register("phoneNumber", {
                                required: true,
                                pattern: /^[0-9]{10}$/g,
                            })}
                        />

                        {/* referrer id */}
                        {/* TODO: create a searchable drop down of users for this */}
                        <InputField
                            label="Referrer ID: "
                            placeholder="Enter Referrer ID"
                            {...register("referrerId")}
                        />

                        <Button type="submit" className="w-full">
                            Signup
                        </Button>
                    </div>
                </form>

                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <a
                        href="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Login
                    </a>
                </p>

            </div>

        </div>


    )


}


export default Signup