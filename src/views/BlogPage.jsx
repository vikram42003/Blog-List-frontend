import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";

import blogsService from "../services/blogs";
import Blog from "../components/Blog";

const BlogPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isPending, error } = useQuery({
    queryKey: ["blogs"],
    queryFn: blogsService.getAll,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    const blog = data?.find((b) => b.id === id);
    if (!blog && !isPending) {
      const timeout = setTimeout(() => {
        navigate("/");
      }, 5000);

      return () => clearTimeout(timeout);
    }
  }, [id, data, isPending, navigate]);

  if (isPending) return <div>Loading data</div>;

  if (error) {
    console.log(error);
    return <div>An error occured...check console for more info...</div>;
  }

  const blog = data.find((b) => b.id === id);

  if (!blog) {
    return <div>{`No blog found for id - ${id}.   Redirecting to homepage...`}</div>;
  }

  return <Blog blog={blog} />;
};

export default BlogPage;
