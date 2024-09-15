import { useEffect, useRef } from "react";
import { useContext } from "react";

import { Context } from "./ContextProvider";

import LoginForm from "./components/LoginForm";
import NewBlogForm from "./components/NewBlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import Blogs from "./components/Blogs";

const App = () => {
  const { user, autoLogin, logout } = useContext(Context);

  const newBlogFormRef = useRef();

  useEffect(() => {
    autoLogin();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <Notification />
      {user === null ? (
        <LoginForm />
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
