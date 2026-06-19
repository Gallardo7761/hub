import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe, faCodeBranch, faShieldAlt, faHardDrive, faClipboard, faPlantWilt, faClapperboard, faBook } from "@fortawesome/free-solid-svg-icons";
import "@/css/GraphNode.css";

const GraphNode = ({ title, link, x, y, isRoot = false, rootIcon = null, delay = 0 }) => {
    let hostname = new URL(link).hostname;

    const getIcon = (host) => {
        if (host.includes('drive')) return faHardDrive;
        if (host.includes('git')) return faCodeBranch;
        if (host.includes('id')) return faShieldAlt;
        if (host.includes('jose')) return faClipboard;
        if (host.includes('huertos')) return faPlantWilt;
        if (host.includes('hdc')) return faClapperboard;
        if (host.includes('docs')) return faBook;
        return faGlobe;
    };

    return (
        <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className={`graph-node ${isRoot ? "graph-node--root" : ""}`}
            style={{ left: `${x}%`, top: `${y}%`, '--delay': `${delay}s` }}
        >
            <div className="graph-node__circle">
                {isRoot ? (
                    rootIcon
                ) : (
                    <FontAwesomeIcon
                        icon={getIcon(hostname)}
                        className="graph-node__icon fa-xl"
                    />
                )}
            </div>
            <span className="graph-node__label">{isRoot ? title : hostname}</span>
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
    delay: PropTypes.number,
};

export default GraphNode;
