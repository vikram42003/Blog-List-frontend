import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";

import usersService from "../services/users";

const UserBlogsPage = () => {
  const { id } = useParams();
  const { data, isPending, error } = useQuery({
    queryKey: ["users"],
    queryFn: usersService.getAll,
    refetchOnWindowFocus: false,
  });

  if (isPending) return <div>Loading data...</div>;

  if (error) {
    console.log(error);
    return <div>Some error occured...check console for more info...</div>;
  }

  const user = data.find((d) => d.id === id);

  return (
    <div className="max-w-[800px] mx-auto">
      <h2 className="pb-4 text-2xl font-bold text-electric-purple-dark">{user.name}</h2>
      <div className="w-full bg-red-200 rounded-md">
        <p className="text-lg font-bold bg-red-300 py-2 rounded-t-md px-3">Added blogs</p>
        <ul className="list-inside list-disc px-3 py-2">
          {user.blogs.map((blog) => (
            <li key={blog.id}>
              <Link className="underline" to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserBlogsPage;
