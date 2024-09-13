import { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import { addBlog } from "../reducers/blogsSlice";

const NewBlogForm = ({ newBlogFormRef }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const dispatch = useDispatch();

  const handleAddNewBlog = async (event) => {
    event.preventDefault();
    dispatch(addBlog({ title, author, url }));
    newBlogFormRef.current.toggleVisibility();
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <form onSubmit={handleAddNewBlog}>
      <h2>Create new</h2>
      <label>
        title:
        <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </label>
      <br />
      <label>
        author:
        <input type="text" name="author" value={author} onChange={(e) => setAuthor(e.target.value)} />
      </label>
      <br />
      <label>
        url:
        <input type="text" name="url" value={url} onChange={(e) => setUrl(e.target.value)} required />
      </label>
      <br />
      <button type="submit">submit</button>
      <br />
    </form>
  );
};

NewBlogForm.propTypes = {
  newBlogFormRef: PropTypes.any,
};

export default NewBlogForm;
