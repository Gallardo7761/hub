import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import GraphNode from "@/components/graph/GraphNode";
import "@/css/NetworkGraph.css";

const ORBIT_RADIUS = 38;
const BASE_SPEED = 4; // grados/segundo

const NetworkGraph = ({ logo, root, nodes }) => {
    const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const [active, setActive] = useState(null);
    const [frame, setFrame] = useState({ rot: 0, t: 0 });
    const activeRef = useRef(null);
    const speedRef = useRef(BASE_SPEED);
    const boxRef = useRef(null);

    useEffect(() => {
        if (reduced) return;
        let raf, rot = 0, last = performance.now();
        const loop = (now) => {
            const dt = Math.min((now - last) / 1000, 0.05);
            last = now;
            const target = activeRef.current === null ? BASE_SPEED : 0;
            speedRef.current += (target - speedRef.current) * Math.min(dt * 6, 1);
            rot += speedRef.current * dt;
            setFrame({ rot, t: now });
            raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(raf);
    }, [reduced]);

    const hover = (i) => { activeRef.current = i; setActive(i); };

    const tilt = (e) => {
        if (reduced) return;
        const r = boxRef.current.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        boxRef.current.style.transform = `perspective(900px) rotateX(${-y * 10}deg) rotateY(${x * 10}deg)`;
    };
    const untilt = () => { boxRef.current.style.transform = ""; };

    const positioned = nodes.map((node, i) => {
        const rad = ((-90 + frame.rot + i * (360 / nodes.length)) * Math.PI) / 180;
        return { ...node, x: 50 + ORBIT_RADIUS * Math.cos(rad), y: 50 + ORBIT_RADIUS * Math.sin(rad) };
    });

    return (
        <div className="network-graph" ref={boxRef} onMouseMove={tilt} onMouseLeave={untilt}>
            <svg className="network-graph__svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                <circle cx="50" cy="50" r={ORBIT_RADIUS} className="network-graph__ring" vectorEffect="non-scaling-stroke" />
                <circle cx="50" cy="50" r="20" className="network-graph__ring network-graph__ring--inner" vectorEffect="non-scaling-stroke" />
                {positioned.map((node, i) => {
                    const p = ((frame.t / 1000) / (2.6 + i * 0.4)) % 1;
                    const isActive = active === i;
                    return (
                        <g key={`link-${i}`}>
                            <line
                                x1="50" y1="50" x2={node.x} y2={node.y}
                                className={`network-graph__line ${isActive ? "is-active" : ""}`}
                                vectorEffect="non-scaling-stroke"
                            />
                            {!reduced && (
                                <circle
                                    r={isActive ? 2 : 1.4}
                                    cx={50 + (node.x - 50) * p}
                                    cy={50 + (node.y - 50) * p}
                                    opacity={Math.sin(Math.PI * p)}
                                    className="network-graph__packet"
                                />
                            )}
                        </g>
                    );
                })}
            </svg>

            <GraphNode title="" link={root.link} x={50} y={50} isRoot rootIcon={<img src={logo} width={48} />} />

            {positioned.map((node, i) => (
                <GraphNode
                    key={i}
                    index={i}
                    title={node.title}
                    link={node.link}
                    x={node.x}
                    y={node.y}
                    isLeaf
                    leafIcon={node.icon}
                    delay={0.45 + i * 0.09}
                    active={active === i}
                    dimmed={active !== null && active !== i}
                    onHover={hover}
                />
            ))}
        </div>
    );
};

NetworkGraph.propTypes = {
    logo: PropTypes.string,
    root: PropTypes.shape({ title: PropTypes.string.isRequired, link: PropTypes.string.isRequired }).isRequired,
    nodes: PropTypes.arrayOf(
        PropTypes.shape({ title: PropTypes.string.isRequired, link: PropTypes.string.isRequired })
    ).isRequired,
};

export default NetworkGraph;