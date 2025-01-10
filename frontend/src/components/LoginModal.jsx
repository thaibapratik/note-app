import React, {useEffect, useState} from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Login } from "../network/UserApi.js";

const LoginModal = ({ setLoginSuccessful, loggedInUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");



    const navigate = useNavigate();

    useEffect(() => {
        if (loggedInUser) {
            navigate("/");
        }
    }, [loggedInUser, navigate]);


  const handleSubmit = async (e) => {
      e.preventDefault();
      setError("");

    try {
        const user = await Login({ email, password });
        if (user) {
            setLoginSuccessful(user);
            navigate("/");
        } else {
            throw new Error("Invalid email or password.");
        }
    } catch (err) {
        setError(err.message || "An unexpected error occurred.");
    }
  };

  return (
    <form className="login-modal" onSubmit={e => handleSubmit(e)}>
      <h2>Log in</h2>

      <input
        type="text"
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
        Don't have an account? <Link to="/signup">Signup.</Link>
      </p>
        {error && <p className="error">{error}</p>}
      <Button onClick={e => handleSubmit(e)}>Log in</Button>
    </form>
  );
};

export default LoginModal;
