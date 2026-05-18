// frontend/src/pages/Login.jsx

import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
       "https://smart-calculator-backend-y4j4.onrender.com/api/auth/login",
        {
          username,
          password,
        }
      );

      if (response.data && response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("username", username);

        alert("Login Successful");
        navigate("/dashboard");
      } else {
        alert(response.data.message || "Invalid Username or Password");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        if (typeof error.response.data === "string") {
          alert(error.response.data);
        } else {
          alert(
            error.response.data.message ||
              "Invalid Username or Password"
          );
        }
      } else {
        alert("Server error. Please try again.");
      }
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffffff",
      }}
    >
      <div
        style={{
          width: "350px",
          padding: "40px",
          borderRadius: "10px",
          backgroundColor: "#ffffff",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          border: "1px solid #e5e7eb",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            margin: "0 0 20px 0",
            color: "#111827",
            fontSize: "32px",
            fontWeight: "bold",
          }}
        >
          Login
        </h1>

        <form
          onSubmit={handleLogin}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "5px",
              border: "1px solid #d1d5db",
              fontSize: "16px",
              boxSizing: "border-box",
            }}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "5px",
              border: "1px solid #d1d5db",
              fontSize: "16px",
              boxSizing: "border-box",
            }}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              border: "none",
              borderRadius: "5px",
              backgroundColor: "#2563eb",
              color: "#ffffff",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Login
          </button>
        </form>

        <p
          style={{
            textAlign: "center",
            marginTop: "15px",
            marginBottom: 0,
            color: "#374151",
          }}
        >
          Don't have an account?
          <Link
            to="/register"
            style={{
              color: "#2563eb",
              marginLeft: "5px",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;