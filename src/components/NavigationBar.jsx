import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { Context } from "../ContextProvider";

const NavigationBar = () => {
  const { user, logout } = useContext(Context);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-between gap-5 py-5">
      <div className="font-fredoka text-3xl">Blog App</div>
      <nav className="flex items-center gap-4 font-medium lg:gap-8 lg:text-lg">
        <NavLink to={"/"}>
          blogs
        </NavLink>
        <NavLink to={"/users"}>users</NavLink>
        {user ? (
          <>
            <div>
              logged in as <span className="text-electric-purple">{user.name} </span>
            </div>
            <button type="button" onClick={handleLogout}>
              log out
            </button>
          </>
        ) : (
          <NavLink to={"/login"}>Log in</NavLink>
        )}
      </nav>
    </div>
  );
};

export default NavigationBar;
