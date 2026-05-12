import { useState, useEffect } from "react";

/**
 * Returns the current DaisyUI theme ("light" | "dark").
 * Reacts instantly when the Navbar toggles data-theme on <html>.
 */
const useTheme = () =>
{
    const [theme, setTheme] = useState(
        () => document.documentElement.getAttribute("data-theme") || "light"
    );

    useEffect(() =>
    {
        const observer = new MutationObserver(() =>
        {
            setTheme(document.documentElement.getAttribute("data-theme") || "light");
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["data-theme"],
        });

        return () => observer.disconnect();
    }, []);

    return theme;
};

export default useTheme;
