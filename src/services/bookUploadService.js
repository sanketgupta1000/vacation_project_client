import config from "../config/config";

class BookUploadService
{
    //parameter book and user
    async uploadBook( jwt, { coverPhoto, bookTitle, authorName, pageCount, quantity, categoryId } )
    {
        const book = {
            bookTitle,
            authorName,
            pageCount,
            quantity,
            category: {
                id: categoryId
            }
        }

        const formData = new FormData()
        formData.append( 'coverPhoto', coverPhoto[ 0 ] )
        formData.append( 'bookJSON', JSON.stringify( book ) )

        return fetch( config.urlPrefix + "/books",
            {
                //method
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + jwt
                },
                body: formData
            }
        );
    }

    async approveBookUploadRequest( bookId, jwt )
    {
        return fetch( config.urlPrefix + "/requests/bookUploadRequests/" + bookId + "/approve",
            {
                //mehtod
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + jwt
                },
            }
        );
    }

    async rejectBookUploadRequest( bookId, jwt )
    {
        // console.log(bookId)
        return fetch( config.urlPrefix + "/requests/bookUploadRequests/" + bookId + "/reject",
            {
                //method
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + jwt
                },
            }
        );

    }

    async getAllBookUploadRequests( jwt, pageNumber )
    {
        const queryParams = new URLSearchParams( { pageNumber } )
        return fetch( config.urlPrefix + `/requests/bookUploadRequests?${queryParams}`,
            {
                //method 
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + jwt
                },
            }
        );
    }

    // to get all the upload requests of the current user
    async getMyUploadRequests( jwt, pageNumber )
    {
        const queryParams = new URLSearchParams( { pageNumber } )
        return fetch( config.urlPrefix + `/requests/myUploadRequests?${queryParams}`,
            {
                //method
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + jwt
                },
            }
        )
    }
}

const bookUploadService = new BookUploadService;
export default bookUploadService;