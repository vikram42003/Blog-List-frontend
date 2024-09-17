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

  const style = {
    backgroundColor: "lightGrey",
    display: "flex",
    paddingLeft: "1rem",
    gap: "1rem",
  };

  return (
    <nav style={style}>
      <NavLink to={"/"}>blogs</NavLink>
      <NavLink to={"/users"}>users</NavLink>
      {user && (
        <>
          {user.name} logged in
          <button type="button" onClick={handleLogout}>
            log out
          </button>
        </>
      )}
    </nav>
  );
};

export default NavigationBar;
