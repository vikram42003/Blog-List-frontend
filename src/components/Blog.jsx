import { useState } from "react";
import blogsService from "../services/blogs";
import PropTypes from "prop-types";

const Blog = ({ user, blog, blogs, setBlogs, setNotification }) => {
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

  const handleUpdateLikes = async () => {
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

  const handleDeleteBlog = async () => {
    if (window.confirm(`remove blog ${blog.title} by ${blog.author} ?`)) {
      try {
        await blogsService.deleteBlog(blog.id);
        setBlogs(blogs.filter(b => b.id !== blog.id));
        setNotification(`success.${blog.title} by ${blog.author} was deleted`);
        setTimeout(() => {
          setNotification(null);
        }, 5000);
      } catch (error) {
        console.log(error);
        setNotification(`failure.Could not delete blog - ${error.response.data.error}`);
        setTimeout(() => {
          setNotification(null);
        }, 5000);
      }
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
      <button type="button" onClick={handleUpdateLikes}>
        like
      </button>
      <br />
      {blog.author} <br />
      {blog.user && blog.user.username === user.username && (
        <button type="button" onClick={handleDeleteBlog}>
          remove
        </button>
      )}
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

Blog.propTypes = {
  user: PropTypes.object.isRequired,
  blog: PropTypes.object.isRequired,
  blogs: PropTypes.arrayOf(PropTypes.object).isRequired,
  setBlogs: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired,
};

export default Blog;
