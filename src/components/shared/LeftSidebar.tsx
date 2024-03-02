import { useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useSignOutAccount } from "@/lib/react-query/queries";
import { fetchAndUseUser, getCurrentUser } from "@/lib/appwrite/api";
import { useUserContext } from "@/context/AuthContext";
import { INavLink } from "@/types";
import { sidebarLinks } from "@/constants";
import { Button } from "../ui/button";

const LeftSidebar = () => {
  const { pathname } = useLocation();
    // to check the current active session of the leftsidebar such as home
    // explore people saved or create Post
  const navigate = useNavigate();
    // Returns an imperative method for changing the location.
    // Used by <Link>s, but may also be used by other 
    // elements to change the location
  const { user } = useUserContext();
  
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
          /><strong>Delight</strong>
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
          <ul className="flex flex-col gap-6">
            {sidebarLinks.map((link: INavLink) => {
              const isDisplayed = pathname === link.route;
              // isDisplayed is a variable to check which route 
              // currently is displayed in the page
              return (
                <li key={link.label} className={`leftsidebar-link ${ 
                  isDisplayed && 'bg-primary-500'}`}>
                  <NavLink
                      to={link.route}
                      className="flex gap-4 items-center p-4"
                >
                  <img
                    src={link.imgURL}
                    alt={link.label}
                    className="group-hover:invert-white"
                    />
                  {link.label}
                  </NavLink>
                </li>
              )
            })}
          </ul>
        </div>
        <Button
          variant="ghost"
          className="shad-button_ghost"
          onClick={() => signOut()}>
          <img src="/assets/icons/logout.svg" alt="logout"
                title="logout" />
          <p><strong>Logout</strong></p>
        </Button>
    </nav>
  )
}

export default LeftSidebar