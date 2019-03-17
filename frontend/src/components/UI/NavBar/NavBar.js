import React from 'react';
import Logo from "./Logo/Logo";
import Menu from "./Menu/Menu";


const NavBar = props => {
    return <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Logo/>
        <Menu/>
    </nav>
};

export default NavBar;