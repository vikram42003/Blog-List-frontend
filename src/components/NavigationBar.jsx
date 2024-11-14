import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { Context } from "../ContextProvider";

const NavigationBar = () => {
  const { user, logout, showNotification } = useContext(Context);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
    showNotification("success.Successfully logged out");
  };

  return (
    <div className="flex items-center justify-between gap-5 py-6 pb-12">
      <div className="font-fredoka text-4xl max-sm:text-xl">Blog App</div>
      <nav className="flex items-center gap-4 font-medium max-sm:gap-2 lg:gap-8 lg:text-lg">
        <NavLink to={"/"}>blogs</NavLink>
        <NavLink to={"/users"}>users</NavLink>
        {user ? (
          <>
            <div>
              <span className="max-sm:hidden">logged in as </span>
              <span className="visible text-electric-purple-dark">{user.name} </span>
            </div>
            <button className="button" type="button" onClick={handleLogout}>
              log out
            </button>
          </>
        ) : (
          <NavLink className="button" to={"/login"}>
            Log in
          </NavLink>
        )}
      </nav>
    </div>
  );
};

export default NavigationBar;
