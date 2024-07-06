import React from "react";
import { useForm } from "react-hook-form";
import { setLoading, setInfo, setEmail } from "../slices";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../services";
import { InputField, Button, Logo, BackGround } from "./";
import ReferrerSelector from "./ReferrerSelector";

const Signup = () => {
  // useForm to include react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // signup submit handler
  async function handleSignup(data) {
    // set loading
    dispatch(setLoading({ isLoading: true, loadingMsg: "Signing up..." }));

    try {
      console.log(Number(data.referrerId));

      // signup
      const response = await authService.signup(
        data.email,
        data.password,
        data.fullName,
        data.phoneNumber,
        data.referrerId !== "no-referrer" ? Number(data.referrerId) : null
      );

      // custom status exceptions
      if (!response.ok) {
        const errorObj = await response.json();
        throw new Error(errorObj.message);
      }

      // show success message
      dispatch(
        setInfo({
          shouldShow: true,
          infoMsg: await response.text(),
          infoType: "success",
        })
      );

      // set email for verification
      dispatch(setEmail(data.email));

      // navigate to verify email
      navigate("/verifyEmail");
    } catch (error) {
      // show error
      dispatch(
        setInfo({ shouldShow: true, infoMsg: error.message, infoType: "error" })
      );
    } finally {
      // stop loading
      dispatch(setLoading({ isLoading: false, loadingMsg: "" }));
    }
  }

  return (
    <BackGround>
      <div className="bg-white bg-opacity-10 p-8 rounded-lg shadow-2xl shadow-yellow-400/30 w-full max-w-md">
        <div className="flex justify-center mb-6">
          <img
            src="https://picsum.photos/id/237/200/300"
            alt="Logo"
            className="h-20 w-20 object-cover rounded-full"
          />
        </div>
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit(handleSignup)} className="space-y-4">
          <div>
            {errors.fullName && (
              <span className="flex items-center  tracking-wide text-red-500 mt-1 ml-1">
                {errors.fullName.message}
              </span>
            )}
            <InputField
              label="Full Name"
              placeholder="Enter your Full Name"
              className="w-full px-4 py-2 mt-1 bg-gray-900 text-gray-300 border border-gray-700 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              // integrating react-hook-form
              {...register("fullName", {
                // validation rules
                minLength: {
                  value: 5,
                  message: "Full Name should be at least 5 characters long.",
                },
                required: "Full Name is required.",
              })}
            />
          </div>
          <div>
            {errors.email && (
              <span className="flex items-center  tracking-wide text-red-500 mt-1 ml-1">
                {errors.email.message}
              </span>
            )}

            <InputField
              label="Email: "
              placeholder="Enter your Email"
              className="w-full px-4 py-2 mt-1 bg-gray-900 text-gray-300 border border-gray-700 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              type="email"
              {...register("email", {
                required: "Email is required.",
                pattern: {
                  value:
                    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
                  message: "Please enter a valid email address.",
                },
              })}
            />
          </div>
          <div>
            {errors.password && (
              <span className="flex items-center  tracking-wide text-red-500 mt-1 ml-1">
                {errors.password.message}
              </span>
            )}
            <InputField
              label="Password: "
              type="password"
              placeholder="Enter your Password"
              className="w-full px-4 py-2 mt-1 bg-gray-900 text-gray-300 border border-gray-700 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              {...register("password", {
                minLength: {
                  value: 8,
                  message: "Password should be at least 8 characters long.",
                },
                required: "Password is required.",
              })}
            />
          </div>
          <div>
            {errors.phoneNumber && (
              <span className="flex items-center  tracking-wide text-red-500 mt-1 ml-1">
                {errors.phoneNumber.message}
              </span>
            )}
            <InputField
              label="Phone Number: "
              placeholder="Enter your Phone Number"
              className="w-full px-4 py-2 mt-1 bg-gray-900 text-gray-300 border border-gray-700 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              type="tel"
              {...register("phoneNumber", {
                required: "Phone Number is required.",
                pattern: {
                  value: /^[0-9]{10}$/g,
                  message: "Please enter a valid 10 digit phone number.",
                },
              })}
            />
          </div>
          <div>
            {/* referrer */}
            <ReferrerSelector
              setValue={setValue}
              className="w-full px-4 py-2 mt-1 bg-gray-900 text-gray-300 border border-gray-700 rounded-l-md focus:outline-none focus:ring focus:border-blue-500"
              {...register("referrerId", {})}
            />
          </div>
          <Button
            type="submit"
            className="w-full px-4 py-2 mt-4 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition duration-200"
          >
            Signup
          </Button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-300">
            Already a member?{" "}
            <Link
              to="/login"
              className="text-blue-400 hover:text-blue-500 transition duration-200"
            >
              Login
            </Link>
            .
          </p>
          <p className="text-gray-300 mt-2">
            Already signed up, but not verified?{" "}
            <Link
              to="/sendOtp"
              className="text-blue-400 hover:text-blue-500 transition duration-200"
            >
              Verify Email
            </Link>
            .
          </p>
        </div>
      </div>
    </BackGround>
  );
};

export default Signup;
