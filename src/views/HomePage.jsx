import { useRef, useContext } from "react";

import { Context } from "../ContextProvider";
import Togglable from "../components/Togglable";
import NewBlogForm from "../components/NewBlogForm";
import Blogs from "../components/Blogs";

const HomePage = () => {
  const newBlogFormRef = useRef();
  const { user } = useContext(Context);

  return (
    <>
      {user && (
        <Togglable buttonLabel="new blog" ref={newBlogFormRef}>
          <NewBlogForm newBlogFormRef={newBlogFormRef} />
        </Togglable>
      )}
      <Blogs />
    </>
  );
};

export default HomePage;
