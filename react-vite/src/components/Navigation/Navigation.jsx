import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  return (
    <div className="nav-container">
      <div className="logo-box" style={{ color: "white" }}>
        LOGO
      </div>
      <div className="home-profile-box">
        <NavLink to="/">Home</NavLink>
        <ProfileButton />
      </div>
    </div>
  );
}

export default Navigation;
