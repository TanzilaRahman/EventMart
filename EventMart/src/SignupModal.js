import React, { useState } from "react";
import Modal from "react-modal";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase"; // Import the Firebase auth instance


function SignupModal({ isOpen, onClose }) {
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
            alert("Signup successful!");
            onClose(); // Close the modal on success
        } catch (err) {
            setError(err.message); // Show error messages from Firebase
        }
    };
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            style={{
                content: {
                    top: "50%",
                    left: "50%",
                    right: "auto",
                    bottom: "auto",
                    marginRight: "-50%",
                    transform: "translate(-50%, -50%)",
                    padding: "20px",
                    width: "300px",
                },
            }}
        >
            <h2>Sign Up</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSignup}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ width: "100%", marginBottom: "10px" }}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ width: "100%", marginBottom: "10px" }}
                    required
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    style={{ width: "100%", marginBottom: "10px" }}
                    required
                />
                <button type="submit" style={{ width: "100%", padding: "10px" }}>
                    Sign Up
                </button>
            </form>
            <button onClick={onClose} style={{ marginTop: "10px", width: "100%" }}>
                Cancel
            </button>
        </Modal>
    );
}

export default SignupModal;