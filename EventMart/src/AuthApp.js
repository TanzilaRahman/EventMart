import React from "react";
import {Routes, Route} from "react-router-dom";
import Login from "./Login";
import SignUp from "./SignUp";

function AuthApp() {
    return (
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
            </Routes>
    );
}

export default AuthApp;
