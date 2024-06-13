import config from "../config/config";

class MemberApprovalService 
{
    async getAllMemberApprovalRequests(jwt)
    {
        return fetch(config.urlPrefix+"/memberApprovalRequests",
            {
                // method
                method: "GET",
                headers: {
                    "Authorization":"Bearer "+jwt
                },
            }
        );
    }

    async approveMemberApprovalRequestFromAdmin(request_id,jwt)
    {
        return fetch(config.urlPrefix+"/memberApprovalRequests/"+request_id+"/approveFromAdmin",
            {
                //method 
                method:"POST",
                headers: {
                    "Authorization":"Bearer "+jwt
                },
            }
        );
    }

    async rejectMemberApprovalRequestFromAdmin(request_id,jwt)
    {
        return fetch(config.urlPrefix+"/memberApprovalRequests/"+request_id+"/rejectFromAdmin",
            {
                //method 
                method:"POST",
                headers: {
                    "Authorization":"Bearer "+jwt
                },
            }
        )
    }

    async approveMemberApprovalRequestFromReference(request_id,jwt)
    {
        return fetch(config.urlPrefix+"/memberApprovalRequests/"+request_id+"/approveFromReference",
            {
                //method
                method:"POST",
                headers: {
                    "Authorization":"Bearer "+jwt
                },
            }
        );
    }

    async rejectMemberApprovalRequestFromReference(request_id,jwt)
    {
        return fetch(config.urlPrefix+"/memberApprovalRequests/"+request_id+"/rejectFromReference",
            {
                //method
                method:"POST",
                headers: {
                    "Authorization":"Bearer "+jwt
                },
            }
        )
    }

    async seeAllReferences(jwt)
    {
        return fetch(config.urlPrefix+"/getAllreferences",
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

const memberApprovalService = new MemberApprovalService();
export default memberApprovalService;