import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";


function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  if (sessionUser) {
    return (
      <div className="nav-wrap">
        <header>
          <div className="nav">
            <div className="air">
                <div className="containerm">
              <li className="left">
                <NavLink exact to="/">
                  <i
                    class="fa-regular fa-bolt fa-beat-fade"
                    style={{ color: "#2967d1" }}
                  >
                    MultiverseBnb
                  </i>{" "}
                </NavLink>
              </li>


              </div>
            </div>
            {isLoaded && (
              <ul>
                <div className="top">
                  <div className="new">
                    <NavLink className="Create" exact to="/spots/new">
                      Airbnb your home
                    </NavLink>
                  </div>
                  <div className="profile">
                    <li>
                      <ProfileButton user={sessionUser} />
                    </li>
                  </div>
                </div>
              </ul>
            )}
          </div>
        </header>
      </div>
    );
  } else {
    return (
      <div className="nav-wrap">
        <ul className="nav">
          <div className="air">
            <li>
              <NavLink exact to="/">
                <i class="fa-solid fa-atom">MultiverseBnb</i>{" "}
              </NavLink>
            </li>
          </div>
          {isLoaded && (
            <li>
              <ProfileButton user={sessionUser} />
            </li>
          )}
        </ul>
      </div>
    );
  }
}

export default Navigation;
