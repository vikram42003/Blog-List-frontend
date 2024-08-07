import { useState, useEffect } from "react";

import blogService from "./services/blogs";

import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";

const App = () => {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs));
  }, []);

  return user === null ? (
    <LoginForm headerText="log in to application" setUser={setUser} />
  ) : (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in</p>
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
