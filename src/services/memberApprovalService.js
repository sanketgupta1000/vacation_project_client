import config from "../config/config";

class MemberApprovalService 
{
    async getAllMemberApprovalRequests( jwt, pageNumber )
    {
        const queryParams = new URLSearchParams( { pageNumber } )
        return fetch( config.urlPrefix + `/requests/memberApprovalRequests?${queryParams}`,
            {
                // method
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + jwt
                },
            }
        );
    }

    async approveMemberApprovalRequestFromAdmin( request_id, jwt )
    {
        return fetch( config.urlPrefix + "/requests/memberApprovalRequests/" + request_id + "/approveFromAdmin",
            {
                //method 
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + jwt
                },
            }
        );
    }

    async rejectMemberApprovalRequestFromAdmin( request_id, jwt )
    {
        return fetch( config.urlPrefix + "/requests/memberApprovalRequests/" + request_id + "/rejectFromAdmin",
            {
                //method 
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + jwt
                },
            }
        )
    }

    async approveMemberApprovalRequestFromReference( request_id, jwt )
    {
        return fetch( config.urlPrefix + "/requests/memberApprovalRequests/" + request_id + "/approveFromReference",
            {
                //method
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + jwt
                },
            }
        );
    }

    async rejectMemberApprovalRequestFromReference( request_id, jwt )
    {
        return fetch( config.urlPrefix + "/requests/memberApprovalRequests/" + request_id + "/rejectFromReference",
            {
                //method
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + jwt
                },
            }
        )
    }

    async seeAllReferences( jwt, pageNumber )
    {
        const queryParams = new URLSearchParams( { pageNumber } )
        return fetch( config.urlPrefix + `/users/referrals?${queryParams}`,
            {
                //method 
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + jwt
                },
            }
        )
    }

}

const memberApprovalService = new MemberApprovalService();
export default memberApprovalService;