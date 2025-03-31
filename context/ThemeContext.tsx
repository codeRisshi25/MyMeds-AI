import React, { createContext, useContext } from 'react';

interface ThemeContextType {
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
  const colors = {
    background: '#f8fafc',
    surface: '#f8fafc',
    text: '#FFFFFF',
    textSecondary: '#A0A0A0',
    primary: '#0891b2',
    secondary: '#EC4899',
    accent: '#8B5CF6',
    error: '#EF4444',
    success: '#10B981',
    warning: '#F59E0B',
    border: '#f8fafc',
  };

  return (
    <ThemeContext.Provider value={{ colors }}>
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
