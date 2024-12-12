import React, { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import Modal from "react-modal";
import { auth, googleProvider } from "./firebase"; // Firebase auth instance
import { FaGoogle } from "react-icons/fa"; // Import Google icon from react-icons (optional)
import './LoginModal.css'; // Import CSS file
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function LoginModal({ isOpen, onClose, setUser }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);



    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await signInWithEmailAndPassword(auth, email, password);
            // alert("Login successful!");
            onClose(); // Close the modal after a successful login
        } catch (err) {
            setError("Failed to login with email/password.");
            console.error(err.message);
        }
    };

    return (
            <Modal
                isOpen={isOpen}
                onRequestClose={onClose}
                className="modal"
                overlayClassName="modal-overlay"
            >
                <h2>Login</h2>
                <br/>
                {error && <p className="error">{error}</p>}
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input-field"
                        required
                    />
                    <span>
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input-field"
                            required
                        />
                        <div  className="show-password-btn-login" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <FaEyeSlash/> : <FaEye/>}
                        </div >
                    </span>
                    <button type="submit" className="login-button">
                        Login
                    </button>
                </form>

                <button onClick={onClose} className="cancel-button">
                    Cancel
                </button>
            </Modal>
    );
}

export default LoginModal;
