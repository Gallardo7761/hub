import {useEffect, useState} from 'react';

export default function ThemeButton() {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("theme") || "light-mode";
    });

    useEffect(() => {
        document.body.classList.remove("light-mode", "dark-mode");
        document.body.classList.add(theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light-mode" ? "dark-mode" : "light-mode"));
    };

    return (
        <button className={"theme-toggle"} onClick={toggleTheme}>
            {theme === "dark-mode" ? "☀️" : "🌙"}
        </button>
    )
}