import PropTypes from 'prop-types';
import { useState } from 'react';
import '@/css/CustomContainer.css';

const CustomContainer = ({ children }) => {
    const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

    const handleMouseMove = (e) => {
        setMousePos({ x: e.clientX, y: e.clientY });
    };

    return (
        <main
            className="px-4 py-5 min-vh-100 position-relative custom-container"
            onMouseMove={handleMouseMove}
            style={{ overflow: 'hidden' }}
        >
            <div
                className="custom-container__glow custom-container__glow--blue"
                style={{ top: mousePos.y, left: mousePos.x }}
            />
            <div
                className="custom-container__glow custom-container__glow--orange"
                style={{ top: mousePos.y, left: mousePos.x }}
            />

            <div className="custom-container__content" style={{ position: 'relative', zIndex: 1 }}>
                {children}
            </div>
        </main>
    );
}

CustomContainer.propTypes = {
    children: PropTypes.node.isRequired,
}

export default CustomContainer;
