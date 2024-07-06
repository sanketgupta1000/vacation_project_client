import React from "react";
import { useForm } from "react-hook-form";
import { setToken, setLoading, setInfo } from "../slices";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../services";
import { InputField, Button, BackGround } from ".";

const Login = ({}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = async (data) => {
    dispatch(setLoading({ isLoading: true, loadingMsg: "Logging in..." }));
    try {
      const response = await authService.login(data);

      if (!response.ok) {
        const errorMsg =
          response.status == 401
            ? "Invalid Email or Password"
            : (await response.json()).message;
        throw new Error(errorMsg);
      }

      const jwt = await response.text();

      dispatch(setToken(jwt));
      //             console.log('success')

      dispatch(
        setInfo({
          shouldShow: true,
          infoMsg: "Logged in successfully",
          infoType: "success",
        })
      );

      // navigate to home
      navigate("/");
    } catch (error) {
      dispatch(
        setInfo({ shouldShow: true, infoMsg: error.message, infoType: "error" })
      );
    } finally {
      dispatch(setLoading({ isLoading: false, loadingMsg: "" }));
    }
  };

  return (
    <BackGround>
      <div className="bg-white bg-opacity-10 p-8 rounded-lg shadow-2xl shadow-green-400/30 w-full max-w-md">
        <div className="flex justify-center mb-6">
          <img
            src="https://picsum.photos/id/237/200/300"
            alt="Logo"
            className="h-20 w-20 object-cover rounded-full"
          />
        </div>
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Login
        </h2>
        <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
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
          <div>
            {errors.password && (
              <span className="flex items-center  tracking-wide text-red-500 mt-1 ml-1">
                {errors.password.message}
              </span>
            )}
            <InputField
              label="Password"
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 mt-1 bg-gray-900 text-gray-300 border border-gray-700 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              {...register("password", {
                required: "Password is Required",
              })}
            />
          </div>
          <Button
            type="submit"
            className="w-full px-4 py-2 mt-4 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition duration-200"
          >
            Login
          </Button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-300">
            Not registered?{" "}
            <Link
              to="/login"
              className="text-blue-400 hover:text-blue-500 transition duration-200"
            >
              Register here
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

export default Login;
