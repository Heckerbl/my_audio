import React from "react";
import { NavLink } from "react-router-dom";
import "../Styles/Nav.css";

const Nav = () => {
    return (
        <>
            <nav>
                <div class="logo">Youtube Audio</div>
                <ul>
                    <li>
                        <NavLink className="navlinks" to="/">
                            <i class="fas fa-home active_icon"></i>
                            <span class="active">Home</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="navlinks" to="/">
                            {" "}
                            <i class="fas fa-lightbulb"></i>
                            <span>Playlist</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="navlinks" to="/">
                            <i class="fas fa-camera-retro"></i> <span>Account</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="navlinks" to="/">
                            {" "}
                            <i class="fas fa-phone"></i> <span>Contact</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </>
    );
};

export default Nav;
