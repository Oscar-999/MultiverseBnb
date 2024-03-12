import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const history = useHistory();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    history.push("/");
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      <div className="profiles-icon">
        <button onClick={openMenu}>
          <i className="fa-solid fa-bars" />
          <i className="fas fa-user-circle" />
        </button>
      </div>

      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <li>Hello, {user.firstName}</li>
            {/* <li>{user.username}</li> */}
            <li>{user.email}</li>
            <div
              style={{
                borderTop: "2px solid #000000",
                marginTop: 10,
                marginBottom: 3,
                marginLeft: 6,
                marginRight: 6,
              }}
            ></div>

            <li>
              <NavLink exact to="/spots/current">
                Manage Spots
              </NavLink>
            </li>
            <div
              style={{
                borderTop: "2px solid #000000",
                marginTop: 10,
                marginBottom: 3,
                marginLeft: 6,
                marginRight: 6,
              }}
            ></div>
            <li>
              <NavLink exact to="/reviews/current">
                Manage Reviews
              </NavLink>
            </li>

            <div
              style={{
                borderTop: "2px solid #000000",
                marginTop: 10,
                marginBottom: 3,
                marginLeft: 6,
                marginRight: 6,
              }}
            ></div>

            <li>
              <NavLink exact to="/bookings/current">
                Manage Bookings
              </NavLink>
            </li>
            <div
              style={{
                borderTop: "2px solid #000000",
                marginTop: 10,
                marginBottom: 3,
                marginLeft: 6,
                marginRight: 6,
              }}
            ></div>

            <li>
              <button className="Logout" onClick={logout}>
                Log Out
              </button>
            </li>
          </>
        ) : (
          <>
            <OpenModalMenuItem
              buttonText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
            <OpenModalMenuItem
              buttonText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
