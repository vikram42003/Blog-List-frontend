import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import { logout, initializeUser } from "./reducers/userSlice";
import { initializeBlogs } from "./reducers/blogsSlice";

import Blogs from "./components/Blogs";
import LoginForm from "./components/LoginForm";
import NewBlogForm from "./components/NewBlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

const App = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const newBlogFormRef = useRef();

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUser());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <Notification />
      {user === null ? (
        <LoginForm headerText="log in to application" />
      ) : (
        <div>
          <h2>blogs</h2>
          <p>
            {user.name} logged in &nbsp;
            <button type="button" onClick={handleLogout}>
              log out
            </button>
          </p>
          <Togglable buttonLabel="new blog" ref={newBlogFormRef}>
            <NewBlogForm newBlogFormRef={newBlogFormRef} />
          </Togglable>
          <Blogs />
        </div>
      )}
    </>
  );
};

export default App;
