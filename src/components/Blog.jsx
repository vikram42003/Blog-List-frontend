import { useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import { Context } from "../ContextProvider";
import blogsService from "../services/blogs";
import CommentSection from "./CommentSection";

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
    onSuccess: () => {
      showNotification("Blog liked")
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
    <div className="mx-auto max-w-[1000px] px-6">
      <h2 className="text-center text-3xl font-bold text-electric-purple-dark">{blog.title}</h2>

      <p className="text-center text-lg font-medium">
        by <span className="text-electric-purple">{blog.author}</span>
      </p>

      <div className="mx-auto flex w-full items-center justify-between py-6 font-medium">
        <p>
          url -{"  "}
          <span className="text-electric-purple underline">
            <a href={blog.url}>{blog.url}</a>
          </span>
        </p>

        <p>
          {blog.user && blog?.user?.username === user?.username && (
            <button className="button" type="button" onClick={handleDeleteBlog}>
              remove
            </button>
          )}
        </p>

        <p>
          {`❤️ ${blog.likes} `}
          <button
            className="rounded-full bg-red-500 px-3 py-1 font-bold text-white no-underline hover:bg-red-700 hover:text-white"
            type="button"
            onClick={handleUpdateLikes}
          >
            like
          </button>
        </p>
      </div>

      <div className="pt-32 max-lg:pb-6">
        <CommentSection commentsArray={blog.comments} blogId={blog.id} />
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default Blog;
