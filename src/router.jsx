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
                    <AuthLayout authentication='unauthenticated'>
                        <SignupPage/>
                    </AuthLayout>
                )
            },
            {
                path: "/Login",
                element:(
                    <AuthLayout authentication='unauthenticated'>
                        <LoginPage/>
                    </AuthLayout>
                )
            },
            {
                path: "/verifyEmail",
                element:(
                    <AuthLayout authentication='unauthenticated'>
                        <EmailVerificationPage/>
                    </AuthLayout>
                )
            },
            {
                path: "/sendOtp",
                element:(
                    <AuthLayout authentication='unauthenticated'>
                        <SendOtpPage/>
                    </AuthLayout>
                )
            },
            {
                path: "/completeProfile",
                element:(
                    <AuthLayout authentication='authenticated'>
                        <ProfileCompletePage/>
                    </AuthLayout>
                )
            },
        ],
    },
] )