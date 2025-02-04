import { Navigate, Outlet } from "react-router";

const RequireAuth = () => {
    const user = localStorage.getItem("authenticated");

    
    if (!user) {
        return <Navigate to="/signin" replace />;
    }

    return <Outlet />;
};

export default RequireAuth;
