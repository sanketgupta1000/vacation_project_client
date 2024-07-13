import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { setLoading, setUser, setInfo } from "../slices";
import { userService } from "../services";
import { UserAvatar, BackGround, UpdateProfile } from ".";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import "../styles/modal.css";

const UserProfile = () => {
  const { userId } = useParams();
  const jwt = useSelector((state) => state.auth.token);
  const currentUserId = useSelector((state) => state.auth.authDetails.id);
  const userData = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [isUpdatable, setIsUpdatable] = useState(false);
  const [isUpadateModalOpen, setIsUpadateModalOpen] = useState(false);

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

  useEffect(() => {
    fetchData();
  }, [userId]);

  useEffect(() => {
    setIsUpdatable(currentUserId === userData.userId ? true : false);
  }, [currentUserId, userData]);

  return (
    <BackGround>
      <div className="p-4 grid grid-cols-1 md:grid-cols-3 w-full bg-white bg-opacity-10 rounded-lg shadow-2xl shadow-green-400/30 text-white">
        <div className="flex flex-col items-center mb-8 md:col-span-1  text-center">
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
          {isUpdatable ? (
            <div>
              <button
                className="bg-blue-500 mt-2 p-2 rounded-md"
                onClick={() => setIsUpadateModalOpen(true)}
              >
                Update Profile
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4  md:col-span-2">
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
                  <UserAvatar
                    user={{
                      id: userData.referrerId,
                      name: userData.referrerName,
                      email: userData.referrerEmail,
                      profilePhotoURL: userData.referrerProfilePhotoURL,
                    }}
                  />
                ) : (
                  <span className="px-4 border-l-0 cursor-default border-gray-300 focus:outline-none  rounded-md rounded-l-none shadow-sm -ml-1 w-4/6">
                    ( No reference )
                  </span>
                )}
              </span>
            </p>
            <p className="py-1">
              <strong>Join Date:</strong>
              <span>{userData.joinDate}</span>
            </p>
          </div>
        </div>
      </div>
      {isUpdatable ? (
        <Modal
          open={isUpadateModalOpen}
          onClose={() => setIsUpadateModalOpen(false)}
          center
          classNames={{
            overlay: "customOverlay",
            modal: "customModal",
            closeButton: "customCloseButton",
          }}
        >
          <UpdateProfile
            userData={userData}
            onUpdate={() => {
              fetchData();
              setIsUpadateModalOpen(false);
            }}
          />
        </Modal>
      ) : (
        ""
      )}
    </BackGround>
  );
};

export default UserProfile;
