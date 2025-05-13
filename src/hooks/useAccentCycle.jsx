import { useEffect } from "react";

export function useAccentCycle() {
  useEffect(() => {
    let hue = 0;

    const updateAccent = () => {
      const accent = `hsl(${hue}, 90%, 70%)`;
      const hover = `hsl(${hue}, 90%, 60%)`;
      document.documentElement.style.setProperty('--accent', accent);
      document.documentElement.style.setProperty('--accent-hover', hover);

      hue = (hue + 1) % 360; // da la vuelta completa cada 360 pasos
    };

    updateAccent();
    const interval = setInterval(updateAccent, 50); // + rápido = transición más suave

    return () => clearInterval(interval);
  }, []);
}