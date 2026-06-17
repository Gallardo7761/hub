import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className="position-relative my-3">
            <div className="d-flex justify-content-center">
                <Link to={"/"}>
                    <img src="https://cdn.miarma.net/img/logo-with-text.svg" width={192} height={192} />
                </Link>
            </div>
        </header>
    );
}

export default Header;