import { useState, useContext } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";

import { Context } from "../ContextProvider";
import blogsService from "../services/blogs";
import PropTypes from "prop-types";

const NewBlogForm = ({ newBlogFormRef }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const { user, showNotification } = useContext(Context);
  const queryClient = useQueryClient();

  const newBlogMutation = useMutation({
    mutationFn: blogsService.addBlog,
    onSuccess: (createdBlog) => {
      createdBlog.user = {
        id: user.user,
        name: user.name,
        username: user.username,
      };

      const blogs = queryClient.getQueryData(["blogs"]);
      queryClient.setQueryData(["blogs"], blogs.concat(createdBlog));

      setTitle("");
      setAuthor("");
      setUrl("");

      showNotification(`success.${title} by ${author} was added`);
      newBlogFormRef.current.toggleVisibility();
    },
    onError: (error) => {
      console.log("Could not add blog! \n", error);
      showNotification(`failure.Could not add blog - ${error?.response?.data?.error}`);
    },
  });

  const handleAddNewBlog = async (event) => {
    event.preventDefault();
    newBlogMutation.mutate({ title, author, url });
  };

  return (
    <>
      {newBlogMutation.isPending && <div>Adding Blog</div>}
      <form
        className="mx-4 my-8 flex flex-col gap-4 rounded-md border-2 border-red-500 bg-red-50 p-4 lg:gap-6"
        onSubmit={handleAddNewBlog}
      >
        <h2>Create a new blog</h2>
        <label>
          title:
          <input
            className="input"
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label>
          author:
          <input
            className="input"
            type="text"
            name="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </label>
        <label>
          url:
          <input
            className="input"
            type="text"
            name="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
        </label>
        <button
          className="mx-auto w-20 rounded-full bg-red-500 px-3 py-1 font-bold text-white no-underline hover:bg-red-700 hover:text-white"
          type="submit"
        >
          submit
        </button>
      </form>
    </>
  );
};

NewBlogForm.propTypes = {
  newBlogFormRef: PropTypes.any,
};

export default NewBlogForm;
