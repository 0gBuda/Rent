// Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand" to="/">My Website</Link>
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/login">Login</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/">HomePage</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/account">AccountPage</Link>
                    </li>
                </ul>
            </div>
        </header>
    );
}

export default Header;
