import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'; // Optional styles

const Navbar = () => {
    return (
        <nav className="navbar">
            <h1>Local Events</h1>
            <ul className="nav-links">
                <li>
                    <Link to="/find-event">Find Event</Link>
                </li>
                <li>
                    <Link to="/create-event">Create Event</Link>
                </li>
                <li>
                    <Link to="/marketplace">Marketplace</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
