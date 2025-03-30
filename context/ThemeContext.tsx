import React, { createContext, useContext, useState } from 'react';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
  colors: {
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    primary: string;
    secondary: string;
    accent: string;
    error: string;
    success: string;
    warning: string;
    border: string;
  };
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const colors = {
    background: isDarkMode ? '#121212' : '#FFFFFF',
    surface: isDarkMode ? '#1E1E1E' : '#F5F5F5',
    text: isDarkMode ? '#FFFFFF' : '#121212',
    textSecondary: isDarkMode ? '#A0A0A0' : '#666666',
    primary: '#6366F1',
    secondary: '#EC4899',
    accent: '#8B5CF6',
    error: '#EF4444',
    success: '#10B981',
    warning: '#F59E0B',
    border: isDarkMode ? '#2E2E2E' : '#E5E5E5',
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}