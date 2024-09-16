import { useEffect } from "react";
import { useContext } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import { Context } from "./ContextProvider";

import HomePage from "./views/HomePage";
import LoginPage from "./views/LoginPage";

import Notification from "./components/Notification";
import UsersPage from "./views/UsersPage";

const App = () => {
  const { user, autoLogin, logout } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    autoLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const isLoggedIn = user || localStorage.getItem("user");
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <Notification />
      <div>
        <h2>blogs</h2>
        {user && (
          <p>
            {user.name} logged in &nbsp;
            <button type="button" onClick={handleLogout}>
              log out
            </button>
          </p>
        )}
      </div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/users" element={<UsersPage />} />
      </Routes>
    </>
  );
};

export default App;
