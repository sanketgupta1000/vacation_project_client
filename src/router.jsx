import App from "./App"

import { SignupPage, LoginPage, ProfileCompletePage, SendOtpPage, EmailVerificationPage } from './pages'
import { AuthLayout } from "./components"

import { createBrowserRouter } from "react-router-dom"

const router = createBrowserRouter( [
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/signup",
                element:(
                    <AuthLayout authentication={false}>
                        <SignupPage/>
                    </AuthLayout>
                )
            },
            {
                path: "/Login",
                element:(
                    <AuthLayout authentication={false}>
                        <LoginPage/>
                    </AuthLayout>
                )
            },
            {
                path: "/verifyEmail",
                element:(
                    <AuthLayout authentication={false}>
                        <EmailVerificationPage/>
                    </AuthLayout>
                )
            },
            {
                path: "/sendOtp",
                element:(
                    <AuthLayout authentication={false}>
                        <SendOtpPage/>
                    </AuthLayout>
                )
            },
            {
                path: "/completeProfile",
                element:(
                    <AuthLayout authentication={true} allowedUserTypes={["NEW_MEMBER"]}>
                        <ProfileCompletePage/>
                    </AuthLayout>
                )
            },
        ],
    },
] )