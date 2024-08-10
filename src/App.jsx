import { useState, useEffect, useRef } from "react";

import blogService from "./services/blogs";

import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import NewBlogForm from "./components/NewBlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

const App = () => {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [notification, setNotification] = useState(null);

  const newNoteFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then(blogs => {
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
    setNotification("success.Successfully logged out");
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  return (
    <>
      {notification && <Notification notification={notification} />}
      {user === null ? (
        <LoginForm headerText="log in to application" setUser={setUser} setNotification={setNotification} />
      ) : (
        <div>
          <h2>blogs</h2>
          <p>
            {user.name} logged in &nbsp;
            <button type="button" onClick={handleLogout}>
              log out
            </button>
          </p>
          <Togglable buttonLabel="new blog" ref={newNoteFormRef}>
            <NewBlogForm
              blogs={blogs}
              setBlogs={setBlogs}
              setNotification={setNotification}
              newNoteFormRef={newNoteFormRef}
            />
          </Togglable>
          {blogs.map(blog => (
            <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs} setNotification={setNotification} />
          ))}
        </div>
      )}
    </>
  );
};

export default App;
