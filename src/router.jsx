import App from "./App";

import {
  LandingPage,
  SignupPage,
  LoginPage,
  ProfileCompletePage,
  SendOtpPage,
  EmailVerificationPage,
  UserProfilePage,
  MemberApprovalRequestsPage,
  ReferenceRequestsPage,
  BookUploadPage,
  BookApprovalRequestsPageForAdmin,
  BookApprovalRequestsPageForMember,
  AllBooksPage,
  BookPage,
  BookCopyPage,
  ReceivedBorrowRequestsPage,
  SentBorrowRequestsPage,
} from "./pages";
import { AuthLayout } from "./components";

import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <SignupPage />
          </AuthLayout>
        ),
      },
      {
        path: "/Login",
        element: (
          <AuthLayout authentication={false}>
            <LoginPage />
          </AuthLayout>
        ),
      },
      {
        path: "/verifyEmail",
        element: (
          <AuthLayout authentication={false}>
            <EmailVerificationPage />
          </AuthLayout>
        ),
      },
      {
        path: "/sendOtp",
        element: (
          <AuthLayout authentication={false}>
            <SendOtpPage />
          </AuthLayout>
        ),
      },
      {
        path: "/completeProfile",
        element: (
          <AuthLayout authentication={true} allowedUserTypes={["NEW_MEMBER"]}>
            <ProfileCompletePage />
          </AuthLayout>
        ),
      },
      {
        path: "/users/:userId",
        element: (
          <AuthLayout
            authentication={true}
            allowedUserTypes={["MEMBER", "ADMIN"]}
          >
            <UserProfilePage />
          </AuthLayout>
        ),
      },
      {
        path: "/requests/memberApprovalRequests",
        element: (
          <AuthLayout authentication={true} allowedUserTypes={["ADMIN"]}>
            <MemberApprovalRequestsPage />
          </AuthLayout>
        ),
      },
      {
        path: "/requests/referenceRequests",
        element: (
          <AuthLayout
            authentication={true}
            allowedUserTypes={["MEMBER", "ADMIN"]}
          >
            <ReferenceRequestsPage />
          </AuthLayout>
        ),
      },
      {
        path: "/books/uploadBook",
        element: (
          <AuthLayout
            authentication={true}
            allowedUserTypes={["MEMBER", "ADMIN"]}
          >
            <BookUploadPage />
          </AuthLayout>
        ),
      },
      {
        path: "/requests/bookApprovalRequests",
        element: (
          <AuthLayout authentication={true} allowedUserTypes={["ADMIN"]}>
            <BookApprovalRequestsPageForAdmin />
          </AuthLayout>
        ),
      },
      {
        path: "/requests/myBookApprovalRequests",
        element: (
          <AuthLayout
            authentication={true}
            allowedUserTypes={["ADMIN", "MEMBER"]}
          >
            <BookApprovalRequestsPageForMember />
          </AuthLayout>
        ),
      },
      {
        path: "/books",
        element: (
          <AuthLayout
            authentication={true}
            allowedUserTypes={["MEMBER", "ADMIN"]}
          >
            <AllBooksPage />
          </AuthLayout>
        ),
      },
      {
        path: "/books/:bookId",
        element: (
          <AuthLayout
            authentication={true}
            allowedUserTypes={["MEMBER", "ADMIN"]}
          >
            <BookPage />
          </AuthLayout>
        ),
      },
      {
        path: "/bookCopies/:bookCopyId",
        element: (
          <AuthLayout
            authentication={true}
            allowedUserTypes={["MEMBER", "ADMIN"]}
          >
            <BookCopyPage />
          </AuthLayout>
        ),
      },
      {
        path: "/requests/borrowRequests",
        element: (
          <AuthLayout
            authentication={true}
            allowedUserTypes={["MEMBER", "ADMIN"]}
          >
            <ReceivedBorrowRequestsPage />
          </AuthLayout>
        ),
      },
      {
        path: "/requests/myBorrowRequests",
        element: (
          <AuthLayout
            authentication={true}
            allowedUserTypes={["MEMBER", "ADMIN"]}
          >
            <SentBorrowRequestsPage />
          </AuthLayout>
        ),
      },
    ],
  },
]);

export default router;
