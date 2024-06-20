import config from "../config/config";

class BookService
{

    // method to get all books
    async getBooks( jwt )
    {
        return fetch(
            config.urlPrefix + "/books/getAllBooks",
            {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + jwt
                }
            }
        )
    }

    // method to get a book
    async getBook( jwt, bookId )
    {
        return fetch(
            config.urlPrefix + "/books/" + bookId,
            {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + jwt
                }
            }
        )
    }

    // method to get all book copies for a book
    async getBookCopies( jwt, bookId )
    {
        return fetch(
            config.urlPrefix + "/books/" + bookId + "/view-copies",
            {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + jwt
                }
            }
        )
    }

    // method to get all transactions for a book copy
    async getBookCopyTransactions( jwt, bookCopyId )
    {
        return fetch(
            config.urlPrefix + "/books/" + bookCopyId + "/transactions",
            {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + jwt
                }
            }
        )
    }

    // method to get all the uploaded books of current user
    async getUploadedBooks( jwt )
    {
        return fetch(
            config.urlPrefix + "/books/getMyUploadedBooks",
            {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + jwt
                }
            }
        )
    }

    // method to get all the borrowed book copies of current user
    async getBorrowedBookCopies( jwt )
    {
        return fetch(
            config.urlPrefix + "/books/getMyBorrowedBookCopies",
            {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + jwt
                }
            }
        )
    }
}

const bookService = new BookService();
export default bookService;