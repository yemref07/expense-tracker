import { defineStore } from "pinia";

export const useDarkModeStore = defineStore('darkModeStore', () => {
    const theme = ref()

    const setTheme = (param: string) => {
        if (param === 'dark')
            theme.value = true;
        else if (param === 'light') {
            theme.value = false
        }
    }

    const detectSystemPreference = () => {
        if (typeof window !== 'undefined' && window.localStorage) {
            if (
                localStorage.theme === "dark" ||
                (!("theme" in localStorage) &&
                    window.matchMedia("(prefers-color-scheme: dark)").matches)
            ) {
                setTheme("dark");
            } else {
                setTheme("light");
            }
        } else {
            // Fallback behavior if localStorage is not available
            setTheme("light");
        }
    };

    detectSystemPreference();

    return {
        setTheme,
        theme,
    }
})