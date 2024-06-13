import config from "../config/config"; 

class BookUploadService
{
    //parameter book and user
    async upload_boook(bookTitle,authorName,pageCount,quantity,category,jwt)
    {
        const Book={
            bookTitle,
            authorName,
            pageCount,
            quantity,
            category
        }
        return fetch(config.urlPrefix+"/uploadBook",
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
        return fetch(config.urlPrefix+"/bookUploadRequests/"+bookId+"/approve",
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
        return fetch(config.urlPrefix+"/bookUploadRequests/"+bookId+"/reject"),
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
        return fetch(config.urlPrefix+"/bookUploadRequests",
            {
                //method 
                method:"GET",
                headers: {
                    "Authorization":"Bearer "+jwt
                },
            }
        );
    }

    async currentUserUploadedBook(jwt)
    {
        return fetch(config.urlPrefix+"/getAllUploadedBooks",
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