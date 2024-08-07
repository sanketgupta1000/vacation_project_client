import React, { useEffect, useState } from "react";
import {
  InputField,
  Button,
  SelectInput,
  BackGround,
  FormErrorMessage,
} from "./";
import { useForm } from "react-hook-form";
import { categoryService, bookUploadService } from "../services";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setInfo, setLoading } from "../slices";

function BookUpload() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const jwt = useSelector((state) => state.auth.token);

  const [categories, setCategories] = useState([]);
  const [imageSrc, setImageSrc] = useState(
    "https://res.cloudinary.com/ddy7jnszi/image/upload/v1720937865/Assets/xy0ged8jwzredsknbpwi.jpg"
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // function to fetch categories
  async function fetchCategories() {
    dispatch(setLoading({ isLoading: true, loadingMsg: "Loading..." }));

    try {
      const response = await categoryService.getAllCategories(jwt);

      if (!response.ok) {
        throw new Error((await response.json()).message);
      }

      // all good
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      dispatch(
        setInfo({ shouldShow: true, infoMsg: error.message, infoType: "error" })
      );
      navigate("/");
    } finally {
      dispatch(setLoading({ isLoading: false, loadingMsg: "" }));
    }
  }

  // fetch categories only after initial render
  useEffect(() => {
    fetchCategories();
  }, []);

  // handle book upload
  async function handleBookUpload(data) {
    // set loading
    dispatch(setLoading({ isLoading: true, loadingMsg: "Uploading book..." }));

    try {
      const response = await bookUploadService.uploadBook(jwt, data);

      if (!response.ok) {
        throw new Error((await response.json()).message);
      }

      // all good
      // set info
      dispatch(
        setInfo({
          shouldShow: true,
          infoMsg: await response.text(),
          infoType: "success",
        })
      );
      // navigate to home
      navigate("/");
    } catch (error) {
      dispatch(
        setInfo({ shouldShow: true, infoMsg: error.message, infoType: "error" })
      );
    } finally {
      dispatch(setLoading({ isLoading: false, loadingMsg: "" }));
    }
  }

  return (
    <BackGround>
      <div className="bg-white bg-opacity-10 rounded-lg shadow-2xl shadow-purple-700/50 w-full max-w-screen-xl">
        <div className="grid grid-cols-1 md:grid-cols-4">
          <div className="col-span-1 flex justify-center w-full p-8 md:p-0">
            <div className="flex justify-center items-center w-3/4 md:w-full border-4 rounded-lg border-red-500/50 shadow-xl shadow-yellow-200/50">
              <img
                src={imageSrc}
                alt="Cover Photo"
                className="aspect-[5/8] w-60 object-cover"
              />
            </div>
          </div>
          <div className="col-span-1 md:col-span-3 m-8">
            <h2 className="text-3xl font-bold text-white text-center mb-6">
              Upload your book
            </h2>
            <form
              onSubmit={handleSubmit(handleBookUpload)}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
                <div>
                  <FormErrorMessage error={errors.coverPhoto} />
                  <InputField
                    label="Cover Image"
                    type="file"
                    placeholder="Upload book's cover photo"
                    onInput={(e) => {
                      console.log(e.target.files);
                      setImageSrc(URL.createObjectURL(e.target.files[0]));
                    }}
                    className="w-full px-4 py-2 mt-1 bg-gray-900 text-gray-300 border border-gray-700 rounded-md focus:outline-none focus:ring focus:border-blue-500 hover:cursor-pointer file:bg-gray-800 file:text-white file:px-4 file:py-1 file:border-none file:rounded-full"
                    {...register("coverPhoto", {
                      required: "Cover Photo is required.",
                    })}
                  />
                </div>
                <div>
                  <FormErrorMessage error={errors.bookTitle} />
                  <InputField
                    label="Book Title"
                    placeholder="Enter book title"
                    className="w-full px-4 py-2 mt-1 bg-gray-900 text-gray-300 border border-gray-700 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                    // integrating react-hook-form
                    {...register("bookTitle", {
                      // validation rules
                      required: "Book title is required.",
                    })}
                  />
                </div>

                <div>
                  <FormErrorMessage error={errors.authorName} />

                  <InputField
                    label="Author Name"
                    placeholder="Enter book author name"
                    className="w-full px-4 py-2 mt-1 bg-gray-900 text-gray-300 border border-gray-700 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                    {...register("authorName", {
                      required: "Author name is required.",
                    })}
                  />
                </div>

                <div>
                  <FormErrorMessage error={errors.pageCount} />
                  <InputField
                    label="Page Count"
                    type="number"
                    placeholder="Enter page count of book"
                    className="w-full px-4 py-2 mt-1 bg-gray-900 text-gray-300 border border-gray-700 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                    {...register("pageCount", {
                      min: {
                        value: 1,
                        message: "Page count should be at least 1.",
                      },
                      required: "Page count is required.",
                    })}
                  />
                </div>

                <div>
                  <FormErrorMessage error={errors.quantity} />
                  <InputField
                    label="Quantity"
                    placeholder="Enter number of books"
                    type="number"
                    className="w-full px-4 py-2 mt-1 bg-gray-900 text-gray-300 border border-gray-700 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                    {...register("quantity", {
                      min: {
                        value: 1,
                        message: "Quantity should be at least 1.",
                      },
                      required: "Quantity is required.",
                    })}
                  />
                </div>

                <div>
                  <FormErrorMessage error={errors.categoryId} />
                  <SelectInput
                    label="Category"
                    placeholder="Select a category"
                    className="w-full px-4 py-2 mt-1 bg-gray-900 text-gray-300 border border-gray-700 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                    options={categories.map((category) => ({
                      value: category.categoryId,
                      name: category.categoryName,
                    }))}
                    {...register("categoryId", {
                      required: "Category is required.",
                    })}
                  />
                </div>
              </div>
              <Button
                type="submit"
                className="w-full px-4 py-2 mt-4 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition duration-200"
              >
                Send for Approval
              </Button>
            </form>
          </div>
        </div>
      </div>
    </BackGround>
  );
}

export default BookUpload;
