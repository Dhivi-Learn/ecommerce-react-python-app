import React, { createContext, useState, useMemo } from 'react';
import type { ReactNode } from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';

export const ThemeModeContext = createContext({
    toggleColorMode: () => { },
    mode: 'light' as 'light' | 'dark',
});

interface ThemeContextProviderProps {
    children: ReactNode;
}

export const ThemeContextProvider: React.FC<ThemeContextProviderProps> = ({ children }) => {
    const [mode, setMode] = useState<'light' | 'dark'>('light');

    const toggleColorMode = () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    };

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                    primary: {
                        main: '#673ab7', // Deep Purple
                        light: '#9575cd',
                        dark: '#512da8',
                        contrastText: '#ffffff',
                    },
                    secondary: {
                        main: '#ffb300', // Amber
                        light: '#ffd54f',
                        dark: '#ffa000',
                        contrastText: '#000000',
                    },
                    background: {
                        default: mode === 'light' ? '#f3e5f5' : '#121212', // Light purple background instead of white
                        paper: mode === 'light' ? '#ffffff' : '#1e1e1e',
                    },
                },
                typography: {
                    fontFamily: '"Roboto", "Inter", sans-serif',
                },
                components: {
                    MuiButton: {
                        styleOverrides: {
                            root: {
                                borderRadius: 8,
                                textTransform: 'none',
                            },
                        },
                    },
                },
            }),
        [mode]
    );

    const contextValue = useMemo(() => ({ toggleColorMode, mode }), [mode]);

    return (
        <ThemeModeContext.Provider value={contextValue}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ThemeModeContext.Provider>
    );
};
