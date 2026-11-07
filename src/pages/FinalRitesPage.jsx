import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { ritosFinais } from '../data/ritosFinais';
import LiturgicalViewer from '../components/LiturgicalViewer';

export default function FinalRitesPage() {
  const [selectedId, setSelectedId] = useState('I');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedId]);

  const activeBlessing = ritosFinais.find((b) => b.id === selectedId) || ritosFinais[0];

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-8">
      {/* Title Header */}
      <div className="text-center py-6 px-4 rounded-3xl bg-gradient-to-b from-amber-50/80 to-transparent dark:from-amber-950/20 theme-sepia:from-[#ebdcc2]/40 border-b border-dashed border-amber-200 dark:border-amber-900/40 theme-sepia:border-[#dec8a7] space-y-2">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-amber-700 dark:bg-amber-600 text-white shadow-sm mb-2">
          <Sparkles className="w-6 h-6" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-white theme-sepia:text-[#2d241e] tracking-tight">
          Ritos Finais
        </h1>
        <p className="text-sm sm:text-base text-amber-900/80 dark:text-amber-300 theme-sepia:text-[#a67c00] font-medium max-w-lg mx-auto">
          Bênção Solene e Despedida da Assembleia
        </p>
      </div>

      {/* Tabs / Blessing Selector */}
      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-gray-400 theme-sepia:text-[#5e5045] block px-1">
          Selecione a Fórmula da Bênção:
        </label>
        <div className="grid grid-cols-3 gap-2">
          {ritosFinais.map((blessing) => {
            const isSelected = selectedId === blessing.id;
            return (
              <button
                key={blessing.id}
                onClick={() => setSelectedId(blessing.id)}
                className={`p-3 rounded-2xl border text-center transition flex flex-col items-center justify-center ${
                  isSelected
                    ? 'border-amber-600 bg-amber-50 dark:bg-amber-950/40 theme-sepia:bg-[#ebdcc2] dark:border-amber-500 theme-sepia:border-[#a67c00] text-amber-900 dark:text-amber-200 theme-sepia:text-[#4a3818] shadow-sm font-semibold'
                    : 'border-slate-200 dark:border-gray-800 bg-white dark:bg-gray-800/60 theme-sepia:bg-[#fbf7ee] text-slate-700 dark:text-gray-300 theme-sepia:text-[#5e5045] hover:bg-slate-50 dark:hover:bg-gray-800'
                }`}
              >
                <span className="font-serif font-bold text-base">{blessing.title}</span>
                <span className="text-[10px] opacity-75 mt-0.5">{blessing.subtitle}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Liturgical Content */}
      <article className="bg-white dark:bg-gray-900 theme-sepia:bg-[#fbf7ee] p-5 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-gray-800 theme-sepia:border-[#dec8a7] shadow-xs">
        <LiturgicalViewer content={activeBlessing.content} />
      </article>

      {/* Concluding Action */}
      <div className="space-y-3 pt-2">
        <div className="p-4 rounded-2xl bg-green-50/60 dark:bg-green-950/30 theme-sepia:bg-[#ebdcc2]/50 border border-green-200 dark:border-green-900/50 theme-sepia:border-[#dec8a7] text-center space-y-1">
          <div className="flex items-center justify-center gap-1.5 text-green-700 dark:text-green-400 font-semibold text-sm">
            <CheckCircle2 className="w-4 h-4" />
            <span>Fim da Celebração</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-gray-400 theme-sepia:text-[#5e5045]">
            "Ide em paz, e o Senhor vos acompanhe. — Graças a Deus!"
          </p>
        </div>

        <Link
          to="/"
          className="w-full flex items-center justify-center gap-2 p-4 rounded-2xl bg-red-700 hover:bg-red-800 dark:bg-red-600 dark:hover:bg-red-700 text-white font-medium shadow-md transition"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Retornar ao Início</span>
        </Link>
      </div>
    </div>
  );
}
