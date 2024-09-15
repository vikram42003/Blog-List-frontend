import { useQuery } from "@tanstack/react-query";

import blogsService from "../services/blogs";

import Blog from "./Blog";

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

  return (
    <div>
      {blogs.map((b) => (
        <Blog key={b.id} blog={b} />
      ))}
    </div>
  );
};

export default Blogs;
