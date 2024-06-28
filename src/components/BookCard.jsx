import { setLoading, setInfo } from "../slices";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {bookUploadService} from "../services";
import {Button, UserAvatar} from "./"

// a general component to display a book in the form of card
function BookCard({
    // data of the book
    book,
    // should the approval status be displayed?
    showApprovalStatus = false,
    // should the action buttons be displayed?
    showAdminActions = false,
    // should the card be displayed in a link
    isLink = false,
    // should the borrow button be displayed
    showBorrowButton = false
})
{
    // will make a wrapped component, useful to display the book details
    function BookInfo({
        book,
        showApprovalStatus,
        showAdminActions
    })
    {
        const navigate = useNavigate()
        const dispatch = useDispatch()
        const jwt = useSelector(state=>state.auth.token)

        // handle admin approve
        async function handleAdminApprove()
        {
            // set loading
            dispatch(setLoading({isLoading: true, loadingMsg: "Approving book..."}))

            try
            {

                // call the service
                const response = await bookUploadService.approveBookUploadRequest(book.bookId, jwt)

                // custom status exceptions
                if(!response.ok)
                {
                    throw new Error(await response.json())
                }

                // show success message
                dispatch(setInfo({shouldShow: true, infoMsg: await response.text(), infoType: "success"}))

            }
            catch(error)
            {
                // set the error
                dispatch(setInfo({shouldShow: true, infoMsg: error.message, infoType: "error"}))
            }
            finally
            {
                // stop loading
                dispatch(setLoading({isLoading: false, loadingMsg: ""}))

                // navigate
                navigate("/")
            }

        }

        // handle admin reject
        async function handleAdminReject()
        {
            // start loading
            dispatch(setLoading({isLoading: true, loadingMsg: "Rejecting book..."}))

            try
            {
                // call the service
                const response = await bookUploadService.rejectBookUploadRequest(book.bookId, jwt)

                // custom status exceptions
                if(!response.ok)
                {
                    throw new Error((await response.json()).message)
                    
                }

                // show success message
                dispatch(setInfo({shouldShow: true, infoMsg: await response.text(), infoType: "success"}))
            }
            catch(error)
            {
                // show error
                dispatch(setInfo({shouldShow: true, infoMsg: error.message, infoType: "error"}))
            }
            finally
            {
                // stop loading
                dispatch(setLoading({isLoading: false, loadingMsg: ""}))

                // navigate
                navigate("/")
            }
        }

        return(
               <>
               {/* new card start */}
               {/* <div class="flex min-h-screen items-center justify-center bg-neutral-800">
  <div class="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"> */}
    <div class=" mt-2 mb-2 group relative cursor-pointer items-center justify-center overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30">
      <div class="h-96 w-72">
        <img class="h-full w-full object-cover transition-transform duration-500 group-hover:rotate-3 group-hover:scale-125"src="https://marketplace.canva.com/EAFMf17QgBs/1/0/1003w/canva-green-and-yellow-modern-book-cover-business-Ah-do4Y91lk.jpg"  alt="" />
      </div>
      <div class=" absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>
      <div class="absolute inset-0 flex translate-y-[60%] flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0">
        <h1 class="font-serif text-3xl font-bold text-white">{book.bookTitle}</h1>
       
        <p class="mb-3 text-lg italic  text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            
        <p class="font-bold text-gray-50 mt-2">By {book.bookAuthor}</p> 
                <p className="mt-1">
                catagory  :  {book.bookCategoryName}
                </p>
                <p className="mb-3">
                Quantity  :  {book.bookQuantity} </p>
               {/* <p> Owner  :  {book.bookOwnerName}</p> */}
               <UserAvatar  user={{id:1,name:"Janvi solanki",email:"janvivsolanki2004@gamil.com"}}/>

        </p>
        {
                                showApprovalStatus && 
                                <p className="text-gray-700 text-base">Approval Status: {book.bookApprovalStatus}</p>
                            }
                               {showAdminActions &&
                    (
                        <div className="px-6 py-4 flex justify-start">
    
                            <Button
                                color="green"
                                className="mr-1.5"
                                handleClick={handleAdminApprove}
                            >
                                Approve
                            </Button>
    
                            <Button
                                color="red"
                                handleClick={handleAdminReject}
                            >
                                Reject
                            </Button>
                        </div>
                    )}
    
                    {showBorrowButton && 
    
                        <div className="px-6 py-4 flex justify-start">
                            <Button
                                color="blue"
                                handleClick={()=>{navigate("/books/"+book.bookId)}}
                            >
                                Borrow
                            </Button>
                        </div>
        }
          </div>
   

      
    </div>
    {/* <div class="group relative cursor-pointer items-center justify-center overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30">
      <div class="h-96 w-72">
        <img class="h-full w-full object-cover transition-transform duration-500 group-hover:rotate-3 group-hover:scale-125" src="https://images.unsplash.com/photo-1494145904049-0dca59b4bbad?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80" alt="" />
      </div>
      <div class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>
      <div class="absolute inset-0 flex translate-y-[60%] flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0">
        <h1 class="font-dmserif text-3xl font-bold text-white">Beyond Builder</h1>
        <p class="mb-3 text-lg italic text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis dolore adipisci placeat.</p>
        <button class="rounded-full bg-neutral-900 py-2 px-3.5 font-com text-sm capitalize text-white shadow shadow-black/60">See More</button>
      </div>
    </div> */}
    {/* <div class="group relative cursor-pointer items-center justify-center overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30">
      <div class="h-96 w-72">
        <img class="h-full w-full object-cover transition-transform duration-500 group-hover:rotate-3 group-hover:scale-125" src="https://images.unsplash.com/photo-1502675135487-e971002a6adb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80" alt="" />
      </div>
      <div class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>
      <div class="absolute inset-0 flex translate-y-[60%] flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0">
        <h1 class="font-dmserif text-3xl font-bold text-white">Shooting Star</h1>
        <p class="mb-3 text-lg italic text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis dolore adipisci placeat.</p>
        <button class="rounded-full bg-neutral-900 py-2 px-3.5 font-com text-sm capitalize text-white shadow shadow-black/60">See More</button>
      </div>
    </div> */}
  {/* </div> */}
  {/* <div class="fixed bottom-16">
    <p class="font-com text-2xl font-semibold text-white">All Images are from <a href="https://unsplash.com" class="text-blue-500">Unsplash.com</a></p>
  </div> */}
   {/* </div> */}

               {/* new card end */}
               {/* <div class="mt-9 w-[275px] h-[421px] mx-auto rounded-md border hover:bg-gray-100 hover:shadow-md hover:shadow-black" >
  <img
  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUFLz6HHxmtX7fnhxjlXqIcYnLy1x84kq44w&s"
  // src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ718nztPNJfCbDJjZG8fOkejBnBAeQw5eAUA&s"
//    src="https://images.unsplash.com/photo-1522199755839-a2bacb67c546?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGJsb2d8ZW58MHx8MHx8&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=60"
    alt="Laptop"
    class="h-[200px] mt-3 w-full rounded-md object-contain"
  />
  <div class="p-2 justify-between ">
    <h1 class="text-xl font-bold font-serif text-red-500" >{book.bookTitle}</h1>
    <p class="mt-3 text-sm text-gray-600">
      By 
      <p class="mt-0.5 text-sm ml-2 text-gray-800">
    {book.bookAuthor}
    </p>
    </p>
    <div class="justify-between mt-4">
        
        <p className="text-sky-800   ">Category: {book.bookCategoryName}</p>
        
                            <p className="text-sky-800  ">Quantity: {book.bookQuantity}</p>
                        
                            <p className="text-sky-800  ">Owner: {book.bookOwnerName}</p>
                        
                            {
                                showApprovalStatus && 
                                <p className="text-gray-700 text-base">Approval Status: {book.bookApprovalStatus}</p>
                            }
                               {showAdminActions &&
                    (
                        <div className="px-6 py-4 flex justify-start">
    
                            <Button
                                color="green"
                                className="mr-1.5"
                                handleClick={handleAdminApprove}
                            >
                                Approve
                            </Button>
    
                            <Button
                                color="red"
                                handleClick={handleAdminReject}
                            >
                                Reject
                            </Button>
                        </div>
                    )}
    
                    {showBorrowButton && 
    
                        <div className="px-6 py-4 flex justify-start">
                            <Button
                                color="blue"
                                handleClick={()=>{navigate("/books/"+book.bookId)}}
                            >
                                Borrow
                            </Button>
                        </div>
        }
          </div>
   
  </div>
</div>
 */}













{/* not needed already delete */}
    {/* <div class="relative h-[400px] w-[300px] hover:bg-slate-100 shadow-sm shadow-gray-400 dark:bg-gray-800">
  <img
    src="https://images.unsplash.com/photo-1546961329-78bef0414d7c?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHVzZXJ8ZW58MHx8MHx8&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=60"
    alt="AirMax Pro"
    class="z-0 h-full w-full rounded-md object-cover"
  />
  <div class="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
  <div class="absolute bottom-4 left-4 text-left"> */}
    {/* <h1 class="text-lg font-semibold text-white">{book.bookTitle}</h1>
    <p class="flex pr-2 mt-2 pl-4 text-gray-600 dark:text-gray-300">by 
    <p class="mt-2 text-sm text-gray-300">
    {book.bookAuthor}
    </p>
    </p> */}
    
  

            {/* <div class=" mt-5 mx-auto py-6 px-9 hover:bg-slate-100 hover:scale-105 bg-white  shadow-sm shadow-gray-400  dark:bg-gray-800 "> */}
    {/* <div class=" items-center justify-between">
        <span class="text-sm font-light text-gray-600 dark:text-gray-400"></span>
        {/* <a class="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-300 transform bg-gray-600 rounded cursor-pointer hover:bg-gray-500" tabindex="0" role="button">Design</a> */}
    {/* </div>  */}

    {/* <div class="mt-1"> */}
        {/* <p class="text-2xl font-serif font-extrabold text-red-700 dark:text-white  dark:hover:text-gray-200" >{book.bookTitle}</p>
        <p class="flex pr-2 mt-2 pl-4 text-gray-600 dark:text-gray-300">by 
            <p className=" px-2 font-bold">
            {book.bookAuthor}
            </p>
            </p> */}
            {/* <div class="justify-between mt-4">
        
    <p className="text-sky-800   ">Category: {book.bookCategoryName}</p>
    <br></br>
                        <p className="text-sky-800  ">Quantity: {book.bookQuantity}</p>
                        <br></br>
                        <p className="text-sky-800  ">Owner: {book.bookOwnerName}</p>
                        <br></br>
                        {
                            showApprovalStatus && 
                            <p className="text-gray-700 text-base">Approval Status: {book.bookApprovalStatus}</p>
                        }
                           {showAdminActions &&
                (
                    <div className="px-6 py-4 flex justify-start">

                        <Button
                            color="green"
                            handleClick={handleAdminApprove}
                        >
                            Approve
                        </Button> */}

                        {/* <Button
                            color="red"
                            handleClick={handleAdminReject}
                        >
                            Reject
                        </Button>
                    </div>
                )}

                {showBorrowButton && 

                    <div className="px-6 py-4 flex justify-start">
                        <Button
                            color="blue"
                            handleClick={()=>{navigate("/books/"+book.bookId)}}
                        >
                            Borrow
                        </Button>
                    </div>
    }
      </div>
       */}
        {/* <div class="flex items-center">
            <img class="hidden object-cover w-10 h-10 mx-4 rounded-full sm:block" src="https://images.unsplash.com/photo-1502980426475-b83966705988?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=40&q=80" alt="avatar"/>
            <a class="font-bold text-gray-700 cursor-pointer dark:text-gray-200" tabindex="0" role="link">Khatab wedaa</a>
        </div> */}
    {/* </div>
    </div> 
</div> */}
    {/* <div class="justify-between mt-4">
        
    <p className="text-sky-800   ">Category: {book.bookCategoryName}</p>
    <br></br>
                        <p className="text-sky-800  ">Quantity: {book.bookQuantity}</p>
                        <br></br>
                        <p className="text-sky-800  ">Owner: {book.bookOwnerName}</p>
                        <br></br>
                        {
                            showApprovalStatus && 
                            <p className="text-gray-700 text-base">Approval Status: {book.bookApprovalStatus}</p>
                        }
        {/* <div class="flex items-center">
            <img class="hidden object-cover w-10 h-10 mx-4 rounded-full sm:block" src="https://images.unsplash.com/photo-1502980426475-b83966705988?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=40&q=80" alt="avatar"/>
            <a class="font-bold text-gray-700 cursor-pointer dark:text-gray-200" tabindex="0" role="link">Khatab wedaa</a>
        </div> */}
    {/* </div>
</div> */} 
             {/* <div className="max-w-sm rounded-xl overflow-hidden shadow-lg"> */}

                {/* book details */}
                {/* <div className="px-6 py-4">
                    <h1 className="font-bold text-xl mb-2">{book.bookTitle}</h1>
                    <p className="text-gray-500 text-sm mb-4">by {book.bookAuthor}</p>

                    <div className="flex flex-col">
                        <p className="text-red-700 text-base">Category: {book.bookCategoryName}</p>
                        <p className="text-gray-700 text-base">Quantity: {book.bookQuantity}</p>
                        <p className="text-gray-700 text-base">Owner: {book.bookOwnerName}</p>
                        {
                            showApprovalStatus && 
                            <p className="text-gray-700 text-base">Approval Status: {book.bookApprovalStatus}</p>
                        }
                    </div>

                </div>  */}

                {/* admin actions */}
                {/* {showAdminActions &&
                (
                    <div className="px-6 py-4 flex justify-start">

                        <Button
                            color="green"
                            handleClick={handleAdminApprove}
                        >
                            Approve
                        </Button>

                        <Button
                            color="red"
                            handleClick={handleAdminReject}
                        > */}
                            {/* Reject
                        </Button>
                    </div>
                )}

                {showBorrowButton && 

                    <div className="px-6 py-4 flex justify-start">
                        <Button
                            color="blue"
                            handleClick={()=>{navigate("/books/"+book.bookId)}}
                        >
                            Borrow
                        </Button>
                    </div> */}
                {/* } */}

      </>
        )
    }


    return (

        isLink?
        <Link
            to={`/books/${book.bookId}`}
        >
            <BookInfo
                book={book}
                showApprovalStatus={showApprovalStatus}
                showAdminActions={showAdminActions}
            />
        </Link>
        :
        <BookInfo
            book={book}
            showApprovalStatus={showApprovalStatus}
            showAdminActions={showAdminActions}
        />
    )
}

export default BookCard