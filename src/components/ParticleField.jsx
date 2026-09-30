import { useEffect, useRef } from "react";

const BLUE = "47,108,163";
const ORANGE = "227,187,157";

const ParticleField = () => {
    const ref = useRef(null);

    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const canvas = ref.current;
        const ctx = canvas.getContext("2d");
        const mouse = { x: -9999, y: -9999 };
        let w = 0, h = 0, raf, parts = [];

        const resize = () => {
            const dpr = window.devicePixelRatio || 1;
            w = window.innerWidth; h = window.innerHeight;
            canvas.width = w * dpr; canvas.height = h * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            const n = Math.min(90, Math.floor((w * h) / 16000));
            parts = Array.from({ length: n }, () => ({
                x: Math.random() * w, y: Math.random() * h,
                vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
            }));
        };
        const onMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; };

        const tick = () => {
            ctx.clearRect(0, 0, w, h);
            for (let i = 0; i < parts.length; i++) {
                const p = parts[i];
                p.x = (p.x + p.vx + w) % w;
                p.y = (p.y + p.vy + h) % h;
                ctx.fillStyle = `rgba(${BLUE},0.7)`;
                ctx.fillRect(p.x, p.y, 2, 2);

                for (let j = i + 1; j < parts.length; j++) {
                    const q = parts[j];
                    const d = Math.hypot(p.x - q.x, p.y - q.y);
                    if (d < 110) {
                        ctx.strokeStyle = `rgba(${BLUE},${0.22 * (1 - d / 110)})`;
                        ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
                    }
                }
                const dm = Math.hypot(p.x - mouse.x, p.y - mouse.y);
                if (dm < 170) {
                    ctx.strokeStyle = `rgba(${ORANGE},${0.55 * (1 - dm / 170)})`;
                    ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
                }
            }
            raf = requestAnimationFrame(tick);
        };

        resize();
        tick();
        window.addEventListener("resize", resize);
        window.addEventListener("mousemove", onMove);
        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", onMove);
        };
    }, []);

    return <canvas ref={ref} aria-hidden="true" style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }} />;
};

export default ParticleField;