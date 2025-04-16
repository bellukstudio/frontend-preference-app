
import { JSX } from "react";
import { useAuth } from "../ctx/authContext";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
    children: JSX.Element;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const { token } = useAuth();

    if (!token) {
        return <Navigate to="/login" replace />;
    }



    return <>{children}</>;
};

export default PrivateRoute;