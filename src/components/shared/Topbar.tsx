import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useUserContext } from "@/context/AuthContext";
import { useSignOutAccount } from "@/lib/react-query/queries";

const Topbar = () => {

    // Returns an imperative method for changing the location.
    // Used by <Link>s, but may also be used by other 
    // elements to change the location
  const navigate = useNavigate();

  const { user } = useUserContext();

  const { mutate: signOut, isSuccess } = useSignOutAccount();

     // Accepts a function that contains imperative, possibly effectful code.
     // @param effect — Imperative function that can return a cleanup function
     // @param deps — If present, effect will only activate if the values in the list change.


  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess]);

  return (
    <section className="topbar">
      <div className="flex-between py-4 px-5">
        <Link to="/" className="flex gap-3 items-center">
          <img
            src="/assets/icons/DelightLogo.png"
            alt="logo"
            width={50}
          />
        </Link>

        <div className="flex gap-4">
          <Button
            variant="ghost"
            className="shad-button_ghost"
            onClick={() => signOut()}>
            <img src="/assets/icons/logout.svg" alt="logout" />
          </Button>
          <Link to={`/profile/${user.id}`} className="flex-center gap-3">
            <img
              src={user.imageUrl || "/assets/icons/Avatar.png"}
              alt="profile"
              className="h-8 w-8 rounded-full"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Topbar;