import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import PreferencesModal from './components/PreferencesModal';
import HomePage from './pages/HomePage';
import PrayerPage from './pages/PrayerPage';
import CommunionPage from './pages/CommunionPage';
import FinalRitesPage from './pages/FinalRitesPage';
import DailyLiturgyPage from './pages/DailyLiturgyPage';

export default function App() {
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#090d16] theme-sepia:bg-[#f4ede2] text-slate-900 dark:text-gray-100 theme-sepia:text-[#2d241e] font-sans antialiased transition-colors duration-200">
      {/* Header with Navigation and Preferences trigger */}
      <Header
        onOpenPreferences={() => setIsPreferencesOpen(true)}
        onToggleSearch={() => setIsSearchOpen((prev) => !prev)}
        isSearchOpen={isSearchOpen}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                isSearchOpen={isSearchOpen}
                setIsSearchOpen={setIsSearchOpen}
              />
            }
          />
          <Route path="/oracao/:id" element={<PrayerPage />} />
          <Route path="/rito-comunhao" element={<CommunionPage />} />
          <Route path="/ritos-finais" element={<FinalRitesPage />} />
          <Route path="/liturgia-do-dia" element={<DailyLiturgyPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>

      {/* Preferences Drawer / Modal */}
      <PreferencesModal
        isOpen={isPreferencesOpen}
        onClose={() => setIsPreferencesOpen(false)}
      />

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-gray-800 theme-sepia:border-[#dec8a7] py-6 px-4 text-center text-xs text-slate-500 dark:text-gray-400 theme-sepia:text-[#5e5045] bg-white/50 dark:bg-gray-900/50 theme-sepia:bg-[#fbf7ee]/50">
        <div className="max-w-4xl mx-auto space-y-1">
          <p className="font-medium">
            Orações Eucarísticas • Liturgia diária • Missal Romano
          </p>
          <p className="opacity-75">
            Ocaris — Desenvolvido em React + Vite
          </p>
        </div>
      </footer>
    </div>
  );
}
