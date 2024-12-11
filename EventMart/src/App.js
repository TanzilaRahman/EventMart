import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";  // Firebase Auth listener
import { auth } from "./firebase";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import NavBar from './NavBar';
import CreateEvent from './CreateEvent';
import FindEvent from "./FindEvent";
import './App.css';
import AuthApp from "./AuthApp";
import LoginModal from "./LoginModel";
import SignupModal from "./SignupModal";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';

const App = () => {
    const [user, setUser] = useState(null); // State to hold the current user
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);
    const [isSignupModalOpen, setSignupModalOpen] = useState(false);
    const stripePromise = loadStripe('pk_test_your_public_key_here');

    // Listen for user authentication changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser); // Set the user state whenever authentication state changes
        });

        // Cleanup the listener when the component unmounts
        return () => unsubscribe();
    }, []);

    return (
        <div>
        <Router>
            <NavBar user={user} setLoginModalOpen={setLoginModalOpen} setSignupModalOpen={setSignupModalOpen} />

            <Routes>
                <Route path="/find-event" element={<FindEvent/>}/>
                <Route path="/create-event" element={<CreateEvent/>}/>

                {/* AuthApp will handle /login and /signup */}
                <Route path="/login" element={<AuthApp />} />
                <Route path="/signup" element={<AuthApp />} />

                {/* Conditional rendering based on user authentication */}
                <Route
                    path={"/app"}
                    element={user ? < App/> : <div>Please log in to view the page.</div>}
                />
            </Routes>
            {/* Login Modal */}
            <LoginModal
                isOpen={isLoginModalOpen}
                onClose={() => setLoginModalOpen(false)}
            />

            {/* Signup Modal */}
            <SignupModal
                isOpen={isSignupModalOpen}
                onClose={() => setSignupModalOpen(false)}
            />
        </Router>
        <Elements stripe={stripePromise}>
          <div className="App">
            <h1>Secure Payment</h1>
            <CheckoutForm />
          </div>
        </Elements>
        </div>
    );
}

export default App;
