import React, { useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, UtensilsCrossed, BookOpen, Share2, Check } from 'lucide-react';
import { oracoes } from '../data/oracoes';
import LiturgicalViewer from '../components/LiturgicalViewer';

export default function PrayerPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [copied, setCopied] = React.useState(false);

  // Find prayer
  const currentIndex = useMemo(() => {
    return oracoes.findIndex((p) => p.id === id);
  }, [id]);

  const prayer = currentIndex !== -1 ? oracoes[currentIndex] : null;
  const prevPrayer = currentIndex > 0 ? oracoes[currentIndex - 1] : null;
  const nextPrayer = currentIndex < oracoes.length - 1 ? oracoes[currentIndex + 1] : null;

  // Scroll to top on id change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  if (!prayer) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-2xl font-serif font-bold text-slate-900 dark:text-white theme-sepia:text-[#2d241e]">
          Oração não encontrada
        </h2>
        <p className="text-slate-600 dark:text-gray-400 theme-sepia:text-[#5e5045]">
          A oração eucarística solicitada não foi localizada.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-700 hover:bg-red-800 text-white rounded-xl font-medium transition"
        >
          Voltar para a página inicial
        </Link>
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: prayer.title,
        text: `${prayer.title} - ${prayer.subtitle}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-8">
      {/* Title & Info Card */}
      <div className="text-center py-6 px-4 rounded-3xl bg-gradient-to-b from-red-50/70 to-transparent dark:from-red-950/20 theme-sepia:from-[#ebdcc2]/40 border-b border-dashed border-red-200 dark:border-red-900/40 theme-sepia:border-[#dec8a7] space-y-2">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-red-700 dark:bg-red-600 text-white font-serif font-bold text-xl shadow-sm mb-2">
          {prayer.id}
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-white theme-sepia:text-[#2d241e] tracking-tight">
          {prayer.title}
        </h1>
        {prayer.subtitle && (
          <p className="text-sm sm:text-base text-red-800/80 dark:text-red-300 theme-sepia:text-[#9e2a2b] font-medium max-w-lg mx-auto">
            {prayer.subtitle}
          </p>
        )}

        <div className="pt-2 flex items-center justify-center gap-3">
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-gray-300 theme-sepia:text-[#5e5045] bg-white dark:bg-gray-800 theme-sepia:bg-[#ebdcc2] border border-slate-200 dark:border-gray-700 theme-sepia:border-[#dec8a7] hover:bg-slate-50 transition"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-green-600" />
                <span>Link Copiado!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span>Compartilhar</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Liturgical Content */}
      <article className="bg-white dark:bg-gray-900 theme-sepia:bg-[#fbf7ee] p-5 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-gray-800 theme-sepia:border-[#dec8a7] shadow-xs">
        <LiturgicalViewer content={prayer.content} />
      </article>

      {/* Primary Next Action: Proceed to Rito da Comunhão */}
      <div className="pt-2">
        <Link
          to="/rito-comunhao"
          className="w-full flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-red-700 to-red-900 dark:from-red-800 dark:to-red-950 text-white font-medium shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-white/10">
              <UtensilsCrossed className="w-6 h-6 text-amber-300" />
            </div>
            <div className="text-left">
              <div className="text-xs uppercase tracking-wider text-red-200 font-semibold">
                Próximo passo na Missa
              </div>
              <div className="text-base sm:text-lg font-serif font-bold text-white">
                Prosseguir para o Rito da Comunhão
              </div>
            </div>
          </div>
          <ChevronRight className="w-6 h-6 text-amber-300" />
        </Link>
      </div>

      {/* Previous / Next Prayer Navigation */}
      <div className="grid grid-cols-2 gap-3 pt-2">
        {prevPrayer ? (
          <Link
            to={`/oracao/${encodeURIComponent(prevPrayer.id)}`}
            className="flex items-center gap-2 p-3.5 rounded-2xl bg-white dark:bg-gray-800/80 theme-sepia:bg-[#fbf7ee] border border-slate-200 dark:border-gray-700 theme-sepia:border-[#dec8a7] text-slate-700 dark:text-gray-300 theme-sepia:text-[#4a3818] hover:border-red-500 transition"
          >
            <ChevronLeft className="w-5 h-5 text-red-600 flex-shrink-0" />
            <div className="min-w-0 text-left">
              <div className="text-[10px] uppercase font-bold text-slate-400">Anterior</div>
              <div className="text-xs sm:text-sm font-semibold truncate">
                Oração {prevPrayer.id}
              </div>
            </div>
          </Link>
        ) : (
          <div />
        )}

        {nextPrayer ? (
          <Link
            to={`/oracao/${encodeURIComponent(nextPrayer.id)}`}
            className="flex items-center justify-end gap-2 p-3.5 rounded-2xl bg-white dark:bg-gray-800/80 theme-sepia:bg-[#fbf7ee] border border-slate-200 dark:border-gray-700 theme-sepia:border-[#dec8a7] text-slate-700 dark:text-gray-300 theme-sepia:text-[#4a3818] hover:border-red-500 transition text-right"
          >
            <div className="min-w-0">
              <div className="text-[10px] uppercase font-bold text-slate-400">Próxima</div>
              <div className="text-xs sm:text-sm font-semibold truncate">
                Oração {nextPrayer.id}
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-red-600 flex-shrink-0" />
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
