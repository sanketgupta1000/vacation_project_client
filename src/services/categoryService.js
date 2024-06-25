import config from "../config/config";

class CategoryService
{
    // Get all categories
    async getAllCategories( jwt )
    {
        return fetch(
            config.urlPrefix + "/categories",
            {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + jwt
                }
            }
        )
    }
}

const categoryService = new CategoryService();
export default categoryService;