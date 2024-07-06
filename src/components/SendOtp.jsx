import React from "react";
import { InputField, Button, BackGround } from ".";
import { useNavigate, Link } from "react-router-dom";
import { authService } from "../services";
import { useDispatch } from "react-redux";
import { setEmail, setLoading, setInfo } from "../slices";
import { useForm } from "react-hook-form";

function SendOtp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function handleSendOtp(data) {
    dispatch(setLoading({ isLoading: true, loadingMsg: "Sending OTP..." }));

    try {
      const response = await authService.sendOtp(data.email);

      if (!response.ok) {
        throw new Error((await response.json()).message);
      }

      dispatch(setEmail(data.email));

      // show success message
      dispatch(
        setInfo({
          shouldShow: true,
          infoMsg: await response.text(),
          infoType: "success",
        })
      );

      navigate("/verifyEmail");
    } catch (error) {
      dispatch(
        setInfo({ shouldShow: true, infoMsg: error.message, infoType: "error" })
      );
    } finally {
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
          Get OTP
        </h2>
        <form onSubmit={handleSubmit(handleSendOtp)} className="space-y-4">
          <div>
            {errors.email && (
              <span className="flex items-center  tracking-wide text-red-500 mt-1 ml-1">
                {errors.email.message}
              </span>
            )}

            <InputField
              label="Email"
              type="email"
              placeholder="Enter your email."
              className="w-full px-4 py-2 mt-1 bg-gray-900 text-gray-300 border border-gray-700 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              {...register("email", {
                required: "Email is required.",
                pattern: {
                  value:
                    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
                  message: "Invalid Email",
                },
              })}
            />
          </div>
          <Button
            type="submit"
            className="w-full px-4 py-2 mt-4 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition duration-200"
          >
            Send OTP
          </Button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-300">
            Not registered?{" "}
            <Link
              to="/signup"
              className="text-blue-400 hover:text-blue-500 transition duration-200"
            >
              Register here
            </Link>
            .
          </p>
          <p className="text-gray-300 mt-2">
            Already a member?{" "}
            <Link
              to="/login"
              className="text-blue-400 hover:text-blue-500 transition duration-200"
            >
              Login here
            </Link>
            .
          </p>
        </div>
      </div>
    </BackGround>
  );
}

export default SendOtp;
