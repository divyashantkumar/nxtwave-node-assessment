import { Navigate, Outlet } from "react-router";

const RequireAuth = () => {
    const user = localStorage.getItem("user");

    
    if (!user) {
        return <Navigate to="/signin" replace />;
    }

    return <Outlet />;
};

export default RequireAuth;
