import {useEffect, useState} from 'react';

export default function ThemeButton() {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("theme") || "light";
    });

    useEffect(() => {
        document.body.classList.remove("light", "dark");
        document.body.classList.add(theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

    return (
        <button className={"theme-toggle"} onClick={toggleTheme}>
            {theme === "dark" ? "☀️" : "🌙"}
        </button>
    )
}