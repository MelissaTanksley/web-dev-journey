import React, { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

const Login = (props) => {
  const [credentials, setCredentials] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios
      .post("https://beedev-blog-api.herokuapp.com/api/auth/login", credentials)
      .then((res) => {
        setTimeout(() => {
          setIsLoading(false);
          setError("");
          localStorage.setItem("token", res.data.payload);
          props.history.push("/dashboard");
        }, 300);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
        setError("Invalid Credentials");
      });
    setCredentials({});
  };

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div style={{ margin: "0 auto", marginTop: "5%" }}>
      <h1>Login</h1>
      <h3 style={{ color: "red" }}>{error}</h3>
      {isLoading ? (
        <h1>Loading</h1>
      ) : (
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            width: "50%",
            margin: "0 auto",
            height: "120px",
            justifyContent: "space-between",
          }}
          onSubmit={handleLogin}
        >
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={credentials.username}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
          />
          <button type="submit">Login</button>
        </form>
      )}
    </div>
  );
};

export default Login;