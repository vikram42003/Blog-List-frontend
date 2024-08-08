import { useState } from "react";
import loginService from "../services/login";

const LoginForm = ({ headerText, setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async event => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      setUsername("");
      setPassword("");
      console.log("Login Successful!");
    } catch (error) {
      console.log("Login Failed! - \n", error.response.data);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>{headerText}</h2>

      <label htmlFor="username">
        username &nbsp;
        <input type="text" id="username" value={username} onChange={e => setUsername(e.target.value)} />
      </label>
      <br />

      <label htmlFor="password">
        password &nbsp;
        <input type="text" id="password" value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      <br />

      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
