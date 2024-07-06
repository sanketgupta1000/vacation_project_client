import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { InputField, Button, BackGround } from ".";
import { userService } from "../services";
import { setLoading, setInfo, setToken } from "../slices";

const ProfileComplete = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const jwtToken = useSelector((state) => state.auth.token);

  const handleProfileComplete = async (data) => {
    dispatch(
      setLoading({ isLoading: true, loadingMsg: "Completing profile..." })
    );
    try {
      console.log(data);
      const response = await userService.completeProfile(jwtToken, data);

      if (!response.ok) {
        throw new Error((await response.json()).message);
      }

      const jwt = await response.text();
      dispatch(setToken(jwt));
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
      <div className="bg-white bg-opacity-10 p-8 rounded-lg shadow-2xl shadow-yellow-400/30 w-full max-w-fit">
        <div className="flex justify-center mb-6">
          <img
            src="https://picsum.photos/id/237/200/300"
            alt="Logo"
            className="h-20 w-20 object-cover rounded-full"
          />
        </div>
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Complete your profile
        </h2>
        <form
          onSubmit={handleSubmit(handleProfileComplete)}
          className="space-y-4"
        >
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            <div>
              {errors.dateOfBirth && (
                <span className="flex items-center  tracking-wide text-red-500 mt-1 ml-1">
                  {errors.dateOfBirth.message}
                </span>
              )}

              <InputField
                label="Profile Photo"
                type="file"
                placeholder="Upload your profile photo"
                className="w-full px-4 py-2 mt-1 bg-gray-900 text-gray-300 border border-gray-700 rounded-md focus:outline-none focus:ring focus:border-blue-500 hover:cursor-pointer file:bg-gray-800 file:text-white file:px-4 file:py-1 file:border-none file:rounded-full"
                {...register("profilePhoto", {
                  required: "Profile Photo is required.",
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
    </BackGround>
  );
};

export default ProfileComplete;
