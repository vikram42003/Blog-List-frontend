import { useState } from "react";
import blogsService from "../services/blogs";

const Blog = ({ blog, blogs, setBlogs, setNotification }) => {
  const [showDetails, setShowDetails] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const toggleShowDetails = () => {
    setShowDetails(!showDetails);
  };

  const updateLikes = async () => {
    try {
      const newBlog = await blogsService.updateLikes({ ...blog, user: blog.user?.id, likes: blog.likes + 1 });
      const newBlogs = blogs.map(blog => (blog.id === newBlog.id ? newBlog : blog));
      newBlogs.sort((a, b) => b.likes - a.likes);
      setBlogs(newBlogs);
    } catch (error) {
      console.log(error);
      setNotification("failure.Error occured when liking");
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };

  return showDetails ? (
    <div style={blogStyle}>
      {blog.title}{" "}
      <button type="button" onClick={toggleShowDetails}>
        hide
      </button>{" "}
      <br />
      {blog.url} <br />
      {`likes ${blog.likes} `}{" "}
      <button type="button" onClick={() => updateLikes()}>
        like
      </button>
      <br />
      {blog.author} <br />
    </div>
  ) : (
    <div style={blogStyle}>
      {blog.title} - by {blog.author}{" "}
      <button type="button" onClick={toggleShowDetails}>
        view
      </button>
    </div>
  );
};

export default Blog;
