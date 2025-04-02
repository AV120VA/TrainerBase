import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { thunkLogout } from "../../redux/session";

function ProfileButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store.session.user);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    closeMenu();
    navigate("/");
  };

  return (
    <>
      <button
        onClick={toggleMenu}
        style={{
          border: "none",
          height: "50px",
          width: "50px",
          borderRadius: "50%",
          backgroundColor: "#f41624",
          color: "white",
          fontSize: "20px",
          cursor: "pointer",
        }}
      >
        {user.username[0].toUpperCase()}
      </button>
      {showMenu && (
        <ul
          className={"profile-dropdown"}
          style={{
            backgroundColor: "#262626",
            borderRadius: "15px",
            display: "flex",
            flexDirection: "column",
            padding: "18px",
            alignItems: "center",
            gap: "12px",
            position: "absolute",
            top: "110px",
            right: "25px",
          }}
          ref={ulRef}
        >
          <li style={{ listStyleType: "none", color: "white" }}>
            {user.username}
          </li>
          <li style={{ listStyleType: "none", color: "white" }}>
            {user.email}
          </li>
          <li
            style={{
              listStyleType: "none",
              color: "#f41624",
              cursor: "pointer",
            }}
            onClick={() => {
              navigate("/saved-posts");
              closeMenu();
            }}
          >
            Saved Posts
          </li>
          <li
            style={{
              listStyleType: "none",
              color: "#f41624",
              cursor: "pointer",
            }}
            onClick={() => {
              navigate("/my-posts");
              closeMenu();
            }}
          >
            Manage Posts
          </li>
          <li
            style={{
              listStyleType: "none",
              color: "#f41624",
              cursor: "pointer",
            }}
            onClick={() => {
              navigate("/my-comments");
              closeMenu();
            }}
          >
            Manage Comments
          </li>
          <li style={{ listStyleType: "none" }}>
            <button
              style={{
                border: "none",
                backgroundColor: "#f41624",
                color: "white",
                height: "30px",
                width: "100px",
                fontSize: "16px",
                cursor: "pointer",
                borderRadius: "15px",
              }}
              onClick={logout}
            >
              Log Out
            </button>
          </li>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
