

import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

type AuthContextType = {
    token: string | null;
    login: (token:string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [token, setToken] = useState<string | null>(null);

    const [isClient, setIsClient] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setIsClient(true);
        const storeToken = localStorage.getItem("token");
        if (storeToken) {
            setToken(storeToken);
        }
    }, [])

    const login = (accessToken: string) => {
        setToken(accessToken);
        localStorage.setItem("token", accessToken);
        navigate("/")
    }

    const logout = () => {
        setToken(null);
        localStorage.removeItem("token");
        navigate("/login");
    }

    const value = useMemo(() => ({ token, login, logout }), [token]);

    if (!isClient) {
        return null;
    }

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};


export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
};