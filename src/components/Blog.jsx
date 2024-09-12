import { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import blogsService from "../services/blogs";
import { showNotification } from "../reducers/notificationSlice";

const Blog = ({ user, blog, blogs, setBlogs }) => {
  const [showDetails, setShowDetails] = useState(false);
  const dispatch = useDispatch();

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
      blog.likes = blog.likes + 1;
      await blogsService.updateLikes(blog);
      const newBlogs = blogs.map((b) => (b.id === blog.id ? blog : b));
      newBlogs.sort((a, b) => b.likes - a.likes);
      setBlogs(newBlogs);
    } catch (error) {
      console.log(error);
      dispatch(showNotification("failure.Error occured when liking"));
    }
  };

  const handleDeleteBlog = async () => {
    if (window.confirm(`remove blog ${blog.title} by ${blog.author} ?`)) {
      try {
        await blogsService.deleteBlog(blog.id);
        setBlogs(blogs.filter((b) => b.id !== blog.id));
        dispatch(showNotification(`success.${blog.title} by ${blog.author} was deleted`));
      } catch (error) {
        console.log(error);
        dispatch(showNotification(`failure.Could not delete blog - ${error.response.data.error}`));
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
      {blog.user.username === user.username && (
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
};

export default Blog;
