import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAllBookApprovalRequests, setInfo, setLoading } from "../slices";
import { bookUploadService } from "../services";
import {
  BookApprovalRequestCard,
  Tab,
  BackGround,
  PaginationIndexer,
} from "./";
import { BiTable } from "react-icons/bi";

function BookApprovalRequestsForAdmin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [tab, setTab] = useState("unresponded");

  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // jwt token
  const jwt = useSelector((state) => state.auth.token);

  // requests from store
  const requests = {
    unresponded:
      useSelector((state) => state.bookApproval.newBookApprovalRequests) || [],
    approved:
      useSelector((state) => state.bookApproval.approvedBookApprovalRequests) ||
      [],
    rejected:
      useSelector((state) => state.bookApproval.rejectedBookApprovalRequests) ||
      [],
  };

  // function to fetch requests
  async function fetchRequests() {
    // set loading
    dispatch(
      setLoading({
        isLoading: true,
        loadingMsg: "Fetching book approval requests...",
      })
    );

    // fetch requests
    try {
      const response = await bookUploadService.getAllBookUploadRequests(
        jwt,
        pageNumber
      );

      // check if request was successful
      if (!response.ok) {
        throw new Error((await response.json()).message);
      }

      const pages = await response.json();

      setTotalPages(pages[tab].page.totalPages);

      // set the requests
      dispatch(setAllBookApprovalRequests(pages));
    } catch (error) {
      dispatch(
        setInfo({ shouldShow: true, infoMsg: error.message, infoType: "error" })
      );
      // navigate to the home page
      navigate("/");
    } finally {
      // remove loading
      dispatch(setLoading({ isLoading: false, loadingMsg: "" }));
    }
  }

  useEffect(() => {
    fetchRequests();
  }, [pageNumber, tab]);

  return (
    <BackGround>
      <div className="flex flex-col items-center min-h-96 mx-h-screen">
        <h1 className="text-2xl md:text-4xl font-bold mb-8 text-white text-center">
          Book approval requests
        </h1>

        <div className="flex space-x-4 mb-8">
          <Tab
            active={tab === "unresponded"}
            onClick={() => {
              setTab("unresponded");
              setPageNumber(1);
            }}
          >
            Unresponded
          </Tab>

          <Tab
            active={tab === "approved"}
            onClick={() => {
              setTab("approved");
              setPageNumber(1);
            }}
          >
            Approved
          </Tab>

          <Tab
            active={tab === "rejected"}
            onClick={() => {
              setTab("rejected");
              setPageNumber(1);
            }}
          >
            Rejected
          </Tab>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-20 px-0 lg:px-20">
          {requests[tab].length === 0 ? (
            <div className="text-2xl col-span-3 text-white">
              No content found.
            </div>
          ) : (
            requests[tab].map((request) => (
              <BookApprovalRequestCard
                key={request.bookId}
                request={request}
                status={request.bookApprovalStatus}
                showOwner={true}
                showRequestStatus={true}
                showAdminActions={tab === "unresponded"}
                showResponseDate={tab !== "unresponded"}
                fetchData={fetchRequests}
              />
            ))
          )}
        </div>

        {requests[tab].length !== 0 && (
          <div className="w-full mt-8">
            <PaginationIndexer
              pageNumber={pageNumber}
              totalPages={totalPages}
              setPageNumber={setPageNumber}
            />
          </div>
        )}
      </div>
    </BackGround>
  );
}

export default BookApprovalRequestsForAdmin;
