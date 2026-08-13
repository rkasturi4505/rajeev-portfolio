import { Navigate, useNavigate } from "react-router-dom";

import Login from "../components/Login";

function AdminLoginPage() {
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem("token");

  if (isLoggedIn) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <div className="admin-login-page">
      <Login
        onLoginSuccess={() => {
          navigate("/admin");
        }}
      />
    </div>
  );
}

export default AdminLoginPage;
