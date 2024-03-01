import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSignOutAccount } from "@/lib/react-query/queries";
import { fetchAndUseUser, getCurrentUser } from "@/lib/appwrite/api";

const LeftSidebar = () => {

    // Returns an imperative method for changing the location.
    // Used by <Link>s, but may also be used by other 
    // elements to change the location
  const navigate = useNavigate();

  const user = getCurrentUser();;
  
  const { mutate: signOut, isSuccess } = useSignOutAccount();

     // Accepts a function that contains imperative, possibly effectful code.
     // @param effect — Imperative function that can return a cleanup function
     // @param deps — If present, effect will only activate if the values in the list change.


  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess]);

  return (
    <nav className='leftsidebar'>
        <div className='flex flex-col gap-11'>
        <Link to="/" className="flex gap-3 items-center">
          <img
            src="/assets/icons/DelightLogo.png"
            alt="logo"
            width={50}
          />
        </Link>
        <Link to={`/profile/${user.id}`} className="flex gap-3 items-center">
            <img
              src={user.imageUrl || "/assets/icons/Avatar.png"}
              alt="profile"
              className="h-14 w-14 rounded-full"
            />
            <div className="flex flex-col">
                <p className="body-bold">
                    {user.name}
                </p>
                <p className="small-regular text-light-3">
                    @${user.username}
                </p>
            </div>
          </Link>
        </div>
    </nav>
  )
}

export default LeftSidebar