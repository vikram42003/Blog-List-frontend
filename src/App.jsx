import { useState, useEffect } from "react";

import blogService from "./services/blogs";

import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";

const App = () => {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs));
    const storedUser = window.localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem("user");
    setUser(null);
  }

  return user === null ? (
    <LoginForm headerText="log in to application" setUser={setUser} />
  ) : (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in &nbsp;<button type="button" onClick={handleLogout}>log out</button></p>
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
