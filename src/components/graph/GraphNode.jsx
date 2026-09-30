import PropTypes from "prop-types";
import "@/css/GraphNode.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faIdBadge,
    faNetworkWired,
    faWallet,
    faPaste,
    faHeartPulse,
    faShieldHalved,
    faCodeBranch,
    faBook,
    faHardDrive,
    faImages,
    faSliders,
    faSquareRootVariable,
    faGaugeHigh,
    faFilm,
    faBoxesStacked,
    faBrain,
    faGlobe
} from "@fortawesome/free-solid-svg-icons";
import { faDocker } from "@fortawesome/free-brands-svg-icons";

const ICON_MAP = {
    "id-badge": faIdBadge,
    "network-wired": faNetworkWired,
    "wallet": faWallet,
    "paste": faPaste,
    "heart-pulse": faHeartPulse,
    "shield-halved": faShieldHalved,
    "code-branch": faCodeBranch,
    "book": faBook,
    "hard-drive": faHardDrive,
    "images": faImages,
    "sliders": faSliders,
    "square-root-variable": faSquareRootVariable,
    "docker": faDocker,
    "gauge-high": faGaugeHigh,
    "film": faFilm,
    "boxes-stacked": faBoxesStacked,
    "brain": faBrain,
};

const GraphNode = ({ title, link, x, y, isRoot = false, rootIcon = null, isLeaf = false, leafIcon = null, delay = 0, index = null, active = false, dimmed = false, onHover }) => {
    let hostname = "";
    try {
        hostname = new URL(link).hostname;
    } catch {
        hostname = link;
    }

    const selectedIcon = ICON_MAP[leafIcon] || faGlobe;
    const isTopHalf = y < 50;

    return (
        <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className={`graph-node ${isRoot ? "graph-node--root" : ""} ${isTopHalf ? "graph-node--top" : "graph-node--bottom"} ${active ? "graph-node--active" : ""} ${dimmed ? "graph-node--dim" : ""}`}
            onMouseEnter={() => onHover?.(index)}
            onMouseLeave={() => onHover?.(null)}
            onFocus={() => onHover?.(index)}
            onBlur={() => onHover?.(null)}
            style={{ left: `${x}%`, top: `${y}%`, '--delay': `${delay}s` }}
        >
            <div className="graph-node__circle">
                {isRoot ? rootIcon : <FontAwesomeIcon icon={selectedIcon} />}
            </div>
            <span className="graph-node__label">{isRoot ? title : (title || hostname)}</span>
        </a>
    );
};

GraphNode.propTypes = {
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    isRoot: PropTypes.bool,
    rootIcon: PropTypes.node,
    isLeaf: PropTypes.bool,
    leafIcon: PropTypes.node,
    delay: PropTypes.number,
    index: PropTypes.number,
    active: PropTypes.bool,
    dimmed: PropTypes.bool,
    onHover: PropTypes.func,
};

export default GraphNode;