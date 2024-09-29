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
    <div className="rounded-md border-2 border-red-300 bg-red-100 p-3">
      <h3 className="text-center font-fredoka text-2xl font-medium text-red-500">comments</h3>

      <div className="flex items-center py-4">
        <textarea
          className="mr-2 flex-grow rounded-md p-2"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        >
          {" "}
        </textarea>
        <button
          className="max-sm:text-sm rounded-full bg-red-500 px-3 py-1 font-bold text-white no-underline hover:bg-red-700 hover:text-white"
          type="button"
          onClick={handleAddComment}
        >
          add comment
        </button>
      </div>

      {!commentsArray || commentsArray.length == 0 ? (
        <p className="text-center text-lg font-medium text-red-500">no comments yet</p>
      ) : (
        <ul className="list-inside list-disc px-2">
          {commentsArray.map((comment) => (
            <li className="my-2 break-words rounded-md px-4 py-2 odd:bg-red-300 even:bg-red-200" key={comment}>
              {comment}
            </li>
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
