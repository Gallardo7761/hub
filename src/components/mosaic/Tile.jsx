import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faLock } from "@fortawesome/free-solid-svg-icons";

const Tile = ({ href, icon, title, subtitle, locked = false, variant, index }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`tile ${variant ? `tile--${variant}` : ""}`}
        style={{ "--i": index }}
    >
        <FontAwesomeIcon icon={icon} className="tile__icon" />
        <FontAwesomeIcon icon={faArrowRight} className="tile__arrow" />
        <span className="tile__title">{title}</span>
        <span className="tile__sub">
            {locked && <FontAwesomeIcon icon={faLock} className="tile__lock" />}
            {subtitle}
        </span>
    </a>
);

Tile.propTypes = {
    href: PropTypes.string.isRequired,
    icon: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    locked: PropTypes.bool,
    variant: PropTypes.string,
    index: PropTypes.number.isRequired,
};

export default Tile;
