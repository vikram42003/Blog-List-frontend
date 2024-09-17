import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import blogsService from "../services/blogs";

const Blogs = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const result = await blogsService.getAll();
      return result.sort((a, b) => b.likes - a.likes);
    },
    refetchOnWindowFocus: false,
  });

  if (isPending) return <div>Loading blogs...</div>;

  if (error) {
    console.log(error);
    return <div>An error occured check console for more info</div>;
  }

  const blogs = data;

  const blogLinkStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div>
      {blogs.map((b) => (
        <div key={b.id} style={blogLinkStyle}>
          <Link to={`/blogs/${b.id}`}>{`${b.title} - by ${b.author}`}</Link>
        </div>
      ))}
    </div>
  );
};

export default Blogs;
