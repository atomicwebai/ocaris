import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Sparkles, UtensilsCrossed, ArrowLeft } from 'lucide-react';
import { ritoComunhao } from '../data/ritoComunhao';
import LiturgicalViewer from '../components/LiturgicalViewer';

export default function CommunionPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-8">
      {/* Title Header */}
      <div className="text-center py-6 px-4 rounded-3xl bg-gradient-to-b from-red-50/70 to-transparent dark:from-red-950/20 theme-sepia:from-[#ebdcc2]/40 border-b border-dashed border-red-200 dark:border-red-900/40 theme-sepia:border-[#dec8a7] space-y-2">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-red-700 dark:bg-red-600 text-white shadow-sm mb-2">
          <UtensilsCrossed className="w-6 h-6" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-white theme-sepia:text-[#2d241e] tracking-tight">
          {ritoComunhao.title}
        </h1>
        <p className="text-sm sm:text-base text-red-800/80 dark:text-red-300 theme-sepia:text-[#9e2a2b] font-medium max-w-lg mx-auto">
          {ritoComunhao.subtitle}
        </p>
      </div>

      {/* Liturgical Content */}
      <article className="bg-white dark:bg-gray-900 theme-sepia:bg-[#fbf7ee] p-5 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-gray-800 theme-sepia:border-[#dec8a7] shadow-xs">
        <LiturgicalViewer content={ritoComunhao.content} />
      </article>

      {/* Primary Next Action: Proceed to Ritos Finais */}
      <div className="space-y-3 pt-2">
        <Link
          to="/ritos-finais"
          className="w-full flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-700 to-amber-900 dark:from-amber-800 dark:to-stone-900 text-white font-medium shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-white/10">
              <Sparkles className="w-6 h-6 text-amber-300" />
            </div>
            <div className="text-left">
              <div className="text-xs uppercase tracking-wider text-amber-200 font-semibold">
                Próximo passo na Missa
              </div>
              <div className="text-base sm:text-lg font-serif font-bold text-white">
                Prosseguir para os Ritos Finais
              </div>
            </div>
          </div>
          <ChevronRight className="w-6 h-6 text-amber-300" />
        </Link>

        <Link
          to="/"
          className="w-full flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-white dark:bg-gray-800/80 theme-sepia:bg-[#fbf7ee] border border-slate-200 dark:border-gray-700 theme-sepia:border-[#dec8a7] text-slate-700 dark:text-gray-300 theme-sepia:text-[#4a3818] font-medium text-sm hover:bg-slate-50 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar para as Orações Eucarísticas</span>
        </Link>
      </div>
    </div>
  );
}
