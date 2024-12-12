import React, { useState } from "react";
import Modal from "react-modal";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "./firebase"; // Import the Firebase auth instance
import './SignupModal.css'; // Import CSS file

function SignupModal({ isOpen, onClose, setUser }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const handleSignup = async (e) => {
        e.preventDefault();
        setError("");
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        try {
            // Use Firebase to create a new user
            await createUserWithEmailAndPassword(auth, email, password);
            // alert("Signup successful!");
            onClose(); // Close the modal on success
        } catch (err) {
            setError("Failed to login with email/password.");
            console.error(err.message);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            setUser(user); // Update the user state with the logged-in user
            // alert("Login successful!");
            onClose(); // Close modal after successful login
        } catch (err) {
            setError("Google login failed.");
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
            <div className="signup-container"> {/* Add the wrapper within Modal */}
                <h2>Sign Up</h2>
                {error && <p className="error">{error}</p>}
                <form onSubmit={handleSignup}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input-field"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="input-field"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="input-field"
                        required
                    />
                    <button type="submit" className="signup-button"> {/* Change button class */}
                        Sign Up
                    </button>
                </form>
                {/* Google Login Button */}
                <div className="google-login">
                    <button onClick={handleGoogleLogin} className="google-btn">
                        Signup With Google
                    </button>
                </div>
                <button onClick={onClose} className="cancel-button">
                    Cancel
                </button>
            </div>
        </Modal>
    );
}

export default SignupModal;
