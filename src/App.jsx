import { useEffect } from "react";
import { useContext } from "react";
import { Route, Routes } from "react-router-dom";

import { Context } from "./ContextProvider";

import HomePage from "./views/HomePage";
import LoginPage from "./views/LoginPage";
import UserBlogsPage from "./views/UserBlogsPage";
import BlogPage from "./views/BlogPage";

import Notification from "./components/Notification";
import UsersPage from "./views/UsersPage";
import NavigationBar from "./components/NavigationBar";

const App = () => {
  const { autoLogin } = useContext(Context);

  useEffect(() => {
    autoLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Notification />
      <NavigationBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/users/:id" element={<UserBlogsPage />} />
        <Route path="/blogs/:id" element={<BlogPage />} />
      </Routes>
    </>
  );
};

export default App;
