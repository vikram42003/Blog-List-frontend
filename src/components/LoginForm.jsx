import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { Context } from "../ContextProvider";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(Context);

  const handleLogin = async (event) => {
    event.preventDefault();
    await login({ username, password });
    navigate("/");
    setUsername("");
    setPassword("");
  };

  return (
    <form className="flex flex-col items-center justify-around w-[350px] bg-electric-purple-light rounded-md p-8 m-8 h-[300px] mx-auto border-2 border-electric-purple-light" onSubmit={handleLogin}>
      <h2 className="font-fredoka text-2xl" >Log in to application</h2>

      <label htmlFor="username">
        username &nbsp;
      </label>
        <input className="input" type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />

      <label htmlFor="password">
        password &nbsp;
      </label>
        <input className="input" type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

      <button className="button w-20 mx-auto" type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
