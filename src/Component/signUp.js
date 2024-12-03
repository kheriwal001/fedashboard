import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        // Redirect to homepage if user is already registered
        if (localStorage.getItem("user")) {
            navigate('/');
        }
    }, [navigate]);

    const collectData = async () => {
        if (!name || !email || !password) {
            setError("All fields are required");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const response = await fetch("http://localhost:5000/register", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            });

            if (!response.ok) {
                throw new Error("Failed to register. Please try again.");
            }

            const result = await response.json();
            localStorage.setItem("user", JSON.stringify(result.result));
            localStorage.setItem("token", JSON.stringify(result.auth));
            navigate("/");
        } catch (error) {
            setError(error.message);
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <div className="SignupBox">
            <h1 className="signheading">Register</h1>
            {error && <p className="error" style={{ color: 'red' }}>{error}</p>}
            <input 
                type="text" 
                placeholder="Enter your name" 
                className="inputbox" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
            />
            <input 
                type="text" 
                placeholder="Email"  
                className="inputbox"
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
            />
            <input 
                type="password" 
                placeholder="Password" 
                className="inputbox"
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
            />
            <button 
                type="button" 
                onClick={collectData} 
                className="submitbutton"
                disabled={loading}
            >
                {loading ? "Signing Up..." : "Sign Up"}
            </button>
        </div>
    );
}

export default SignUp;
