import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../common/ctx/authContext";

export default function Navbar() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav className="bg-blue-600 text-white px-6 py-4 flex items-center justify-between">
            <div className="text-lg font-bold">MCP App</div>
            <div className="space-x-4">
                <Link to="/" className="hover:underline">
                    Home
                </Link>
                <Link to="/settings" className="hover:underline">
                    Settings
                </Link>
                <button onClick={handleLogout} className="hover:underline">
                    Logout
                </button>
            </div>
        </nav>
    );
}
