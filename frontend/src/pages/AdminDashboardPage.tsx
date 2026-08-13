import { Navigate } from "react-router-dom";

import AdminDashboard from "../components/AdminDashboard";

function AdminDashboardPage() {
    const isLoggedIn = !!localStorage.getItem("token");

    if (!isLoggedIn) {
        return <Navigate to="/admin/login" replace />;
    }

    return <AdminDashboard />;
}

export default AdminDashboardPage;