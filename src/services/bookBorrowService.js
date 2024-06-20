import "../config/config"
import config from "../config/config"

class BookBorrowService
{
    //method to request for borrowing a book
    async requestForBorrow( bookCopyId, jwtToken )
    {
        return fetch(
            `${config.urlPrefix}/books/${bookCopyId}/borrowRequest`,
            {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${jwtToken}`
                }
            }
        )
    }

    //method to get user's borrow requests
    async getMyBorrowRequests( jwtToken )
    {
        return fetch(
            `${config.urlPrefix}/requests/myBorrowRequests`,
            {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${jwtToken}`
                }
            }
        )
    }

    //method to get all borrow requests on current user's books
    async getAllBorrowRequests( jwtToken )
    {
        return fetch(
            `${config.urlPrefix}/requests/borrowRequests`,
            {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${jwtToken}`
                }
            }
        )
    }

    //method to approve a book borrow request
    async approveBorrowRequest( borrowRequestId, jwtToken )
    {
        return fetch(
            `${config.urlPrefix}/requests/borrowRequests/${borrowRequestId}/approve`,
            {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${jwtToken}`
                }
            }
        )
    }

    //method to reject a book borrow request
    async rejectBorrowRequest( borrowRequestId, jwtToken )
    {
        return fetch(
            `${config.urlPrefix}/requests/borrowRequests/${borrowRequestId}/reject`,
            {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${jwtToken}`
                }
            }
        )
    }

    //method to initiate the handover of a book copy by sending the otp
    async initiateHandover( bookCopyId, jwtToken )
    {
        return fetch(
            `${config.urlPrefix}/books/${bookCopyId}/initiateHandover`,
            {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${jwtToken}`
                }
            }
        )
    }

    //method to complete the handover of a book copy by verifying the otp
    async handoverBookCopy( bookCopyId, otp, jwtToken )
    {
        //adding otp in form data
        const formData = new FormData()
        formData.append( "otp", otp )

        return fetch(
            `${config.urlPrefix}/books/${bookCopyId}/handover`,
            {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${jwtToken}`,
                    "Content-type": "multipart/form-data"
                },
                body: formData
            }
        )
    }
}

const bookBorrowService = new BookBorrowService()
export default bookBorrowService

