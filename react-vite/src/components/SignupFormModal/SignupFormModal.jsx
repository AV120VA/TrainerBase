import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
    }

    const serverResponse = await dispatch(
      thunkSignup({
        email,
        username,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  const isFormInvalid =
    !isValidEmail(email) ||
    !email ||
    !username ||
    !password ||
    !confirmPassword;

  return (
    <div className="signup-modal-container">
      <h1 className="signup-header">Sign Up</h1>
      {errors.server && <p>{errors.server}</p>}
      <form className="signup-form-itself" onSubmit={handleSubmit}>
        <div className="signup-input-container">
          <p className="signup-label">Email:</p>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="signup-input"
          />
          {errors.email && <p className="signup-error-text">{errors.email}</p>}
          {!isValidEmail(email) && email && (
            <p className="signup-error-text">Please provide a valid email</p>
          )}
        </div>

        <div className="signup-input-container">
          <p className="signup-label">Username:</p>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="signup-input"
          />

          {errors.username && (
            <p className="signup-error-text">{errors.username}</p>
          )}
        </div>

        <div className="signup-input-container">
          <p className="signup-label">Password:</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="signup-input"
          />
          {errors.password && (
            <p className="signup-error-text">{errors.password}</p>
          )}
        </div>

        <div className="signup-input-container">
          <p className="signup-label">Confirm Password:</p>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="signup-input"
          />
          {errors.confirmPassword && (
            <p className="signup-error-text">{errors.confirmPassword}</p>
          )}
        </div>

        <button
          disabled={isFormInvalid}
          style={{
            backgroundColor: isFormInvalid ? "gray" : null,
            cursor: isFormInvalid ? "not-allowed" : "pointer",
          }}
          className="signup-button"
          type="submit"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignupFormModal;
