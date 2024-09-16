import { useQuery } from "@tanstack/react-query";

import usersService from "../services/users";

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
    <>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={user.username}>
                <td>{user.username} &nbsp;&nbsp;&nbsp;</td>
                <td>{user.blogs.length}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default UsersPage;
