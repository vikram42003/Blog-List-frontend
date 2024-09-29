import { useQuery } from "@tanstack/react-query";

import usersService from "../services/users";
import { Link } from "react-router-dom";

const UsersPage = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ["users"],
    queryFn: usersService.getAll,
    refetchOnWindowFocus: false,
  });
  const users = data;

  if (isPending) return <div>Loading users...</div>;

  if (error) {
    console.log("error occured while fetching users\n", error);
    return <div>An error occured...</div>;
  }

  return (
    <div className="mx-auto max-w-[800px]">
      <table className="w-full table-auto rounded-md bg-electric-purple-light text-left">
        <thead className="text-xl text-electric-purple-dark">
          <tr>
            <th className="p-3">Users</th>
            <th className="p-3">blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr className="odd:bg-red-100 even:bg-red-200" key={user.username}>
                <td className="p-3">
                  <Link className="underline" to={user.id}>{user.username}</Link> &nbsp;&nbsp;&nbsp;
                </td>
                <td className="p-3">{user.blogs.length}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UsersPage;
