import config from "../config/config";

class AuthService
{
    // method to signup
    async signup( email, password, fullName, phoneNumber, referrerId = null )
    {

        // get data as obj
        let signupData = {
            email,
            password,
            fullName,
            phoneNumber,
        }

        if(referrerId)
        {
            signupData.referrer = {}
            signupData.referrer.id = referrerId
        }

        // return the response promise
        return fetch(
            // url to send the request to
            config.urlPrefix + "/auth/signup",
            {
                // method
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                // request body
                body: JSON.stringify( signupData )
            }
        )
    }

    // method to send otp
    async sendOtp( email )
    {

        // first creating a form data
        const formData = new FormData()
        formData.append( "email", email )

        return fetch(
            config.urlPrefix + "/auth/sendOtp",
            {
                method: "POST",
                body: formData
            }
        )
    }

    // method to verify otp
    async verifyOtp( email, otp )
    {

        // first creating a form data
        const formData = new FormData()
        formData.append( "email", email )
        formData.append( "otp", otp )

        return fetch(
            config.urlPrefix + "/auth/verifyOtp",
            {
                method: "POST",
                body: formData
            }
        )
    }

    // method to login
    async login( { email, password } )
    {

        // data object
        const loginData = {
            email,
            password
        }

        // fetching, will get jwt as response
        return fetch(
            config.urlPrefix + "/auth/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify( loginData )
            }
        )

    }


}

const authService = new AuthService();
export default authService;