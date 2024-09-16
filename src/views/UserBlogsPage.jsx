import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

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
    <>
      <h2>{user.name}</h2>
      <p>
        <b>added blogs</b>
      </p>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </>
  );
};

export default UserBlogsPage;
