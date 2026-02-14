import RegisterForm from "@/components/Auth/RegisterForm";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const { authStatus } = useAuth();
    const navigate = useNavigate();

    if (authStatus == "authenticated")
        navigate("/");

    return (
        <RegisterForm />
    );
}

export default Register;