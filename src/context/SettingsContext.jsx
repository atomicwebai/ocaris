import React, { createContext, useContext, useState, useEffect } from 'react';

const SettingsContext = createContext();

export function SettingsProvider({ children }) {
  // Theme: 'light' | 'dark' | 'sepia'
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('ocaris_theme') || 'light';
  });

  // Font size in pixels (14 to 32, default 18)
  const [fontSize, setFontSize] = useState(() => {
    const saved = localStorage.getItem('ocaris_font_size');
    return saved ? parseInt(saved, 10) : 18;
  });

  // Font family: 'sans' | 'serif'
  const [fontFamily, setFontFamily] = useState(() => {
    return localStorage.getItem('ocaris_font_family') || 'serif';
  });

  // Text alignment: 'justify' | 'left'
  const [textAlign, setTextAlign] = useState(() => {
    return localStorage.getItem('ocaris_text_align') || 'justify';
  });

  // Assembly Highlight: boolean
  const [highlightAssembly, setHighlightAssembly] = useState(() => {
    const saved = localStorage.getItem('ocaris_highlight_assembly');
    return saved !== null ? saved === 'true' : true;
  });

  // Apply theme class to <html> element
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark', 'theme-sepia');
    if (theme === 'dark') {
      root.classList.add('dark');
    } else if (theme === 'sepia') {
      root.classList.add('theme-sepia');
    }
    localStorage.setItem('ocaris_theme', theme);
  }, [theme]);

  // Save font size
  useEffect(() => {
    localStorage.setItem('ocaris_font_size', fontSize.toString());
  }, [fontSize]);

  // Save font family
  useEffect(() => {
    localStorage.setItem('ocaris_font_family', fontFamily);
  }, [fontFamily]);

  // Save text align
  useEffect(() => {
    localStorage.setItem('ocaris_text_align', textAlign);
  }, [textAlign]);

  // Save highlight
  useEffect(() => {
    localStorage.setItem('ocaris_highlight_assembly', highlightAssembly.toString());
  }, [highlightAssembly]);

  const increaseFontSize = () => {
    setFontSize(prev => Math.min(prev + 2, 34));
  };

  const decreaseFontSize = () => {
    setFontSize(prev => Math.max(prev - 2, 14));
  };

  return (
    <SettingsContext.Provider
      value={{
        theme,
        setTheme,
        fontSize,
        setFontSize,
        increaseFontSize,
        decreaseFontSize,
        fontFamily,
        setFontFamily,
        textAlign,
        setTextAlign,
        highlightAssembly,
        setHighlightAssembly,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
