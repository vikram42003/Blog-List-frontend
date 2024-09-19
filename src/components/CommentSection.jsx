import { useState, useContext } from "react";
import PropTypes from "prop-types";
import { useQueryClient, useMutation } from "@tanstack/react-query";

import blogsService from "../services/blogs";
import { Context } from "../ContextProvider";

const CommentSection = ({ commentsArray, blogId }) => {
  const [comment, setComment] = useState("");
  const { showNotification } = useContext(Context);

  const queryClient = useQueryClient();
  const addCommentMutation = useMutation({
    mutationFn: ({ commentToAdd }) => blogsService.addComment(commentToAdd, blogId),
    onMutate: () => {
      // Optimistic update
      const oldBlogs = queryClient.getQueryData(["blogs"]);
      queryClient.setQueryData(
        ["blogs"],
        oldBlogs.map((b) => (b.id === blogId ? { ...b, comments: [...b.comments, comment] } : b))
      );

      setComment("");

      showNotification("success.Comment successfully added");
      return oldBlogs;
    },
    onError: (error, _, oldBlogs) => {
      // Rollback optimistic update
      console.log(error);
      showNotification(`failure.Could not add comment - check console for more info`);
      queryClient.setQueryData(["blogs"], oldBlogs);
    },
  });

  const handleAddComment = () => addCommentMutation.mutate({ commentToAdd: comment });

  return (
    <div>
      <h3>comments</h3>

      <div>
        <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} />
        <button type="button" onClick={handleAddComment}>
          add comment
        </button>
      </div>

      {!commentsArray || commentsArray.length == 0 ? (
        <p>no comments yet</p>
      ) : (
        <ul>
          {commentsArray.map((comment) => (
            <li key={comment}>{comment}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

CommentSection.propTypes = {
  commentsArray: PropTypes.arrayOf(PropTypes.string),
  blogId: PropTypes.string.isRequired,
};

export default CommentSection;
