import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BackGround,
  MemberApprovalRequestCard,
  Tab,
  PaginationIndexer,
} from ".";
import { memberApprovalService } from "../services";
import { setAllReferenceRequests, setInfo, setLoading } from "../slices";
import { useNavigate } from "react-router-dom";

const ReferenceRequests = ({}) => {
  const dispatch = useDispatch();
  const [tab, setTab] = useState("unresponded");

  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();

  const requests = {
    unresponded:
      useSelector((state) => state.reference.newReferenceRequests) || [],
    approved:
      useSelector((state) => state.reference.approvedReferenceRequests) || [],
    rejected:
      useSelector((state) => state.reference.rejectedReferenceRequests) || [],
  };

  const jwt = useSelector((state) => state.auth.token);

  const fetchData = async () => {
    dispatch(setLoading({ isLoading: true, loadingMsg: "Loading data..." }));

    try {
      const response = await memberApprovalService.seeAllReferences(
        jwt,
        pageNumber
      );

      if (!response.ok) {
        const errorObj = await response.json();
        throw new Error(errorObj.message);
      }

      const pages = await response.json();
      setTotalPages(pages[tab].page.totalPages);

      dispatch(
        setAllReferenceRequests({
          newRequests: pages.unresponded,
          approvedRequests: pages.approved,
          rejectedRequests: pages.rejected,
        })
      );
    } catch (error) {
      dispatch(
        setInfo({ shouldShow: true, isfoMag: error.message, infoType: "error" })
      );
      navigate("/");
    } finally {
      dispatch(setLoading({ isLoading: false, loadingMsg: "" }));
    }
  };

  useEffect(() => {
    fetchData();
  }, [pageNumber, tab]);

  return (
    <BackGround>
      <div className="flex flex-col items-center min-h-96 mx-h-screen">
        <h1 className="text-2xl md:text-4xl font-bold mb-8 text-white text-center">
          Reference Requests
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests[tab].length === 0 ? (
            <div className="text-2xl col-span-3 text-white">
              No content found.
            </div>
          ) : (
            requests[tab].map((request) => (
              <MemberApprovalRequestCard
                key={request.memberApprovalRequestId}
                memberApprovalRequest={request}
                status={request.adminApproval}
                showAdminApproval={request.adminApproval !== "UNRESPONDED"}
                showAdminActions={tab === "unresponded"}
                fetchData={fetchData}
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
};

export default ReferenceRequests;
