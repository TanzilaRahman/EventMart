import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import './NavBar.css'; // Optional styles
import { signOut } from "firebase/auth";
import { auth, googleProvider } from "./firebase";
import LoginModal from "./LoginModel";
import SignupModal from "./SignupModal";
import { signInWithPopup } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";

function Navbar () {
    const [user, setUser] = useState(null); // State to hold the current user
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isSignupOpen, setIsSignupOpen] = useState(false);

    // Listen for user authentication changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser); // Set the user state whenever authentication state changes
        });
        return () => unsubscribe();
    }, []);


    const handleLogout = async (event) => {
        event.preventDefault();  // Prevent default anchor link behavior
        try {
            await signOut(auth); // Firebase sign out
            alert("Logged out successfully!");
        } catch (err) {
            console.error("Error signing out: ", err.message);
            alert("Error logging out!");
        }
    };

    return (
        <nav className="navbar">
            <h1>Local Events</h1>
            <ul className="nav-links">

                {/* Login Modal */}
                <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)}/>
                {/* Signup Modal */}
                <SignupModal isOpen={isSignupOpen} onClose={() => setIsSignupOpen(false)}/>
                {/* Show login/signup if no user is logged in */}
                {!user && (
                    <>
                        <li>
                            <a href="#" onClick={() => setIsSignupOpen(true)}>Signup</a>
                        </li>
                        <li>
                            <a href="#" onClick={() => setIsLoginOpen(true)}>Login</a>
                        </li>
                    </>
                )}
                {/* Show logout if user is logged in */}
                {user && (
                    <>
                        <li>
                            <Link to="/find-event">Find Event</Link>
                        </li>
                        <li>
                            <Link to="/create-event">Create Event</Link>
                        </li>
                        <li>
                            <Link to="/marketplace">Marketplace</Link>
                        </li>
                        <li>
                            <a href="#" onClick={(e) => handleLogout(e)}>Logout</a>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;
