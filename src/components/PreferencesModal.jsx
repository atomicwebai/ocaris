import React from 'react';
import { X, Sun, Moon, BookOpen, ZoomIn, ZoomOut, AlignJustify, AlignLeft, Sparkles } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

export default function PreferencesModal({ isOpen, onClose }) {
  const {
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
  } = useSettings();

  if (!isOpen) return null;

  const themes = [
    { id: 'light', name: 'Claro', icon: Sun, desc: 'Padrão' },
    { id: 'dark', name: 'Escuro', icon: Moon, desc: 'Noturno' },
    { id: 'sepia', name: 'Sépia', icon: BookOpen, desc: 'Leitura' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <aside 
          aria-label="Painel de Preferências"
          className="w-screen max-w-md bg-white dark:bg-gray-900 theme-sepia:bg-[#fbf7ee] shadow-2xl border-l border-slate-200 dark:border-gray-800 theme-sepia:border-[#dec8a7] flex flex-col transition-all duration-300"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-gray-800 theme-sepia:border-[#dec8a7]">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-red-700 dark:text-red-400 theme-sepia:text-[#9e2a2b]" />
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white theme-sepia:text-[#2d241e]">
                Preferências de Leitura
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-slate-100 dark:hover:bg-gray-800 transition"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Tema */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-gray-400 theme-sepia:text-[#5e5045] block mb-3">
                Tema de Exibição
              </label>
              <div className="grid grid-cols-3 gap-2">
                {themes.map((t) => {
                  const Icon = t.icon;
                  const active = theme === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setTheme(t.id)}
                      className={`flex flex-col items-center justify-center p-3 rounded-xl border text-sm font-medium transition ${
                        active
                          ? 'border-red-600 bg-red-50 text-red-700 dark:border-red-500 dark:bg-red-950/40 dark:text-red-300 theme-sepia:border-[#9e2a2b] theme-sepia:bg-[#ebdcc2] theme-sepia:text-[#4a3818] shadow-sm'
                          : 'border-slate-200 dark:border-gray-800 hover:bg-slate-50 dark:hover:bg-gray-800 text-slate-700 dark:text-gray-300'
                      }`}
                    >
                      <Icon className="w-5 h-5 mb-1.5" />
                      <span>{t.name}</span>
                      <span className="text-[10px] opacity-75">{t.desc}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tamanho da Fonte */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-gray-400 theme-sepia:text-[#5e5045]">
                  Tamanho da Fonte ({fontSize}px)
                </label>
                <span className="text-xs text-slate-500 dark:text-gray-400">
                  {fontSize <= 16 ? 'Pequeno' : fontSize <= 20 ? 'Médio' : fontSize <= 26 ? 'Grande' : 'Muito Grande'}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={decreaseFontSize}
                  disabled={fontSize <= 14}
                  className="p-2.5 rounded-xl border border-slate-200 dark:border-gray-800 hover:bg-slate-100 dark:hover:bg-gray-800 disabled:opacity-40 transition"
                  title="Diminuir fonte"
                >
                  <ZoomOut className="w-5 h-5" />
                </button>

                <input
                  type="range"
                  min="14"
                  max="34"
                  step="2"
                  value={fontSize}
                  onChange={(e) => setFontSize(parseInt(e.target.value, 10))}
                  className="flex-1 accent-red-600 h-2 bg-slate-200 dark:bg-gray-700 rounded-lg cursor-pointer"
                />

                <button
                  onClick={increaseFontSize}
                  disabled={fontSize >= 34}
                  className="p-2.5 rounded-xl border border-slate-200 dark:border-gray-800 hover:bg-slate-100 dark:hover:bg-gray-800 disabled:opacity-40 transition"
                  title="Aumentar fonte"
                >
                  <ZoomIn className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Tipografia */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-gray-400 theme-sepia:text-[#5e5045] block mb-3">
                Estilo da Fonte
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setFontFamily('serif')}
                  className={`p-3 rounded-xl border text-left font-serif transition ${
                    fontFamily === 'serif'
                      ? 'border-red-600 bg-red-50 text-red-700 dark:border-red-500 dark:bg-red-950/40 dark:text-red-300 theme-sepia:border-[#9e2a2b] theme-sepia:bg-[#ebdcc2] theme-sepia:text-[#4a3818]'
                      : 'border-slate-200 dark:border-gray-800 hover:bg-slate-50 dark:hover:bg-gray-800 text-slate-700 dark:text-gray-300'
                  }`}
                >
                  <div className="font-bold text-base">Serifada</div>
                  <div className="text-xs opacity-75">Tradicional litúrgica</div>
                </button>

                <button
                  onClick={() => setFontFamily('sans')}
                  className={`p-3 rounded-xl border text-left font-sans transition ${
                    fontFamily === 'sans'
                      ? 'border-red-600 bg-red-50 text-red-700 dark:border-red-500 dark:bg-red-950/40 dark:text-red-300 theme-sepia:border-[#9e2a2b] theme-sepia:bg-[#ebdcc2] theme-sepia:text-[#4a3818]'
                      : 'border-slate-200 dark:border-gray-800 hover:bg-slate-50 dark:hover:bg-gray-800 text-slate-700 dark:text-gray-300'
                  }`}
                >
                  <div className="font-bold text-base">Sem Serifa</div>
                  <div className="text-xs opacity-75">Moderna e limpa</div>
                </button>
              </div>
            </div>

            {/* Alinhamento */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-gray-400 theme-sepia:text-[#5e5045] block mb-3">
                Alinhamento do Texto
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setTextAlign('justify')}
                  className={`flex items-center gap-2 p-3 rounded-xl border text-sm font-medium transition ${
                    textAlign === 'justify'
                      ? 'border-red-600 bg-red-50 text-red-700 dark:border-red-500 dark:bg-red-950/40 dark:text-red-300 theme-sepia:border-[#9e2a2b] theme-sepia:bg-[#ebdcc2] theme-sepia:text-[#4a3818]'
                      : 'border-slate-200 dark:border-gray-800 hover:bg-slate-50 dark:hover:bg-gray-800 text-slate-700 dark:text-gray-300'
                  }`}
                >
                  <AlignJustify className="w-4 h-4" />
                  <span>Justificado</span>
                </button>

                <button
                  onClick={() => setTextAlign('left')}
                  className={`flex items-center gap-2 p-3 rounded-xl border text-sm font-medium transition ${
                    textAlign === 'left'
                      ? 'border-red-600 bg-red-50 text-red-700 dark:border-red-500 dark:bg-red-950/40 dark:text-red-300 theme-sepia:border-[#9e2a2b] theme-sepia:bg-[#ebdcc2] theme-sepia:text-[#4a3818]'
                      : 'border-slate-200 dark:border-gray-800 hover:bg-slate-50 dark:hover:bg-gray-800 text-slate-700 dark:text-gray-300'
                  }`}
                >
                  <AlignLeft className="w-4 h-4" />
                  <span>À Esquerda</span>
                </button>
              </div>
            </div>

            {/* Destaque das Respostas */}
            <div className="pt-2 border-t border-slate-200 dark:border-gray-800 theme-sepia:border-[#dec8a7]">
              <label className="flex items-center justify-between cursor-pointer py-1">
                <div>
                  <div className="text-sm font-medium text-slate-900 dark:text-white theme-sepia:text-[#2d241e]">
                    Destacar Respostas (T:)
                  </div>
                  <div className="text-xs text-slate-500 dark:text-gray-400">
                    Realça as respostas da assembleia com destaque visual
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={highlightAssembly}
                  onChange={(e) => setHighlightAssembly(e.target.checked)}
                  className="w-5 h-5 accent-red-600 rounded cursor-pointer"
                />
              </label>
            </div>

            {/* Prévia */}
            <div className="p-4 rounded-xl border border-dashed border-slate-300 dark:border-gray-700 theme-sepia:border-[#dec8a7] bg-slate-50/50 dark:bg-gray-800/40">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Prévia do Texto
              </div>
              <div
                style={{
                  fontSize: `${fontSize}px`,
                  textAlign: textAlign,
                  fontFamily: fontFamily === 'serif' ? 'Georgia, serif' : 'system-ui, sans-serif',
                }}
                className="space-y-2 leading-relaxed"
              >
                <p className="text-slate-800 dark:text-gray-200 theme-sepia:text-[#2d241e]">
                  <strong className="text-red-700 dark:text-red-400 theme-sepia:text-[#9e2a2b]">PE:</strong> O Senhor esteja convosco.
                </p>
                <p
                  className={
                    highlightAssembly
                      ? 'p-2 rounded-lg bg-amber-50 dark:bg-amber-950/40 theme-sepia:bg-[#ebdcc2] text-amber-900 dark:text-amber-200 theme-sepia:text-[#4a3818] font-medium'
                      : 'text-slate-800 dark:text-gray-200 theme-sepia:text-[#2d241e]'
                  }
                >
                  <strong>T:</strong> Ele está no meio de nós.
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-slate-200 dark:border-gray-800 theme-sepia:border-[#dec8a7] bg-slate-50 dark:bg-gray-900 theme-sepia:bg-[#fbf7ee]">
            <button
              onClick={onClose}
              className="w-full py-3 bg-red-700 hover:bg-red-800 dark:bg-red-600 dark:hover:bg-red-700 text-white font-medium rounded-xl shadow-sm transition"
            >
              Concluído
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
