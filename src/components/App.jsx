import { useConfig } from "../contexts/ConfigContext.jsx";
import Card from "./Card.jsx";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import Footer from "./Footer.jsx";
import Header from "./Header.jsx";
import ContentWrapper from "./ContentWrapper.jsx";
import { useEffect, useRef } from "react";
import { useBubbleSpeed } from "../hooks/useBubbleSpeed";
import { useAccentCycle } from "../hooks/useAccentCycle";


function App() {
    const { config, loading, error } = useConfig();
    const { setSpeed } = useBubbleSpeed();
    const bubblesInitialized = useRef(false);

    useAccentCycle();

    useEffect(() => {
        if (bubblesInitialized.current) return;
        bubblesInitialized.current = true;

        const container = document.getElementById('bubble-container');
        if (!container) return;

        const NUM_BUBBLES = 60;

        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }

        for (let i = 0; i < NUM_BUBBLES; i++) {
            const bubble = document.createElement('div');
            bubble.classList.add('bubble');

            const wobble = document.createElement('div');
            wobble.classList.add('wobble');

            const spinner = document.createElement('div');
            spinner.classList.add('spin');

            wobble.appendChild(spinner);
            bubble.appendChild(wobble);

            const size = Math.random() * 60 + 10;
            bubble.style.width = `${size}px`;
            bubble.style.height = `${size}px`;

            bubble.style.left = `${Math.random() * 100}%`;
            bubble.style.animationDelay = `${Math.random() * 20}s`;
            bubble.style.opacity = `${0.1 + Math.random() * 0.3}`;

            container.appendChild(bubble);
        }
    }, []);

    if (loading) {
        return (
            <div className={"text-center py-5"}>
                <FontAwesomeIcon icon={faSpinner} size={"6x"} spin={true} />
            </div>
        );
    }

    if (error) {
        return (
            <div className={"text-center py-5"}>
                <h1>Error</h1>
                <p>{error.message}</p>
            </div>
        );
    }

    return (
        <>
            <div className="bubble-container" id="bubble-container" />
            <Header />
            <ContentWrapper>
                <div className={"row g-4"}>
                    {config.map((card, index) => (
                        <Card
                            key={index}
                            {...card}
                            onHoverStart={() => setSpeed(6)}
                            onHoverEnd={() => setSpeed(20)}
                        />
                    ))}
                </div>
            </ContentWrapper>
            <Footer />
        </>
    );
}

export default App;
