import config from "../config/config";

class UserService
{

    // method to let the user complete the profile
    async completeProfile(jwt, dateOfBirth,
        houseNo,
        street,
        landmark,
        city,
        state,
        country
    )
    {
        // creating address object
        const address = {
            houseNo,
            street,
            landmark,
            city,
            state,
            country
        }

        // creating form data
        const profileData = new FormData()
        profileData.append("dateOfBirth", dateOfBirth)
        profileData.append("address", 
            new Blob(
                [JSON.stringify(address)],
                {
                    type: "application/json"
                }
            )
        )

        return fetch(
            config.urlPrefix + "/users/profile-complete",
            {
                method: "POST",
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": "Bearer "+ jwt
                },
                body: profileData
            }
        )
    }

    // method to get the current user details
    async getUserDetails(jwt)
    {
        return fetch(
            config.urlPrefix + "/users/getUserDetails",
            {
                method: "GET",
                headers: {
                    "Authorization": "Bearer "+ jwt
                }
            }
        )
    }

    // method to update the user details
    async updateUserDetails(jwt, fullName, phoneNumer, dateOfBirth,
        houseNo,
        street,
        landmark,
        city,
        state,
        country
    )
    {
        const requestObj = {
            fullName,
            phoneNumer,
            dateOfBirth,
            address: {
                houseNo,
                street,
                landmark,
                city,
                state,
                country
            }
        }

        return fetch(
            config.urlPrefix + "/users/updateUserProfile",
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer "+ jwt
                },
                body: JSON.stringify(requestObj)
            }
        )
    }

    async deleteUser(jwt)
    {
        return fetch(
            config.urlPrefix + "/users/deleteUserProfile",
            {
                method: "DELETE",
                headers: {
                    "Authorization": "Bearer "+ jwt
                }
            }
        )
    }

}

const userService = new UserService();
export default userService;