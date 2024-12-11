import React, { useState } from "react";
import Modal from "react-modal";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase"; // Import Firebase auth instance

function LoginModal({ isOpen, onClose }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            // Use Firebase to log the user in
            await signInWithEmailAndPassword(auth, email, password);
            alert("Login successful!");
            onClose(); // Close the modal after a successful login
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
            <h2>Login</h2>
            {error && <p style={{color: "red"}}>{error}</p>}
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{width: "100%", marginBottom: "10px"}}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{width: "100%", marginBottom: "10px"}}
                    required
                />
                <button type="submit" style={{width: "100%", padding: "10px"}}>
                    Login
                </button>
            </form>
            <button onClick={onClose} style={{marginTop: "10px", width: "100%"}}>
                Cancel
            </button>
        </Modal>
    );
}

export default LoginModal;