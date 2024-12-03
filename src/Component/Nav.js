import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Nav = () => {
    const navigate = useNavigate();
    const authData = localStorage.getItem("user");
    let user = null;

    // Safely parse user data
    try {
        user = authData ? JSON.parse(authData) : null;
    } catch (error) {
        console.error("Error parsing user data from local storage:", error);
        user = null; // Set user to null in case of parsing error
    }

    const logout = () => {
        localStorage.clear();
        navigate('/signup');
    };

    return (
        <div>
            <img alt="logo" className="logo" src="https://png.pngtree.com/png-clipart/20190611/original/pngtree-wolf-logo-png-image_2306634.jpg" />
            {
                user ? (
                    <ul className="nav-ul">
                        <li><Link to="/">Product</Link></li>
                        <li><Link to="/add">Add Product</Link></li>
                        <li><Link to="/update">Update Product</Link></li>
                        <li><Link to="/profile">Profile</Link></li>
                        <li>
                            <Link onClick={logout} to="/signup">
                                Logout {user.name ? `(${user.name})` : ""}
                            </Link>
                        </li>
                    </ul>
                ) : (
                    <ul className="nav-ul log-ul">
                        <li><Link to="/signup">SignUp</Link></li>
                        <li><Link to="/login">Login</Link></li>
                    </ul>
                )
            }
        </div>
    );
}

export default Nav;
