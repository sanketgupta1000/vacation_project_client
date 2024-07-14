import { Link } from "react-router-dom";

const UserAvatar = ({
  user = {
    id: null,
    name: null,
    email: null,
    profilePhotoURL: null,
  },
  noLink = false,
}) => {
  return (
    <>
      {noLink ? (
        <div className="space-y-6">
          <div className="flex items-center gap-x-2">
            <img
              className="object-cover aspect-square w-16 rounded-full"
              src={user.profilePhotoURL}
              alt=""
            />

            <div>
              <h1 className="text-lg font-semibold text-gray-200 capitalize dark:text-white">
                {user.name}
              </h1>

              <p className="text-sm text-gray-300 dark:text-gray-400">
                {user.email}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <Link to={`/users/${user.id}`}>
          <UserAvatar user={user} noLink />
        </Link>
      )}
    </>
  );
};

export default UserAvatar;
