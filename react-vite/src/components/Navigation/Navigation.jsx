import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import ProfileButton from "./ProfileButton";
import { NavLink } from "react-router-dom";
import "./Navigation.css";

function Navigation() {
  const navigate = useNavigate();
  const user = useSelector((store) => store.session.user);
  return (
    <div className="nav-container">
      <div
        className="logo-box"
        style={{ color: "white", cursor: "pointer" }}
        onClick={() => navigate("/")}
      >
        <img src="/logo.png" alt="logo" className="logo-img" />
      </div>
      <div className="nav-links-box">
        <NavLink
          style={{
            background: "linear-gradient(90deg, #f41624, white)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
          className={"nav-link"}
          to="/communities/1"
        >
          PKMN
        </NavLink>
        <NavLink
          style={{
            background: "linear-gradient(90deg, #f41624, white)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
          className={"nav-link"}
          to="/communities/2"
        >
          VGC
        </NavLink>
        <NavLink
          style={{
            background: "linear-gradient(90deg, #f41624, white)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
          className={"nav-link"}
          to="/communities/3"
        >
          TCG
        </NavLink>
        <NavLink
          style={{
            background: "linear-gradient(90deg, #f41624, white)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
          className={"nav-link"}
          to="/communities/4"
        >
          GO
        </NavLink>
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
