import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  return (
    <div className="login-modal-container">
      <h1 className="login-header">Log In</h1>
      <form className="login-form-itself" onSubmit={handleSubmit}>
        <div className="login-input-container">
          <p className="login-label">Email:</p>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="login-input"
          />
          {errors.email && <p>{errors.email}</p>}
        </div>

        <div className="login-input-container">
          <p className="login-label">Password:</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login-input"
          />
          {errors.password && <p>{errors.password}</p>}
        </div>
        <button className="login-button" type="submit">
          Log In
        </button>
        <button className="login-demo">Demo User</button>
      </form>
    </div>
  );
}

export default LoginFormModal;
