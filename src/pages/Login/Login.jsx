import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

import { UserContext } from "../../context/userContext";
import { api } from "../../services/api";
import "./Login.scss";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUserInfo } = useContext(UserContext);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await api.post(
        "/login",
        {
          username: username,
          password: password,
        },
        { withCredentials: true }
      );
      if (result.status === 200) {
        setUserInfo(result.data);
        enqueueSnackbar(`Hello ${username}`, {
          variant: "success",
          autoHideDuration: 2000,
        });
        navigate("/");
      }
    } catch (err) {
      if (err.response.status === 401) {
        enqueueSnackbar(`Invalid credential`, {
          variant: "error",
          autoHideDuration: 2000,
        });
      } else
        enqueueSnackbar(err.message, {
          variant: "error",
          autoHideDuration: 2000,
        });
    }
  };
  const handleDemo = () => {
    setUsername("demo");
    setPassword("demo");
  };

  return (
    <div className="app__login">
      <div className="app__login-container">
        <h1>Login</h1>
        <form className="app__login-form">
          <label htmlFor="username">username</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="username"
            autoComplete="off"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="password">password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="button" onClick={handleSubmit}>
            Login
          </button>
          <button type="button" onClick={handleDemo}>
            Demo
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
