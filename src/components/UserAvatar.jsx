const UserAvatar = ({
    user={
        id: null,
        name: null,
        email: null,
    }
})=>
{
    return(
        <div className="space-y-6">
            <div className="flex items-center gap-x-2">
                <img className="object-cover w-10 h-10 rounded-full" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=faceare&facepad=3&w=688&h=688&q=100" alt=""/>
                
                <div>
                    <h1 className="text-lg font-semibold text-gray-200 capitalize dark:text-white">{user.name}</h1>

                    <p className="text-sm text-gray-300 dark:text-gray-400">{user.email}</p>
                </div>
            </div>
        </div>
    )
}

export default UserAvatar