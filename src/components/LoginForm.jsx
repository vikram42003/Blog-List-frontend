import { useState } from "react";
import loginService from "../services/login";
import blogsService from "../services/blogs";

const LoginForm = ({ headerText, setUser, setNotification }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async event => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      blogsService.setToken(JSON.stringify(user).token);
      setUsername("");
      setPassword("");
      setNotification(`success.Logged in as ${user.name}`);
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    } catch (error) {
      console.log("Login Failed! - \n", error.response.data);
      setNotification(`failure.Could not log in - ${error.response.data.error}`);
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>{headerText}</h2>

      <label htmlFor="username">
        username &nbsp;
        <input type="text" id="username" value={username} onChange={e => setUsername(e.target.value)} required/>
      </label>
      <br />

      <label htmlFor="password">
        password &nbsp;
        <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)}  required/>
      </label>
      <br />

      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
