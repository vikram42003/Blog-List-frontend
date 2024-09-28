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

  return (
    <div>
      {blogs.map((b) => (
        <div key={b.id} className="font-fredoka border-2 my-3 rounded-md border-electric-purple-light hover:bg-red-50">
          <Link className="flex h-full w-full p-4" to={`/blogs/${b.id}`}>{`${b.title} - by ${b.author}`}</Link>
        </div>
      ))}
    </div>
  );
};

export default Blogs;
