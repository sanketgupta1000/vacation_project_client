import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { setLoading, setInfo } from "../slices";
import { userService } from "../services";
import { InputField, Button } from ".";
import { useState } from "react";

function UpdateProfile({ userData, onUpdate = null }) {
  const jwt = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [imageSrc, setImageSrc] = useState(userData.profilePhotoURL);

  function formatDate(date) {
    if (date) {
      const [day, month, year] = date?.split("-");
      return `${year}-${month}-${day}`;
    }
  }

  const handleUpdate = async (data) => {
    dispatch(setLoading({ isLoading: true, loadingMsg: "Updating Profile" }));

    try {
      const response = await userService.updateUserDetails(jwt, data);

      // custom status exceptions
      if (!response.ok) {
        const errorObj = await response.json();
        throw new Error(errorObj.message);
      }

      // show success message
      dispatch(
        setInfo({
          shouldShow: true,
          infoMsg: "Profile updated successfully",
          infoType: "success",
        })
      );
      onUpdate();
    } catch (error) {
      // show error
      dispatch(
        setInfo({ shouldShow: true, infoMsg: error.message, infoType: "error" })
      );
    } finally {
      // stop loading
      dispatch(setLoading({ isLoading: false, loadingMsg: "" }));
    }
  };

  return (
    <div className="p-8 rounded-lg shadow-2xl w-full max-w-fit">
      <div className="flex justify-center mb-6">
        <img
          src={imageSrc}
          alt="Logo"
          className="h-20 w-20 object-cover rounded-full"
        />
      </div>
      <h2 className="text-3xl font-bold text-white text-center mb-6">
        Update your profile
      </h2>
      <form onSubmit={handleSubmit(handleUpdate)} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
          <div>
            {errors.profilePhoto && (
              <span className="flex items-center  tracking-wide text-red-500 mt-1 ml-1">
                {errors.profilePhoto.message}
              </span>
            )}

            <InputField
              label="Profile Photo"
              type="file"
              placeholder="Upload your profile photo"
              onInput={(e) => {
                console.log(e.target.files);
                setImageSrc(URL.createObjectURL(e.target.files[0]));
              }}
              className="w-full px-4 py-2 mt-1 bg-gray-900 text-gray-300 border border-gray-700 rounded-md focus:outline-none focus:ring focus:border-blue-500 hover:cursor-pointer file:bg-gray-800 file:text-white file:px-4 file:py-1 file:border-none file:rounded-full"
              {...register("profilePhoto")}
            />
          </div>
          <div>
            {errors.fullName && (
              <span className="flex items-center  tracking-wide text-red-500 mt-1 ml-1">
                {errors.fullName.message}
              </span>
            )}
            <InputField
              label="Full Name"
              placeholder="Enter your Full Name"
              defaultValue={userData.fullName}
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
            {errors.phoneNumber && (
              <span className="flex items-center  tracking-wide text-red-500 mt-1 ml-1">
                {errors.phoneNumber.message}
              </span>
            )}
            <InputField
              label="Phone Number: "
              placeholder="Enter your Phone Number"
              defaultValue={userData.phoneNumber}
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
            {errors.dateOfBirth && (
              <span className="flex items-center  tracking-wide text-red-500 mt-1 ml-1">
                {errors.dateOfBirth.message}
              </span>
            )}

            <InputField
              label="Date Of birth"
              type="date"
              onClick={(e) => {
                e.currentTarget.showPicker();
              }}
              placeholder="Enter your Birth date"
              defaultValue={formatDate(userData.dateOfBirth)}
              className="w-full px-4 py-2 mt-1 bg-gray-900 text-gray-300 border border-gray-700 rounded-md focus:outline-none focus:ring focus:border-blue-500 hover:cursor-pointer"
              {...register("dateOfBirth", {
                required: "Birth date is required.",
              })}
            />
          </div>
          <div>
            {errors.houseNo && (
              <span className="flex items-center  tracking-wide text-red-500 mt-1 ml-1">
                {errors.houseNo.message}
              </span>
            )}

            <InputField
              label="House No"
              type="text"
              placeholder="Enter your House No"
              defaultValue={userData.houseNo}
              className="w-full px-4 py-2 mt-1 bg-gray-900 text-gray-300 border border-gray-700 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              {...register("houseNo", {
                required: "House No. is required.",
              })}
            />
          </div>
          <div>
            {errors.street && (
              <span className="flex items-center  tracking-wide text-red-500 mt-1 ml-1">
                {errors.street.message}
              </span>
            )}

            <InputField
              label="Street"
              type="text"
              placeholder="Enter your street"
              defaultValue={userData.street}
              className="w-full px-4 py-2 mt-1 bg-gray-900 text-gray-300 border border-gray-700 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              {...register("street", {
                required: "Street is required.",
              })}
            />
          </div>
          <div>
            {errors.landmark && (
              <span className="flex items-center  tracking-wide text-red-500 mt-1 ml-1">
                {errors.landmark.message}
              </span>
            )}

            <InputField
              label="Landmark"
              type="text"
              placeholder="Enter a landmark"
              defaultValue={userData.landmark}
              className="w-full px-4 py-2 mt-1 bg-gray-900 text-gray-300 border border-gray-700 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              {...register("landmark", {
                required: "Landmark is required.",
              })}
            />
          </div>
          <div>
            {errors.city && (
              <span className="flex items-center  tracking-wide text-red-500 mt-1 ml-1">
                {errors.city.message}
              </span>
            )}

            <InputField
              label="City"
              type="text"
              placeholder="Enter your city"
              defaultValue={userData.city}
              className="w-full px-4 py-2 mt-1 bg-gray-900 text-gray-300 border border-gray-700 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              {...register("city", {
                required: "City is required.",
              })}
            />
          </div>
          <div>
            {errors.state && (
              <span className="flex items-center  tracking-wide text-red-500 mt-1 ml-1">
                {errors.state.message}
              </span>
            )}

            <InputField
              label="State"
              type="text"
              placeholder="Enter your state"
              defaultValue={userData.state}
              className="w-full px-4 py-2 mt-1 bg-gray-900 text-gray-300 border border-gray-700 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              {...register("state", {
                required: "State is required.",
              })}
            />
          </div>
          <div>
            {errors.country && (
              <span className="flex items-center  tracking-wide text-red-500 mt-1 ml-1">
                {errors.country.message}
              </span>
            )}

            <InputField
              label="Country"
              type="text"
              placeholder="Enter your country"
              defaultValue={userData.country}
              className="w-full px-4 py-2 mt-1 bg-gray-900 text-gray-300 border border-gray-700 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              {...register("country", {
                required: "Country is required.",
              })}
            />
          </div>
        </div>
        <Button
          type="submit"
          className="w-full px-4 py-2 mt-4 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition duration-200"
        >
          Save
        </Button>
      </form>
    </div>
  );
}

export default UpdateProfile;
