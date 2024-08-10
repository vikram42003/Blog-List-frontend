import { useState } from "react";
import blogsService from "../services/blogs";

const NewBlogForm = ({ blogs, setBlogs, setNotification, newNoteFormRef }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleAddNewBlog = async event => {
    event.preventDefault();

    try {
      const newBlog = await blogsService.addBlog({ title, author, url });
      console.log("Blog successfully added!");
      newNoteFormRef.current.toggleVisibility();
      setBlogs([...blogs, newBlog]);
      setTitle("");
      setAuthor("");
      setUrl("");
      setNotification(`success.${title} by ${author} was added`);
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    } catch (error) {
      console.log("Could not add blog! \n", error);
      setNotification(`failure.Could not add blog - ${error.response.data.error}`);
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };

  return (
    <form onSubmit={handleAddNewBlog}>
      <h2>Create new</h2>
      <label>
        title:
        <input type="text" name="title" value={title} onChange={e => setTitle(e.target.value)} required />
      </label>
      <br />
      <label>
        author:
        <input type="text" name="author" value={author} onChange={e => setAuthor(e.target.value)} />
      </label>
      <br />
      <label>
        url:
        <input type="text" name="url" value={url} onChange={e => setUrl(e.target.value)} required />
      </label>
      <br />
      <button type="submit">submit</button>
      <br />
    </form>
  );
};

export default NewBlogForm;
