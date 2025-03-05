import { useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  const user = useSelector((store) => store.session.user);
  return (
    <div className="nav-container">
      <div className="logo-box" style={{ color: "white" }}>
        LOGO
      </div>
      <div className="home-profile-box">
        {user ? (
          <ProfileButton />
        ) : (
          <div className="not-logged-buttons-box">
            <OpenModalButton
              buttonText="Log In"
              className="non-logged-button"
              modalComponent={<LoginFormModal />}
            />
            <OpenModalButton
              buttonText="Sign Up"
              className="non-logged-button"
              modalComponent={<SignupFormModal />}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Navigation;
