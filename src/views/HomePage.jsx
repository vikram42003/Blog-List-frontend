import { useRef } from "react";

import Togglable from "../components/Togglable";
import NewBlogForm from "../components/NewBlogForm";
import Blogs from "../components/Blogs";

const HomePage = () => {
  const newBlogFormRef = useRef();

  return (
    <>
      <Togglable buttonLabel="new blog" ref={newBlogFormRef}>
        <NewBlogForm newBlogFormRef={newBlogFormRef} />
      </Togglable>
      <Blogs />
    </>
  );
};

export default HomePage;
