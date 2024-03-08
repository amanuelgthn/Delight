import { Outlet, Navigate } from "react-router-dom";

// Wrap both signin and signup forms in 
const AuthLayout = () => {
    const isAuthenticated = false;

  return (
    <>
        {isAuthenticated ? (
            <Navigate to="/" />
        ) : (
            <>
            <section className="flex flex-1 justify-center items-center flex-col py-10">
                <Outlet />
            </section>

            <img 
                src="/assets/images/userlogin.png"
                alt="logo"
                className="x1:block h-screen w-1/2 object-cover bg-no-repeat"
            />
            </>
        )}
    </>
  )
}

export default AuthLayout