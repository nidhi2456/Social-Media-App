// Navbar.js

import React from 'react';
import { Link } from 'react-router-dom';
import '../css/navbar.css'; // Importing the CSS file for styling

const Navbar = () => {
    return (
        <nav className="navbar">
            <h1 className="navbar-title">Social Media</h1>
            <ul className="navbar-links">
                <li><Link to="/" className="navbar-link">Feed</Link></li>
                <li><Link to="/profile" className="navbar-link">Profile</Link></li>
                <li><Link to="/users" className="navbar-link">Chat</Link></li>
                <li><Link to="/auth" className="navbar-link">Login/Register</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
