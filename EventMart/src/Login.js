import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase"; // Import Firebase auth instance and Google provider
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    // Handle email/password login
    const handleEmailLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            alert("Logged in successfully!");
            navigate("/main"); // Redirect to main page
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <form onSubmit={handleEmailLogin}>
            <h2>Login</h2>
            <input type="email" placeholder="Email" value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password" placeholder="Password" value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
