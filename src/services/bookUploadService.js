import config from "../config/config"; 

class BookUploadService
{
    //parameter book and user
    async uploadBook(bookTitle,authorName,pageCount,quantity,categoryId,jwt)
    {
        const Book={
            bookTitle,
            authorName,
            pageCount,
            quantity,
            category: {
                id: categoryId
            }
        }
        return fetch(config.urlPrefix+"/books",
            {
                //method
                method:"POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization":"Bearer "+jwt
                },
                body: JSON.stringify(Book)
            }
        );
    }

    async approveBookUploadRequest(bookId,jwt)
    {
        return fetch(config.urlPrefix+"/requests/bookUploadRequests/"+bookId+"/approve",
            {
                //mehtod
                method:"POST",
                headers: {
                    "Authorization":"Bearer "+jwt
                },
            }
        );
    }

    async rejectBookUploadRequest(bookId,jwt)
    {
        return fetch(config.urlPrefix+"/requests/bookUploadRequests/"+bookId+"/reject"),
        {
            //method
            method:"POST",
            headers: {
                "Authorization":"Bearer "+jwt
            },
        }
    }

    async getAllBookUploadRequests(jwt)
    {
        return fetch(config.urlPrefix+"/requests/bookUploadRequests",
            {
                //method 
                method:"GET",
                headers: {
                    "Authorization":"Bearer "+jwt
                },
            }
        );
    }

    // to get all the upload requests of the current user
    async getMyUploadRequests(jwt)
    {
        return fetch(config.urlPrefix+"/requests/myUploadRequests",
            {
                //method
                method:"GET",
                headers: {
                    "Authorization":"Bearer "+jwt
                },
            }
        )
    }
}

const bookUploadService=new BookUploadService;
export default bookUploadService;