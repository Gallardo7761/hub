import { useConfig } from "../contexts/ConfigContext.jsx";
import Card from "./Card.jsx";
import ThemeButton from "./ThemeButton.jsx";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import Footer from "./Footer.jsx";
import Header from "./Header.jsx";
import ContentWrapper from "./ContentWrapper.jsx";

function App() {
    const {config, loading, error} = useConfig();

    if (loading) {
        return (
            <div className={"text-center py-5"}>
                <FontAwesomeIcon icon={faSpinner} size={"6x"} spin={true} />
            </div>
        )
    }

    if (error) {
        return (
            <div className={"text-center py-5"}>
                <h1>Error</h1>
                <p>{error.message}</p>
            </div>
        )
    }

    return (
        <>
        <ContentWrapper>
            <Header />
            <div className={"row g-4"}>
                {config.map((card, index) => (
                    <Card key={index} {...card} />
                ))}
            </div>
        </ContentWrapper>
        <Footer />
        <ThemeButton />
        </>
    )
}

export default App
