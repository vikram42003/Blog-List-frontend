import { useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import { Context } from "../ContextProvider";
import blogsService from "../services/blogs";

const Blog = ({ blog }) => {
  const queryClient = useQueryClient();
  const { user, showNotification } = useContext(Context);
  const navigate = useNavigate();

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
      navigate("/");
    },
    onError: (error) => {
      console.log(error);
      showNotification(`failure.Could not delete blog - ${error?.response?.data?.error}`);
    },
  });

  const handleUpdateLikes = () => {
    likeBlogMutation.mutate(blog);
  };

  const handleDeleteBlog = () => {
    if (window.confirm(`remove blog ${blog.title} by ${blog.author} ?`)) {
      deleteBlogMutation.mutate(blog);
    }
  };

  if (deleteBlogMutation.isPending) return <div>Deleting blog...</div>;

  return (
    <div>
      <h2>{blog.title}</h2>

      <p>
        <a href={blog.url}>{blog.url}</a>
        <br />

        {`${blog.likes} likes`}
        <button type="button" onClick={handleUpdateLikes}>
          like
        </button>
        <br />

        {`added by ${blog.author}`}
        <br />

        {blog.user && blog.user.username === user.username && (
          <button type="button" onClick={handleDeleteBlog}>
            remove
          </button>
        )}
      </p>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default Blog;
