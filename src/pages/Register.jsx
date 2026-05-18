// frontend/src/pages/Register.jsx

import { useState } from "react";
import { registerUser } from "../services/authService";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await registerUser({
        username,
        password,
      });

      console.log(response);

      alert("Registration Successful");

      window.location.href = "/";
    } catch (error) {
      alert("Registration Failed");
      console.log(error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#ffffff", // White background
      }}
    >
      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "40px",
          borderRadius: "10px",
          width: "350px",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          color: "#111827",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          border: "1px solid #e5e7eb",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            margin: 0,
            color: "#111827",
          }}
        >
          Register
        </h1>

        <form
          onSubmit={handleRegister}
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
            style={{
              padding: "12px",
              borderRadius: "5px",
              border: "1px solid #d1d5db",
              fontSize: "16px",
            }}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              padding: "12px",
              borderRadius: "5px",
              border: "1px solid #d1d5db",
              fontSize: "16px",
            }}
          />

          <button
            type="submit"
            style={{
              padding: "12px",
              borderRadius: "5px",
              border: "none",
              backgroundColor: "#2563eb",
              color: "white",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Register
          </button>
        </form>

        <p
          style={{
            textAlign: "center",
            margin: 0,
            color: "#374151",
          }}
        >
          Already have an account?
          <a
            href="/"
            style={{
              color: "#2563eb",
              marginLeft: "5px",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default Register;