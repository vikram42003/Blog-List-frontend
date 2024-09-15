import { useState, useContext } from "react";

import { Context } from "../ContextProvider";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(Context);

  const handleLogin = async (event) => {
    event.preventDefault();
    login({ username, password });
    setUsername("");
    setPassword("");
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>log in to application</h2>

      <label htmlFor="username">
        username &nbsp;
        <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
      </label>
      <br />

      <label htmlFor="password">
        password &nbsp;
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </label>
      <br />

      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
