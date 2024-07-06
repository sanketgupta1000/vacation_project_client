import React from "react";
import { Button, InputField, BackGround } from "./";
import { useForm } from "react-hook-form";
import { authService } from "../services";
import { useDispatch, useSelector } from "react-redux";
import { setInfo, setLoading } from "../slices";
import { useNavigate, Link } from "react-router-dom";

function EmailVerification() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const email = useSelector((state) => state.auth.email);

  async function handleVerification(data) {
    // set loading
    dispatch(setLoading({ isLoading: true, loadingMsg: "Verifying email..." }));

    try {
      const response = await authService.verifyOtp(email, data.otp);

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

      // navigate to login
      navigate("/login");
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

  async function handleResendOtp(e) {
    e.preventDefault();
    // set loading
    dispatch(setLoading({ isLoading: true, loadingMsg: "Resending OTP..." }));

    try {
      const response = await authService.sendOtp(email);

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
      <div className="bg-white bg-opacity-10 p-8 rounded-lg shadow-2xl shadow-pink-600/30 w-full max-w-md">
        <div className="flex justify-center mb-6">
          <img
            src="https://picsum.photos/id/237/200/300"
            alt="Logo"
            className="h-20 w-20 object-cover rounded-full"
          />
        </div>
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Verify Email
        </h2>
        <span className="flex items-center justify-center tracking-wide text-blue-500 m-1">
          Email : {email}
        </span>
        <form onSubmit={handleSubmit(handleVerification)} className="space-y-4">
          <div>
            {errors.otp && (
              <span className="flex items-center  tracking-wide text-red-500 mt-1 ml-1">
                {errors.otp.message}
              </span>
            )}
            <InputField
              label="OTP"
              placeholder="Enter OTP sent to your email"
              className="w-full px-4 py-2 mt-1 bg-gray-900 text-gray-300 border border-gray-700 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              // integrating react-hook-form
              {...register("otp", {
                required: "OTP is required.",
              })}
            />
          </div>
          <Button
            type="submit"
            className="w-full px-4 py-2 mt-4 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition duration-200"
          >
            Verify
          </Button>
        </form>
        <div className="mt-6 text-center">
          {/* resend otp */}
          <p className="text-gray-300 mt-2">
            Didn't receive OTP?{" "}
            <a
              onClick={handleResendOtp}
              className="text-blue-400 hover:text-blue-500 hover:cursor-pointer transition duration-200"
            >
              Resend
            </a>
            .
          </p>
        </div>
      </div>
    </BackGround>
  );
}

export default EmailVerification;
