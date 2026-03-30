import RegisterForm from "@/components/Auth/RegisterForm";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const { authStatus } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (authStatus === "authenticated") {
            navigate("/");
        }
    }, [authStatus, navigate]);

    return (
        <RegisterForm />
    );
}

export default Register;