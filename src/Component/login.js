import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Redirect to homepage if user is already authenticated
        if (localStorage.getItem('user')) {
            navigate('/');
        }
    }, [navigate]);

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch("http://localhost:5000/login", { 
                method: 'POST', 
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const result = await response.json();

            // Check for user details and navigate on success
            if (result.auth) {
                localStorage.setItem('user', JSON.stringify(result.user));
                localStorage.setItem('token', JSON.stringify(result.auth));
                navigate('/');
            } else {
                alert("User not found");
            }
        } catch (error) {
            alert("Login failed: " + error.message);
        }
    };

    return (
        <div className="loginBox">
            <h1 className="logHead">Login</h1>
            <form onSubmit={handleLogin}>
                <input 
                    type="text" 
                    placeholder="Enter your email" 
                    className="inputbox"  
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input 
                    type="password" 
                    placeholder="Enter your password" 
                    className="inputbox" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                />
                <button type="submit" onClick={handleLogin} className="submitbutton">Login</button>
            </form>
        </div>
    );
}

export default Login;
