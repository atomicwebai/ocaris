import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, X, ChevronRight, Sparkles, BookOpen, UtensilsCrossed, Award, HeartHandshake, Baby, CalendarDays } from 'lucide-react';
import { oracoes } from '../data/oracoes';

export default function HomePage({ isSearchOpen, setIsSearchOpen }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todas');

  const categories = [
    { id: 'todas', name: 'Todas', icon: BookOpen },
    { id: 'principais', name: 'Principais (I-V)', icon: Sparkles },
    { id: 'diversas', name: 'Diversas Circunstâncias (VI)', icon: Award },
    { id: 'reconciliacao', name: 'Reconciliação (VII-VIII)', icon: HeartHandshake },
    { id: 'criancas', name: 'Crianças (IX-XI)', icon: Baby },
  ];

  const filteredPrayers = useMemo(() => {
    return oracoes.filter((p) => {
      // Category filter
      if (selectedCategory === 'principais') {
        if (!['I', 'II', 'III', 'IV', 'V'].includes(p.id)) return false;
      } else if (selectedCategory === 'diversas') {
        if (!p.id.startsWith('VI')) return false;
      } else if (selectedCategory === 'reconciliacao') {
        if (!['VII', 'VIII'].includes(p.id)) return false;
      } else if (selectedCategory === 'criancas') {
        if (!['IX', 'X', 'XI'].includes(p.id)) return false;
      }

      // Search filter
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchTitle = p.title.toLowerCase().includes(query);
        const matchSubtitle = p.subtitle.toLowerCase().includes(query);
        const matchId = p.id.toLowerCase().includes(query);
        const matchContent = p.content.toLowerCase().includes(query);
        return matchTitle || matchSubtitle || matchId || matchContent;
      }

      return true;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-8">
      {/* Hero Header */}
      <div className="text-center space-y-2 py-4">
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 dark:text-white theme-sepia:text-[#2d241e] tracking-tight">
          Orações Eucarísticas
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-gray-400 theme-sepia:text-[#5e5045] max-w-lg mx-auto">
          Textos completos do Missal Romano para celebração e estudo litúrgico.
        </p>
      </div>

      {/* Quick Action Navigation Cards (Rito da Comunhão & Ritos Finais) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link
          to="/liturgia-do-dia"
          className="group flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-800 to-emerald-950 text-white shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 border border-emerald-700/50"
        >
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <CalendarDays className="w-5 h-5 text-emerald-200" />
              <span className="text-xs uppercase font-bold tracking-wider text-emerald-200">Calendário litúrgico</span>
            </div>
            <h2 className="text-lg font-serif font-bold text-white group-hover:text-emerald-100 transition">Liturgia do dia</h2>
            <p className="text-xs text-emerald-100 line-clamp-1">Orações, leituras e Evangelho por data</p>
          </div>
          <ChevronRight className="w-6 h-6 text-emerald-200 group-hover:translate-x-1 group-hover:text-white transition" />
        </Link>

        <Link
          to="/rito-comunhao"
          className="group flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-red-800 to-red-900 dark:from-red-900 dark:to-red-950 text-white shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 border border-red-700/50"
        >
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <UtensilsCrossed className="w-5 h-5 text-amber-300" />
              <span className="text-xs uppercase font-bold tracking-wider text-red-200">
                Sequência Litúrgica
              </span>
            </div>
            <h2 className="text-lg font-serif font-bold text-white group-hover:text-amber-200 transition">
              Rito da Comunhão
            </h2>
            <p className="text-xs text-red-200 line-clamp-1">
              Pai-Nosso, Oração pela Paz, Cordeiro de Deus
            </p>
          </div>
          <ChevronRight className="w-6 h-6 text-red-300 group-hover:translate-x-1 group-hover:text-white transition" />
        </Link>

        <Link
          to="/ritos-finais"
          className="group flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-700 to-amber-900 dark:from-amber-900 dark:to-stone-900 text-white shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 border border-amber-600/50"
        >
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-300" />
              <span className="text-xs uppercase font-bold tracking-wider text-amber-200">
                Bênçãos Solenes
              </span>
            </div>
            <h2 className="text-lg font-serif font-bold text-white group-hover:text-amber-200 transition">
              Ritos Finais
            </h2>
            <p className="text-xs text-amber-200 line-clamp-1">
              Bênção Final I, II (Tempo Comum) e III (Pascal)
            </p>
          </div>
          <ChevronRight className="w-6 h-6 text-amber-300 group-hover:translate-x-1 group-hover:text-white transition" />
        </Link>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <div className="relative flex items-center">
          <Search className="w-5 h-5 absolute left-4 text-slate-400 dark:text-gray-500 pointer-events-none" />
          <input
            type="text"
            placeholder="Buscar por título, número, reconciliação, crianças ou texto..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-white dark:bg-gray-800/80 theme-sepia:bg-[#fbf7ee] border border-slate-200 dark:border-gray-700 theme-sepia:border-[#dec8a7] text-slate-900 dark:text-white theme-sepia:text-[#2d241e] placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600 dark:focus:ring-red-500 shadow-sm transition"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3.5 p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-gray-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition ${
                isActive
                  ? 'bg-red-700 text-white dark:bg-red-600 shadow-sm'
                  : 'bg-white dark:bg-gray-800/60 theme-sepia:bg-[#ebdcc2]/70 text-slate-700 dark:text-gray-300 theme-sepia:text-[#4a3818] border border-slate-200 dark:border-gray-700 theme-sepia:border-[#dec8a7] hover:bg-slate-100 dark:hover:bg-gray-700'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>

      {/* Prayers List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-gray-400 theme-sepia:text-[#5e5045] px-1">
          <span>Orações Eucarísticas</span>
          <span>{filteredPrayers.length} {filteredPrayers.length === 1 ? 'oração' : 'orações'}</span>
        </div>

        {filteredPrayers.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-gray-800/40 theme-sepia:bg-[#fbf7ee] rounded-2xl border border-slate-200 dark:border-gray-800 theme-sepia:border-[#dec8a7]">
            <p className="text-slate-500 dark:text-gray-400 theme-sepia:text-[#5e5045]">
              Nenhuma oração encontrada para "{searchTerm}".
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('todas');
              }}
              className="mt-3 text-sm text-red-600 dark:text-red-400 font-medium hover:underline"
            >
              Limpar filtros de busca
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3">
            {filteredPrayers.map((prayer) => (
              <Link
                key={prayer.id}
                to={`/oracao/${encodeURIComponent(prayer.id)}`}
                className="group flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-white dark:bg-gray-800/80 theme-sepia:bg-[#fbf7ee] border border-slate-200/80 dark:border-gray-700/60 theme-sepia:border-[#dec8a7] hover:border-red-500/50 dark:hover:border-red-500/50 shadow-xs hover:shadow-md transition-all transform hover:-translate-y-0.5"
              >
                <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                  {/* Roman Numeral Badge */}
                  <div className="w-12 h-12 rounded-xl bg-red-50 dark:bg-red-950/50 theme-sepia:bg-[#ebdcc2] border border-red-200 dark:border-red-900/50 theme-sepia:border-[#dec8a7] flex items-center justify-center flex-shrink-0 text-red-700 dark:text-red-400 theme-sepia:text-[#9e2a2b] font-serif font-bold text-base sm:text-lg group-hover:scale-105 transition-transform">
                    {prayer.id}
                  </div>

                  <div className="min-w-0">
                    <h3 className="font-serif font-bold text-base sm:text-lg text-slate-900 dark:text-white theme-sepia:text-[#2d241e] group-hover:text-red-700 dark:group-hover:text-red-400 theme-sepia:group-hover:text-[#9e2a2b] transition truncate">
                      {prayer.title}
                    </h3>
                    {prayer.subtitle && (
                      <p className="text-xs sm:text-sm text-slate-500 dark:text-gray-400 theme-sepia:text-[#5e5045] truncate mt-0.5">
                        {prayer.subtitle}
                      </p>
                    )}
                  </div>
                </div>

                <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-red-600 dark:group-hover:text-red-400 group-hover:translate-x-1 transition flex-shrink-0 ml-2" />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
