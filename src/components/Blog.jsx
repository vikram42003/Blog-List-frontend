import { useState } from "react";
import PropTypes from "prop-types";

const Blog = ({ blog, handleUpdateLikes, handleDeleteBlog }) => {
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
      {handleDeleteBlog && (
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
  blog: PropTypes.object.isRequired,
  handleUpdateLikes: PropTypes.func.isRequired,
  handleDeleteBlog: PropTypes.func,
};

export default Blog;
