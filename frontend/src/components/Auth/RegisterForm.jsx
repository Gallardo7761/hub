import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAt, faIdCard, faUser } from '@fortawesome/free-solid-svg-icons';
import { Form, Button, Alert, FloatingLabel } from 'react-bootstrap';
import PasswordInput from './PasswordInput.jsx';

import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext.jsx";

import CustomContainer from '@/components/CustomContainer.jsx';
import ContentWrapper from '@/components/ContentWrapper.jsx';

import '@/css/LoginForm.css';

const RegisterForm = () => {
    const { register, error, clearError } = useContext(AuthContext);
    const navigate = useNavigate();

    const [formState, setFormState] = useState({
        displayName: "",
        username: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormState((prev) => ({
            ...prev,
            [name]: name === "displayName" ? value.toUpperCase() : value
        }));

        if (error) clearError();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const registerBody = {
            displayName: formState.displayName ? formState.displayName.toUpperCase() : "",
            username: formState.username,
            email: formState.email,
            password: formState.password,
            serviceId: 0
        };

        try {
            await register(registerBody);
            navigate("/");
        } catch (err) {
            console.error("Error de registro:", err.message);
        }
    };

    return (
        <CustomContainer>
            <ContentWrapper>
                <div className="login-card card p-5 mx-auto col-12 col-md-8 col-lg-6 col-xl-5 d-flex flex-column gap-4">
                    <h1 className="text-center">Centro de cuentas</h1>
                    <Form className="d-flex flex-column gap-5" onSubmit={handleSubmit}>
                        <div className="d-flex flex-column gap-3">
                            <FloatingLabel
                                controlId="floatingDisplayName"
                                label={
                                    <>
                                        <FontAwesomeIcon icon={faIdCard} className="me-2" />
                                        Nombre (será el usuario si se deja vacío)
                                    </>
                                }
                            >
                                <Form.Control
                                    type="text"
                                    placeholder=""
                                    name="displayName"
                                    value={formState.displayName}
                                    onChange={handleChange}
                                    required
                                    className="themed-input rounded-0"
                                />
                            </FloatingLabel>

                            <FloatingLabel
                                controlId="floatingUsuario"
                                label={
                                    <>
                                        <FontAwesomeIcon icon={faUser} className="me-2" />
                                        Usuario
                                    </>
                                }
                            >
                                <Form.Control
                                    type="text"
                                    placeholder=""
                                    name="username"
                                    value={formState.username}
                                    onChange={handleChange}
                                    className="themed-input rounded-0"
                                />
                            </FloatingLabel>

                            <FloatingLabel
                                controlId="floatingEmail"
                                label={
                                    <>
                                        <FontAwesomeIcon icon={faAt} className="me-2" />
                                        Email
                                    </>
                                }
                            >
                                <Form.Control
                                    type="email"
                                    placeholder=""
                                    name="email"
                                    value={formState.email}
                                    onChange={handleChange}
                                    className="themed-input rounded-0"
                                />
                            </FloatingLabel>

                            <PasswordInput
                                value={formState.password}
                                onChange={handleChange}
                                name="password"
                            />

                            {/*<div className="d-flex flex-column flex-sm-row justify-content-between align-items-center gap-2">
                                <Form.Check
                                    type="checkbox"
                                    name="keepLoggedIn"
                                    label="Mantener sesión iniciada"
                                    className="text-secondary"
                                    value={formState.keepLoggedIn}
                                    onChange={(e) => { formState.keepLoggedIn = e.target.checked; setFormState({ ...formState }) }}
                                />
                                <Link disabled to="#" className="muted">
                                    Olvidé mi contraseña
                                </Link>
                            </div>*/}
                        </div>

                        {error && (
                            <Alert variant="danger" className="text-center py-2 mb-0">
                                {error}
                            </Alert>
                        )}

                        <div className="text-center">
                            <Button type="submit" className="w-75 padding-4 rounded-0 border-0 shadow-sm login-button">
                                Registrarse
                            </Button>
                        </div>
                        <span className="text-center">*Desde aquí podrás manejar todas tus cuentas</span>
                    </Form>
                </div>
            </ContentWrapper>
        </CustomContainer>
    );
};


export default RegisterForm;
