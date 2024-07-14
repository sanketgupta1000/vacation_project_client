import { setLoading, setInfo } from "../slices";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { bookUploadService } from "../services";
import { UserAvatar } from "./";
import { MdPending } from "react-icons/md";
import { FcApproval, FcCancel } from "react-icons/fc";

function BookApprovalRequestCard({
  request,
  status,
  showAdminActions = false,
  fetchData,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = useSelector((state) => state.auth.token);

  // handle admin approve
  async function handleAdminApprove() {
    // set loading
    dispatch(setLoading({ isLoading: true, loadingMsg: "Approving book..." }));

    try {
      // call the service
      const response = await bookUploadService.approveBookUploadRequest(
        request.bookId,
        jwt
      );

      // custom status exceptions
      if (!response.ok) {
        throw new Error(await response.json());
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
      // set the error
      dispatch(
        setInfo({ shouldShow: true, infoMsg: error.message, infoType: "error" })
      );
    } finally {
      // stop loading
      dispatch(setLoading({ isLoading: false, loadingMsg: "" }));

      // navigate
      navigate("/");
    }
  }

  // handle admin reject
  async function handleAdminReject() {
    // start loading
    dispatch(setLoading({ isLoading: true, loadingMsg: "Rejecting book..." }));

    try {
      // call the service
      const response = await bookUploadService.rejectBookUploadRequest(
        request.bookId,
        jwt
      );

      // custom status exceptions
      if (!response.ok) {
        throw new Error((await response.json()).message);
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

      // navigate
      navigate("/");
    }
  }

  return (
    <div
      className={`col-span-1 col-start-auto justify-center bg-gradient-to-br from-black via-gray-800 ${
        status === "UNRESPONDED"
          ? "to-yellow-800"
          : status === "APPROVED"
          ? "to-green-900"
          : "to-red-800"
      } text-white p-4 rounded-lg shadow-xl shadow-violet-500/50 transition-transform transform hover:scale-105`}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 h-full">
        <div className="col-span-1 flex justify-center items-start m-2">
          <img
            src={request.coverPhotoURL}
            alt="Book Cover"
            className="aspect-[5/8] w-32 md:w-40 object-cover rounded-lg border-4 border-red-500/50 shadow-xl shadow-yellow-200/50"
          />
        </div>
        <div className="col-span-1 md:col-span-2 flex justify-center">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-white mb-2">
              {request.bookTitle}
            </h3>
            <p className="text-sm text-gray-400 mb-1">
              <strong>Author:</strong> {request.bookAuthor}
            </p>
            <p className="text-sm text-gray-400 mb-1">
              <strong>Pages:</strong> {request.bookPageCount}
            </p>
            <p className="text-sm text-gray-400 mb-1">
              <strong>Quantity:</strong> {request.bookQuantity}
            </p>
            <p className="text-sm text-gray-400 mb-1">
              <strong>Category:</strong> {request.bookCategoryName}
            </p>
          </div>
        </div>
        <div className="col-span-1 md:col-span-3 my-4">
          <p className="py-1">
            <strong>Requester:</strong>
            <span>
              <UserAvatar
                user={{
                  id: request.bookOwnerId,
                  name: request.bookOwnerName,
                  email: request.bookOwnerEmail,
                  profilePhotoURL: request.bookOwnerProfilePhotoURL,
                }}
              />
            </span>
          </p>
        </div>
        <div className="col-span-1 md:col-span-3 h-full">
          <p className="text-sm text-gray-400 mb-2">
            <strong>Request Date:</strong> {request.bookRequestDate}
          </p>
          <p className="mt-4">
            <strong>Admin Response:</strong>{" "}
            {status === "UNRESPONDED" && (
              <span>
                <MdPending className="inline-block mx-1" /> {"pending..."}
              </span>
            )}
            {status === "APPROVED" && (
              <span>
                <FcApproval className="inline-block mx-1" /> {"Approved"}
              </span>
            )}
            {status === "REJECTED" && (
              <>
                <FcCancel className="inline-block mx-1" /> {"Rejected"}
              </>
            )}
          </p>
          {request.bookApprovalStatus === "UNRESPONDED" ? (
            <div className="flex justify-between items-end mt-4">
              <button
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200"
                onClick={handleAdminApprove}
              >
                Approve
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200"
                onClick={handleAdminReject}
              >
                Reject
              </button>
            </div>
          ) : (
            <p className="text-sm text-gray-400">
              <strong>Response Date:</strong> {request.bookUploadDate}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default BookApprovalRequestCard;
