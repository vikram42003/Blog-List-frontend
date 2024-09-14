import { useState, useContext } from "react";
import PropTypes from "prop-types";

import { Context } from "../ContextProvider";
import loginService from "../services/login";
import blogsService from "../services/blogs";

const LoginForm = ({ headerText, setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { showNotification } = useContext(Context);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      blogsService.setToken(user.token);
      setUsername("");
      setPassword("");
      showNotification(`success.Logged in as ${user.name}`);
    } catch (error) {
      console.log("Login Failed! - \n", error.response.data);
      showNotification(`failure.Could not log in - ${error.response.data.error}`);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>{headerText}</h2>

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

LoginForm.propTypes = {
  headerText: PropTypes.string.isRequired,
  setUser: PropTypes.func.isRequired,
};

export default LoginForm;
