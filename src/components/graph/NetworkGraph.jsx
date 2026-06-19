import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faServer } from "@fortawesome/free-solid-svg-icons";
import GraphNode from "@/components/graph/GraphNode";
import "@/css/NetworkGraph.css";

const ORBIT_RADIUS = 38;

const NetworkGraph = ({ root, nodes }) => {
    const reducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const positioned = nodes.map((node, i) => {
        const angle = -90 + i * (360 / nodes.length);
        const rad = (angle * Math.PI) / 180;
        return {
            ...node,
            x: 50 + ORBIT_RADIUS * Math.cos(rad),
            y: 50 + ORBIT_RADIUS * Math.sin(rad),
        };
    });

    return (
        <div className="network-graph">
            <svg className="network-graph__svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                {positioned.map((node, i) => {
                    const path = `M50,50 L${node.x},${node.y}`;
                    return (
                        <g key={`link-${i}`}>
                            <path
                                d={path}
                                className="network-graph__line"
                                vectorEffect="non-scaling-stroke"
                            />
                            <circle r="1.4" className="network-graph__packet">
                                {!reducedMotion && (
                                    <animateMotion dur={`${2.6 + i * 0.4}s`} repeatCount="indefinite" path={path} />
                                )}
                            </circle>
                        </g>
                    );
                })}
            </svg>

            <GraphNode
                title={""}
                link={root.link}
                x={50}
                y={50}
                isRoot
                rootIcon={<img src="https://cdn.miarma.net/img/logo-without-text.svg" width={48} />}
            />

            {positioned.map((node, i) => (
                <GraphNode
                    key={i}
                    title={node.title}
                    link={node.link}
                    x={node.x}
                    y={node.y}
                    delay={0.45 + i * 0.09}
                />
            ))}
        </div>
    );
};

NetworkGraph.propTypes = {
    root: PropTypes.shape({ title: PropTypes.string.isRequired, link: PropTypes.string.isRequired }).isRequired,
    nodes: PropTypes.arrayOf(
        PropTypes.shape({ title: PropTypes.string.isRequired, link: PropTypes.string.isRequired })
    ).isRequired,
};

export default NetworkGraph;
