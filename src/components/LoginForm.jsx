import { useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import { login } from "../reducers/userSlice";

const LoginForm = ({ headerText }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();
    dispatch(login({ username, password }));
    setUsername("");
    setPassword("");
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
};

export default LoginForm;
