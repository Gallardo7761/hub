import { Button } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import IfNotAuthenticated from "./Auth/IfNotAuthenticated";
import IfAuthenticated from "./Auth/IfAuthenticated";
import Avatar from "boring-avatars";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignIn, faSignOut, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/hooks/useAuth";
import AnimatedDropdown from "./AnimatedDropdown";

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { identity, logout } = useAuth();

    return (
        <header className="position-relative my-3">
            <div className="d-flex justify-content-center">
                <Link to={"/"}>
                    <img src="/images/logo-with-text.svg" width={192} height={192} />
                </Link>
            </div>

            <div className="position-absolute top-0 end-0 me-3 d-flex align-items-center gap-2">

                <IfAuthenticated>
                    <AnimatedDropdown
                        trigger={
                            <div className="d-flex align-items-center gap-2 p-1 cursor-pointer">
                                <Avatar name={identity?.user.displayName} size={32} />

                                <span
                                    className="fw-bold text-truncate d-none d-md-inline"
                                    style={{ maxWidth: "120px" }}
                                >
                                    @{identity?.account.username}
                                </span>
                            </div>
                        }
                        className="end-0"
                    >
                        {({ closeDropdown }) => (
                            <>
                                <Link to="/accounts" className="dropdown-item">
                                    Mi cuenta
                                </Link>

                                <div
                                    className="dropdown-item text-danger cursor-pointer"
                                    onClick={() => {
                                        closeDropdown();
                                        logout();
                                        navigate("/");
                                    }}
                                >
                                    <FontAwesomeIcon icon={faSignOut} className="me-2" />
                                    Cerrar sesión
                                </div>
                            </>
                        )}
                    </AnimatedDropdown>
                </IfAuthenticated>

                <IfNotAuthenticated>
                    {!location.pathname.includes("login") && (
                        <Link to="/login" className="text-decoration-none">
                            <Button variant="primary" size="sm" className="rounded-0 px-3 py-1 d-flex align-items-center login-register-btn">
                                <FontAwesomeIcon icon={faSignIn} className="me-2" />
                                <span className="d-none d-md-inline">Iniciar sesión</span>
                            </Button>
                        </Link>
                    )}

                    {!location.pathname.includes("register") && (
                        <Link to="/register"  className="text-decoration-none">
                            <Button variant="primary" size="sm" className="rounded-0 px-3 py-1 d-flex align-items-center login-register-btn">
                                <FontAwesomeIcon icon={faUserPlus} className="me-2" />
                                <span className="d-none d-md-inline">Registrarse</span>
                            </Button>
                        </Link>
                    )}
                </IfNotAuthenticated>

            </div>
        </header>
    );
}

export default Header;