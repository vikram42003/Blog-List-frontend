import { useState, useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import PropTypes from "prop-types";

import { Context } from "../ContextProvider";
import blogsService from "../services/blogs";

const Blog = ({ blog }) => {
  const queryClient = useQueryClient();
  const [showDetails, setShowDetails] = useState(false);
  const { user, showNotification } = useContext(Context);

  const likeBlogMutation = useMutation({
    mutationFn: blogsService.updateLikes,
    onMutate: (likedBlog) => {
      // Optimistic update
      const blogs = queryClient.getQueryData(["blogs"]);
      queryClient.setQueryData(
        ["blogs"],
        blogs
          .map((b) => (b.id === likedBlog.id ? { ...b, likes: likedBlog.likes + 1 } : b))
          .sort((a, b) => b.likes - a.likes)
      );
    },
    onError: (error, likedBlog) => {
      // Rollback optimistic update
      console.log(error);
      showNotification("failure.Error occured when liking");
      const blogs = queryClient.getQueryData(["blogs"]);
      queryClient.setQueryData(
        ["blogs"],
        blogs
          .map((b) => (b.id === likedBlog.id ? { ...b, likes: likedBlog.likes - 1 } : b))
          .sort((a, b) => b.likes - a.likes)
      );
    },
  });

  const deleteBlogMutation = useMutation({
    mutationFn: blogsService.deleteBlog,
    onSuccess: (_, blog) => {
      const blogs = queryClient.getQueryData(["blogs"]);
      queryClient.setQueryData(
        ["blogs"],
        blogs.filter((b) => b.id !== blog.id).sort((a, b) => b.likes - a.likes)
      );
      showNotification(`success.${blog.title} by ${blog.author} was deleted`);
    },
    onError: (error) => {
      console.log(error);
      showNotification(`failure.Could not delete blog - ${error?.response?.data?.error}`);
    },
  });

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

  const handleUpdateLikes = () => {
    likeBlogMutation.mutate(blog);
  };

  const handleDeleteBlog = () => {
    if (window.confirm(`remove blog ${blog.title} by ${blog.author} ?`)) {
      deleteBlogMutation.mutate(blog);
    }
  };

  if (deleteBlogMutation.isPending) return <div style={blogStyle}>Deleting blog...</div>;

  return showDetails ? (
    <div style={blogStyle}>
      {blog.title}{" "}
      <button type="button" onClick={toggleShowDetails}>
        hide
      </button>{" "}
      <br />
      {blog.url} <br />
      {`likes ${blog.likes} `}
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
  blog: PropTypes.object.isRequired,
};

export default Blog;
