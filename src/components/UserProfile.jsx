import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { setLoading, setUser, setInfo } from "../slices";
import { userService } from "../services";
import { UserAvatar, Button, Logo, InputField, BackGround } from ".";
import { Modal } from "react-responsive-modal";
import { useForm } from "react-hook-form";
import "react-responsive-modal/styles.css";

const UserProfile = () => {
  const { userId } = useParams();
  const jwt = useSelector((state) => state.auth.token);
  const currentUserId = useSelector((state) => state.auth.authDetails.id);
  const userData = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [isUpdatable, setIsUpdatable] = useState(false);
  const [isUpadateModalOpen, setIsUpadateModalOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const fetchData = async () => {
    dispatch(setLoading({ isLoading: true, loadingMsg: "Loading data..." }));
    try {
      const response = await userService.getUserDetails(jwt, userId);
      if (!response.ok) {
        const errorObj = await response.json();
        throw new Error(errorObj.message);
      }
      const userData = await response.json();
      dispatch(setUser(userData));
    } catch (error) {
      dispatch(
        setInfo({ shouldShow: true, infoMsg: error.message, infoType: "error" })
      );
      navigate("/");
    } finally {
      dispatch(setLoading({ isLoading: false, loadingMsg: "" }));
    }
  };

  function formatDate(date) {
    if (date) {
      const [day, month, year] = date?.split("-");
      return `${year}-${month}-${day}`;
    }
  }

  useEffect(() => {
    fetchData();
  }, [userId]);

  useEffect(() => {
    setIsUpdatable(currentUserId === userData.userId ? true : false);
  }, [currentUserId, userData]);

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
      fetchData();
      setIsUpadateModalOpen(false);
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
    <BackGround>
      <div className="p-4 w-full bg-white bg-opacity-10 rounded-lg shadow-2xl shadow-green-400/30 max-w-4xl text-white">
        <div className="flex flex-col items-center mb-8">
          <img
            src={userData.profilePhotoURL}
            alt="Profile"
            className="aspect-square w-28 sm:w-40 object-cover rounded-full border-4 border-gray-700 shadow-lg"
          />
          <h1 className="text-2xl sm:text-4xl font-bold mt-4">
            {userData.fullName}
          </h1>
          <p className="text-xl sm:text-2xl text-gray-400">
            Id: @{userData.userId}
          </p>
          <p className="text-xl sm:text-2xl text-gray-400">
            Role: {userData.userType}
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-black/30 p-4 rounded-lg shadow-md shadow-red-400/60  lg:col-span-2">
            <h2 className="text-xl font-semibold mb-2">Personal Information</h2>
            <p className="py-1">
              <strong>Email:</strong> {userData.email}
            </p>
            <p className="py-1">
              <strong>Phone Number:</strong> {userData.phoneNumber}
            </p>
            <p className="py-1">
              <strong>Date of Birth:</strong> {userData.dateOfBirth}
            </p>
          </div>
          <div className="bg-white bg-opacity-30 p-4 rounded-lg shadow-md shadow-red-400/60">
            <h2 className="text-xl font-semibold mb-2">Address</h2>
            <p className="py-1">{`${userData.houseNo}, ${userData.street}`}</p>
            <p className="py-1">
              <strong>Landmark:</strong> {userData.landmark}
            </p>
            <p className="py-1">
              {`${userData.city}, ${userData.state}, ${userData.country}`}
            </p>
          </div>
          <div className="bg-purple-500 bg-opacity-30 p-4 rounded-lg shadow-md shadow-red-400/60 sm:col-span-2 lg:col-span-3">
            <h2 className="text-xl font-semibold mb-2">
              Additional Information
            </h2>
            <p className="py-1">
              <strong>Reference Person:</strong>
              <span>
                {userData.referrerId ? (
                  <Link to={`/users/${userData.referrerId}`}>
                    <UserAvatar
                      user={{
                        id: userData.referrerId,
                        name: userData.referrerName,
                        email: userData.referrerEmail,
                      }}
                    />
                  </Link>
                ) : (
                  <p className="px-4 border-l-0 cursor-default border-gray-300 focus:outline-none  rounded-md rounded-l-none shadow-sm -ml-1 w-4/6">
                    ( No reference )
                  </p>
                )}
              </span>
            </p>
            <p className="py-1">
              <strong>Join Date:</strong>
              <p>{userData.joinDate}</p>
            </p>
          </div>
        </div>
      </div>
    </BackGround>
  );
};

export default UserProfile;
