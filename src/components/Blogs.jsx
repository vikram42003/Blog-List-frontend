import { useSelector, useDispatch } from "react-redux";

import Blog from "./Blog";
import { addLike, deleteBlog } from "../reducers/blogsSlice";

const Blogs = () => {
  const user = useSelector((state) => state.user);
  const blogs = useSelector((state) => state.blogs);
  const dispatch = useDispatch();

  const handleUpdateLikesCreator = (blog) => {
    return () => dispatch(addLike(blog));
  };

  const handleDeleteBlogCreator = (blog) => {
    return () => {
      if (window.confirm(`remove blog ${blog.title} by ${blog.author} ?`)) {
        dispatch(deleteBlog(blog));
      }
    };
  };

  return (
    <div>
      {blogs.map((b) => (
        <Blog
          key={b.id}
          blog={b}
          handleUpdateLikes={handleUpdateLikesCreator(b)}
          handleDeleteBlog={b.user && user.username === b.user.username ? handleDeleteBlogCreator(b) : null}
        />
      ))}
    </div>
  );
};

export default Blogs;
