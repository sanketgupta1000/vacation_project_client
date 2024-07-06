import config from "../config/config";

class UserService
{

    // method to let the user complete the profile
    async completeProfile( jwt, { profilePhoto,
        dateOfBirth,
        houseNo,
        street,
        landmark,
        city,
        state,
        country }
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
        profileData.append( "profilePhoto", profilePhoto[ 0 ] )
        profileData.append( "dateOfBirth", dateOfBirth )
        profileData.append( "address", JSON.stringify( address ) )

        return fetch(
            config.urlPrefix + "/users/completeProfile",
            {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + jwt
                },
                body: profileData
            }
        )
    }

    // method to get the current user details
    async getUserDetails( jwt, userId )
    {
        return fetch(
            `${config.urlPrefix}/users/${userId}`,
            {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + jwt
                }
            }
        )
    }

    // method to update the user details
    async updateUserDetails( jwt, { profilePhoto, fullName, phoneNumber, dateOfBirth,
        houseNo,
        street,
        landmark,
        city,
        state,
        country }
    )
    {
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
        profileData.append( "profilePhoto", profilePhoto )
        profileData.append( "fullName", fullName )
        profileData.append( "phoneNumber", phoneNumber )
        profileData.append( "address", JSON.stringify( address ) )
        profileData.append( "dateOfBirth", dateOfBirth )

        return fetch(
            config.urlPrefix + "/users/updateProfile",
            {
                method: "PUT",
                headers: {
                    "Authorization": "Bearer " + jwt
                },
                body: profileData,
            }
        )
    }

    // async deleteUser(jwt)
    // {
    //     return fetch(
    //         config.urlPrefix + "/users/deleteUserProfile",
    //         {
    //             method: "DELETE",
    //             headers: {
    //                 "Authorization": "Bearer "+ jwt
    //             }
    //         }
    //     )
    // }

    // method to search for users by name or email
    async getUsersByNameOrEmail( searchValue )
    {
        return fetch(
            config.urlPrefix + `/users/members/search?searchStr=${searchValue}`,
            {
                method: "GET"
            }
        )
    }

}

const userService = new UserService();
export default userService;