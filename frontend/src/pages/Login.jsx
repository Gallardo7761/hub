import LoginForm from "@/components/Auth/LoginForm";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const { authStatus } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (authStatus === "authenticated") {
            navigate("/");
        }
    }, [authStatus, navigate]);

    return (
        <LoginForm />
    );
}

export default Login;