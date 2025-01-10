import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Signup } from "../network/UserApi.js";

const SignupModal = ({ setSignupSuccessful, loggedInUser }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (loggedInUser) {
            navigate("/");
        }
    }, [loggedInUser, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Clear previous errors

        try {
            const user = await Signup({ username, email, password });

            setSignupSuccessful(user);

            navigate("/"); // Redirect to home page after successful signup
        } catch (err) {
            setError(err.message); // Handle error message
        }
    };

    return (
        <form className="signup-modal" onSubmit={handleSubmit}>
            <h2>Sign up</h2>
            <input
                type="text"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
            />
            <input
                type="email"
                placeholder="Email address"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            <p>
                Already have an account? <Link to="/login">Login.</Link>
            </p>
            {error && <p>{error}</p>}
            <Button type="submit">Sign up</Button>
        </form>
    );
};

export default SignupModal;
