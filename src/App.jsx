import { useState, useEffect, useRef } from "react";
import { useContext } from "react";

import { Context } from "./ContextProvider";
import blogService from "./services/blogs";

import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import NewBlogForm from "./components/NewBlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

const App = () => {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const { showNotification } = useContext(Context);

  const newBlogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      blogs.sort((a, b) => b.likes - a.likes);
      setBlogs(blogs);
    });

    const storedUser = window.localStorage.getItem("user");
    if (storedUser) {
      const usr = JSON.parse(storedUser);
      setUser(usr);
      blogService.setToken(usr.token);
    }
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem("user");
    setUser(null);
    blogService.setToken(null);
    showNotification("success.Successfully logged out");
  };

  return (
    <>
      <Notification />
      {user === null ? (
        <LoginForm headerText="log in to application" setUser={setUser} />
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
            <NewBlogForm blogs={blogs} setBlogs={setBlogs} newBlogFormRef={newBlogFormRef} />
          </Togglable>
          {blogs.map((blog) => (
            <Blog key={blog.id} user={user} blog={blog} blogs={blogs} setBlogs={setBlogs} />
          ))}
        </div>
      )}
    </>
  );
};

export default App;
