import React from "react";
import { Button, UserAvatar } from "./";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../slices";
import { setInfo } from "../slices/infoSlice";
import { useNavigate } from "react-router-dom";
import { memberApprovalService } from "../services";
import { MdPending } from "react-icons/md";
import { FcApproval, FcCancel } from "react-icons/fc";

// a general card component to display a member approval request
// will be used on MemberApprovalRequestsPage, as well as ReferralsPage
function MemberApprovalRequestCard({
  memberApprovalRequest,
  // should the referrer info be displayed?
  showReferrerInfo = false,
  // should the admin approval status be displayed?
  showAdminApproval = false,
  // should the accept/reject actions for admin be displayed?
  showAdminActions = false,
  // should the accept/reject actions for referrer be displayed?
  showReferrerActions = false,
  // fetch Data function
  fetchData,
}) {
  // dispatcher
  const dispatch = useDispatch();

  // navigator
  const navigate = useNavigate();

  // jwt token
  const jwt = useSelector((state) => state.auth.token);

  // handle admin accept
  async function handleAdminAccept() {
    // start loading
    dispatch(
      setLoading({
        isLoading: true,
        loadingMsg: "Accepting member approval request...",
      })
    );

    try {
      // call the service to accept the member approval request
      const response =
        await memberApprovalService.approveMemberApprovalRequestFromAdmin(
          memberApprovalRequest.memberApprovalRequestId,
          jwt
        );

      // throwing custom status exceptions, other than cors and rejected promises
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

      // fetch data
      fetchData();
    } catch (error) {
      dispatch(
        setInfo({ shouldShow: true, infoMsg: error.message, infoType: "error" })
      );
    } finally {
      // stop loading
      dispatch(setLoading({ isLoading: false, loadingMsg: "" }));
    }
  }

  // handle admin reject
  async function handleAdminReject() {
    // start loading
    dispatch(
      setLoading({
        isLoading: true,
        loadingMsg: "Rejecting member approval request...",
      })
    );

    try {
      // call the service to reject the member approval request
      const response =
        await memberApprovalService.rejectMemberApprovalRequestFromAdmin(
          memberApprovalRequest.memberApprovalRequestId,
          jwt
        );

      // throwing custom status exceptions, other than cors and rejected promises
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

      // fetch data
      fetchData();
    } catch (error) {
      dispatch(
        setInfo({ shouldShow: true, infoMsg: error.message, infoType: "error" })
      );
    } finally {
      // stop loading
      dispatch(setLoading({ isLoading: false, loadingMsg: "" }));
    }
  }

  // handle referrer accept
  async function handleReferrerAccept() {
    // start loading
    dispatch(
      setLoading({
        isLoading: true,
        loadingMsg: "Accepting referral request...",
      })
    );

    try {
      // call the service to accept the member approval request
      const response =
        await memberApprovalService.approveMemberApprovalRequestFromReference(
          memberApprovalRequest.memberApprovalRequestId,
          jwt
        );

      // throwing custom status exceptions, other than cors and rejected promises
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

      // fetch data
      fetchData();
    } catch (error) {
      dispatch(
        setInfo({ shouldShow: true, infoMsg: error.message, infoType: "error" })
      );
    } finally {
      // stop loading
      dispatch(setLoading({ isLoading: false, loadingMsg: "" }));
    }
  }

  // handle referrer reject
  async function handleReferrerReject() {
    // start loading
    dispatch(
      setLoading({
        isLoading: true,
        loadingMsg: "Rejecting referral request...",
      })
    );

    try {
      // call the service to reject the member approval request
      const response =
        await memberApprovalService.rejectMemberApprovalRequestFromReference(
          memberApprovalRequest.memberApprovalRequestId,
          jwt
        );

      // throwing custom status exceptions, other than cors and rejected promises
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

      // fetch data
      fetchData();
    } catch (error) {
      dispatch(
        setInfo({ shouldShow: true, infoMsg: error.message, infoType: "error" })
      );
    } finally {
      // stop loading
      dispatch(setLoading({ isLoading: false, loadingMsg: "" }));
    }
  }

  return (
    <div
      className={`bg-gradient-to-br from-black via-gray-800 ${
        memberApprovalRequest.adminApproval === "UNRESPONDED"
          ? "to-yellow-800"
          : memberApprovalRequest.adminApproval == "APPROVED"
          ? "to-green-900"
          : "to-red-800"
      } text-white p-4 rounded-lg shadow-lg transition-transform transform hover:scale-110`}
    >
      <h3 className="text-xl font-bold mb-2">
        {memberApprovalRequest.memberFullName}
      </h3>
      <p>
        <strong>Email:</strong> {memberApprovalRequest.memberEmail}
      </p>
      <p>
        <strong>Phone Number:</strong> {memberApprovalRequest.memberPhoneNumber}
      </p>
      <p>
        <strong>Request Date:</strong> {memberApprovalRequest.requestDate}
      </p>
      {showReferrerInfo && (
        <div className="my-4">
          <strong>Reference:</strong>
          <span>
            {memberApprovalRequest.memberReferrerId ? (
              <UserAvatar
                user={{
                  id: memberApprovalRequest.memberReferrerId,
                  name: memberApprovalRequest.memberReferrerFullName,
                  email: memberApprovalRequest.memberReferrerEmail,
                  profilePhotoURL:
                    memberApprovalRequest.memberReferrerProfilePhotoURL,
                }}
              />
            ) : (
              <p className="px-4 border-l-0 cursor-default border-gray-300 focus:outline-none  rounded-md rounded-l-none shadow-sm -ml-1 w-4/6">
                ( No reference )
              </p>
            )}
          </span>
          {memberApprovalRequest.memberReferrerId && (
            <p>
              <span>Response: </span>
              {memberApprovalRequest.referrerApproval === "UNRESPONDED" && (
                <>
                  <MdPending className="inline-block mx-1" /> {"pending..."}
                </>
              )}
              {memberApprovalRequest.referrerApproval === "APPROVED" && (
                <>
                  <FcApproval className="inline-block mx-1" /> {"Approved"}
                </>
              )}
              {memberApprovalRequest.referrerApproval === "REJECTED" && (
                <>
                  <FcCancel className="inline-block mx-1" /> {"Rejected"}
                </>
              )}
            </p>
          )}
        </div>
      )}

      {showAdminApproval && (
        <>
          <p>
            <strong>Admin Response:</strong>{" "}
            {memberApprovalRequest.adminApproval === "UNRESPONDED" && (
              <span>
                <MdPending className="inline-block mx-1" /> {"pending..."}
              </span>
            )}
            {memberApprovalRequest.adminApproval === "APPROVED" && (
              <span>
                <FcApproval className="inline-block mx-1" /> {"Approved"}
              </span>
            )}
            {memberApprovalRequest.adminApproval === "REJECTED" && (
              <>
                <FcCancel className="inline-block mx-1" /> {"Rejected"}
              </>
            )}
          </p>
          {memberApprovalRequest.adminApproval !== "UNRESPONDED" && (
            <p>
              <strong>Admin Response Date : </strong>{" "}
              {memberApprovalRequest.responseDate}
            </p>
          )}
        </>
      )}
      {showAdminActions && (
        <div className="flex space-x-4 mt-4">
          <Button
            color="green"
            handleClick={handleAdminAccept}
            className="rounded-2xl"
          >
            Approve
          </Button>
          <Button
            color="red"
            handleClick={handleAdminReject}
            className="rounded-2xl"
          >
            Reject
          </Button>
        </div>
      )}
      {showReferrerActions && (
        <div className="flex space-x-4 mt-4">
          <Button
            color="green"
            handleClick={handleReferrerAccept}
            className="rounded-2xl"
          >
            Approve
          </Button>
          <Button
            color="red"
            handleClick={handleReferrerReject}
            className="rounded-2xl"
          >
            Reject
          </Button>
        </div>
      )}
    </div>
  );
}

export default MemberApprovalRequestCard;
