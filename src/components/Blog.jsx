import { useState } from "react";

const Blog = ({ blog }) => {
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
      {`likes ${blog.likes} `} <button type="button">like</button><br />
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
