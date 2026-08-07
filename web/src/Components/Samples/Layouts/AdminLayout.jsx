import { Outlet, Navigate } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";

export default function AdminLayout() {
    const { token, user } = useStateContext();

    if (!token || user.role !== "admin") {
        return <Navigate to="/unauthorized" />;
    }

    return (
        <div className="admin-layout">
            <h1>Admin Panel</h1>
            <Outlet />
        </div>
    );
}
