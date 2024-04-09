import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.scss";
import { api } from "../../services/api";
import { useSnackbar } from "notistack";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await api.post("/register", {
        username: username,
        password: password,
      });
      if (result.status === 200) {
        enqueueSnackbar(`User Register Successfully`, {
          variant: "success",
          autoHideDuration: 2000,
        });
        navigate("/");
      }
    } catch (err) {
      enqueueSnackbar(`Error`, {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
  };
  return (
    <div className="app__register">
      <div className="app__register-container">
        <h1>Register</h1>
        <form className="app__register-form" onSubmit={handleSubmit}>
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
          <button>Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
