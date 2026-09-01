import React from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { ChevronLeft, SlidersHorizontal, Sun, Moon, BookOpen, ZoomIn, ZoomOut, Search, BookMarked } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

export default function Header({ onOpenPreferences, onToggleSearch, isSearchOpen }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, setTheme, fontSize, increaseFontSize, decreaseFontSize } = useSettings();

  const isHome = location.pathname === '/';

  const toggleTheme = () => {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('sepia');
    else setTheme('light');
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-gray-900/95 theme-sepia:bg-[#fbf7ee]/95 backdrop-blur-md border-b border-slate-200 dark:border-gray-800 theme-sepia:border-[#dec8a7] shadow-xs transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between gap-2">
        {/* Left Side: Back button or Logo */}
        <div className="flex items-center gap-2">
          {!isHome ? (
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-red-700 dark:text-red-400 theme-sepia:text-[#9e2a2b] hover:bg-red-50 dark:hover:bg-red-950/40 theme-sepia:hover:bg-[#ebdcc2] font-medium text-sm transition"
              aria-label="Voltar"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Voltar</span>
            </button>
          ) : (
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-600 to-red-800 dark:from-red-700 dark:to-red-900 flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
                <BookMarked className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-base sm:text-lg tracking-tight text-slate-900 dark:text-white theme-sepia:text-[#2d241e]">
                  Orações Eucarísticas
                </span>
                <span className="text-[10px] text-slate-500 dark:text-gray-400 theme-sepia:text-[#5e5045] uppercase tracking-wider font-semibold">
                  Missal Romano
                </span>
              </div>
            </Link>
          )}
        </div>

        {/* Right Side: Quick Action Controls */}
        <div className="flex items-center gap-1 sm:gap-1.5">
          {/* Quick Search Toggle on Home */}
          {isHome && (
            <button
              onClick={onToggleSearch}
              className={`p-2 rounded-lg text-slate-600 dark:text-gray-300 theme-sepia:text-[#5e5045] hover:bg-slate-100 dark:hover:bg-gray-800 theme-sepia:hover:bg-[#ebdcc2] transition ${
                isSearchOpen ? 'bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-400' : ''
              }`}
              title="Buscar oração..."
              aria-label="Buscar"
            >
              <Search className="w-5 h-5" />
            </button>
          )}

          {/* Quick Font Size Buttons */}
          <div className="hidden sm:flex items-center bg-slate-100 dark:bg-gray-800 theme-sepia:bg-[#ebdcc2] rounded-lg p-0.5 border border-slate-200 dark:border-gray-700 theme-sepia:border-[#dec8a7]">
            <button
              onClick={decreaseFontSize}
              disabled={fontSize <= 14}
              className="p-1.5 rounded-md hover:bg-white dark:hover:bg-gray-700 theme-sepia:hover:bg-[#fbf7ee] text-slate-700 dark:text-gray-300 theme-sepia:text-[#4a3818] disabled:opacity-30 transition"
              title="Diminuir fonte"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-xs px-1 font-medium text-slate-600 dark:text-gray-300 theme-sepia:text-[#4a3818] min-w-[28px] text-center">
              {fontSize}
            </span>
            <button
              onClick={increaseFontSize}
              disabled={fontSize >= 34}
              className="p-1.5 rounded-md hover:bg-white dark:hover:bg-gray-700 theme-sepia:hover:bg-[#fbf7ee] text-slate-700 dark:text-gray-300 theme-sepia:text-[#4a3818] disabled:opacity-30 transition"
              title="Aumentar fonte"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-slate-600 dark:text-gray-300 theme-sepia:text-[#5e5045] hover:bg-slate-100 dark:hover:bg-gray-800 theme-sepia:hover:bg-[#ebdcc2] transition"
            title={`Tema atual: ${theme}. Clique para alternar.`}
            aria-label="Alternar tema"
          >
            {theme === 'light' && <Sun className="w-5 h-5 text-amber-500" />}
            {theme === 'dark' && <Moon className="w-5 h-5 text-indigo-400" />}
            {theme === 'sepia' && <BookOpen className="w-5 h-5 text-[#a67c00]" />}
          </button>

          {/* Preferences Drawer trigger */}
          <button
            onClick={onOpenPreferences}
            className="p-2 rounded-lg text-slate-600 dark:text-gray-300 theme-sepia:text-[#5e5045] hover:bg-slate-100 dark:hover:bg-gray-800 theme-sepia:hover:bg-[#ebdcc2] transition"
            title="Preferências de Leitura"
            aria-label="Preferências"
          >
            <SlidersHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
