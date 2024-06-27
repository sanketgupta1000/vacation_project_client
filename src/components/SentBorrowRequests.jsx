import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { bookBorrowService, bookService, userService } from "../services";
import { setAllSenderBorrowRequests, setLoading } from "../slices";
import { Tab, BorrowRequestCard } from "."
function SentBorrowRequests() {

    const dispatch = useDispatch()
    const [tab, setTab] = useState('currentRequest')

    const borrowRequest = {
        'pastHistory': useSelector(state => state.bookBorrow.pastBorrowRequests) || [],
        'currentRequest': useSelector(state => state.bookBorrow.currentBorrowRequests) || []
    }
    const jwt = useSelector(state => state.auth.token);

    async function getrequests() {
        dispatch(setLoading({ isLoading: true, loadingMsg: "Loading your request..." }))
        try {
            const response = await bookBorrowService.getMyBorrowRequests(jwt);
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message);
            }

            const myRequest = await response.json();

            dispatch(setAllSenderBorrowRequests(myRequest));
        }
        catch (error) {
            // show error
            dispatch(setInfo({ shouldShow: true, infoMsg: error.message, infoType: "error" }))

            // navigate
            navigate("/")
        }
        finally {
            // stop loading
            dispatch(setLoading({ isLoading: false, loadingMsg: "" }))
        }
    }

    useEffect(() => {
        getrequests()
    }, [])


    return (
        <>

            <div className="flex overflow-x-auto overflow-y-hidden border-b border-gray-200 whitespace-nowrap justify-evenly my-5">
            
                {/* side nav bar for 2 states */}
                <Tab active={tab === 'pastHistory'} onClick={() => setTab('pastHistory')}
                >
                    Past Borrowed History
                </Tab>

                <Tab active={tab === 'currentRequest'} onClick={() => setTab('currentRequest')}
                >
                    Current Request Status
                </Tab>

            </div>

            <div>
                {/* request is the row of past borrowed book request if tab is pastHistory */}
                {/* request is current borrow request status is tab is currentStatus */}
                {borrowRequest[tab].map((request) => (
                    <BorrowRequestCard
                        key={request.borrowRequestId}
                        borrowRequest={request}
                        showStatus
                    />
                ))}
            </div>


        </>
    );
}

export default SentBorrowRequests;