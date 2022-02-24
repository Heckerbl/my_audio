// from react and react dom
import React, { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";

// additional packages
import Cookies from "js-cookie";
import { useGoogleLogin, useGoogleLogout } from "react-google-login";
import axios from "axios";
import { toast } from "react-toastify";

// styles
import "../Styles/Nav.css";

// contex
import { ContexStore } from "../context";

// icons
import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import LogoutIcon from "@mui/icons-material/Logout";
import Tooltip from "@mui/material/Tooltip";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

const Nav = () => {
  let history = useHistory();
  const clientId =
    "167239900596-l26qmlnm2jpm5mmiff7t6gvusq68ip5r.apps.googleusercontent.com";
  const onSuccess = (res) => {
    const { name, email, imageUrl, googleId } = res.profileObj;
    axios
      .post("http://nayayodio.suryaghatlibrary.com/api/auth", {
        name,
        email,
        imageUrl,
        googleId,
      })
      .then((res) => {
        if (res.status === 200) {
          toast.success("User Registered Successfully !");
          Cookies.set("userCookie", googleId, { expires: 2 });
          history.push("/");
          window.location.reload();
        }
        if (res.status === 202) {
          toast.success("User Login Successfully !");
          Cookies.set("userCookie", googleId, { expires: 2 });
          history.push("/");
          window.location.reload();
        }
      });
  };
  const cookie = Cookies.get("userCookie");
  const onFailure = () => {
    toast.error("Popup closed by user !");
  };
  const { signIn } = useGoogleLogin({
    onSuccess,
    clientId,
    onFailure,
  });
  //signout process

  const onLogoutSuccess = () => {
    Cookies.remove("userCookie");
    history.push("/");
    window.location.reload();
  };
  const { signOut } = useGoogleLogout({
    clientId,
    onLogoutSuccess,
  });

  //userdata from context ..
  const details = useContext(ContexStore);
  const checkLogin = () => {
    if (!cookie) {
      toast.warn("Please Login to Access Playlist");
    }
  };
  return (
    <>
      <nav>
        <div className="logo">
          <NavLink exact to="/">
            {" "}
            YODIO {" "}
          </NavLink>
        </div>
        <div className="links">
          <li>
            <NavLink
              onClick={checkLogin}
              exact
              activeClassName="nav_active"
              to={"/playlist"}
            >
              <Tooltip
                title={<p className="tooltipText">Your PlayList</p>}
                arrow
              >
                <QueueMusicIcon className="nav_icons active" />
              </Tooltip>
            </NavLink>
          </li>
          {cookie ? (
            <li>
              <NavLink to="/" onClick={signOut}>
                <Tooltip title={<p className="tooltipText">Sign out</p>} arrow>
                  <LogoutIcon className="nav_icons_log" />
                </Tooltip>
              </NavLink>
            </li>
          ) : (
            <li>
              <NavLink className="btn" to="#" onClick={signIn}>
                <Tooltip title={<p className="tooltipText">Sign in</p>} arrow>
                  <AccountCircleOutlinedIcon className="nav_icons" />
                </Tooltip>
              </NavLink>
            </li>
          )}

          {cookie ? (
            <li>
              <Tooltip
                title={
                  <p className="tooltipText">{details.userData.user_name}</p>
                }
                arrow
              >
                <NavLink className="  login" to="/">
                  <img src={details.userData.user_photo} />
                </NavLink>
              </Tooltip>
            </li>
          ) : (
            ""
          )}
        </div>
      </nav>
    </>
  );
};

export default Nav;
