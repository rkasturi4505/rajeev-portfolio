import { useState } from "react";
import {
  FaCheckCircle,
  FaEye,
  FaEyeSlash,
  FaUser,
  FaLock,
} from "react-icons/fa";
import { login } from "../api/authApi";
import "./Login.css";

interface LoginProps {
  onLoginSuccess: () => void;
}

function Login({ onLoginSuccess }: LoginProps) {
  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");

    if (!username.trim()) {
      setError("Please enter your username.");
      return;
    }

    if (!password.trim()) {
      setError("Please enter your password.");
      return;
    }

    setLoading(true);

    try {
      const response = await login({
        username,
        password,
      });

      localStorage.setItem("token", response.token);

      onLoginSuccess();
    } catch {
      setError("Invalid username or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* =======================================================
          LEFT PANEL
      ======================================================== */}

      <div className="login-left">
        <div>
          <h1>Rajeev Kumar Kasturi</h1>

          <p className="tagline">Portfolio Administration System</p>

          <p className="description">
            A secure platform for managing portfolio content, projects, visitor
            analytics, resume downloads, contact enquiries, and administrative
            operations through a centralized administration dashboard.
          </p>

          <div className="login-features">
            <div className="feature-item">
              <FaCheckCircle />
              <span>Secure JWT Authentication</span>
            </div>

            <div className="feature-item">
              <FaCheckCircle />
              <span>Project & Portfolio Management</span>
            </div>

            <div className="feature-item">
              <FaCheckCircle />
              <span>Visitor Analytics & Insights</span>
            </div>

            <div className="feature-item">
              <FaCheckCircle />
              <span>Resume Download Monitoring</span>
            </div>

            <div className="feature-item">
              <FaCheckCircle />
              <span>Contact & Message Management</span>
            </div>

            <div className="feature-item">
              <FaCheckCircle />
              <span>Responsive Administration Dashboard</span>
            </div>
          </div>

          <div className="login-left-footer">
            © 2026 Rajeev Kumar Kasturi. All rights reserved.
          </div>
        </div>
      </div>

      {/* =======================================================
          RIGHT PANEL
      ======================================================== */}

      <div className="login-right">
        <div className="login-container">
          <div className="login-logo">RK</div>

          <h2>Admin Login</h2>

          <p className="login-subtitle">
            Sign in to access your administration dashboard.
          </p>

          <form className="login-form" onSubmit={handleLogin}>
            {/* Username */}

            <div className="input-group">
              <FaUser className="input-icon" />

              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                required
              />
            </div>

            {/* Password */}

            <div className="input-group">
              <FaLock className="input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>{" "}
            </div>

            {error && <div className="error-text">{error}</div>}

            <button className="login-btn" type="submit" disabled={loading}>
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <div className="footer-text">
            Portfolio Admin v1.0
            <br />
            Spring Boot 3.5 • React • TypeScript • JWT Security
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
