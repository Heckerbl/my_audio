import React from "react";
import { NavLink } from "react-router-dom";
import "../Styles/Nav.css";

const Nav = () => {
    return (
        <>
            <nav>
                <div className="logo">
                    <NavLink className="logoLink" to="/">
                        Youtube Radio
                    </NavLink>
                </div>
                <div className="navLinks">
                    <NavLink className="link" to="/">
                        Home
                    </NavLink>
                </div>
            </nav>
        </>
    );
};

export default Nav;
