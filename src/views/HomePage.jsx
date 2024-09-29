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
      <h2 className="text-xl font-bold lg:pb-2 lg:pt-4">All blogs</h2>
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
