import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("https://websitecart-backend.onrender.com/auth/login", {
        email,
        password
      });

      localStorage.setItem("token", res.data.token);
      navigate("/admin");

    } catch (err) {
      alert("Invalid login");
    }
  };

  return (
    <div className="container py-5 col-md-4">
      <h2 className="mb-4">Admin Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Admin Email"
          className="form-control mb-3"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="form-control mb-4"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        <button className="btn btn-dark w-100">
          Login
        </button>
      </form>
    </div>
  );
}
// login http://localhost:5173/login
// later on https://websitecart-backend.onrender.com/