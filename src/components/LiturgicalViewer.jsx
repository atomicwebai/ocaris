import React, { useMemo } from 'react';
import { useSettings } from '../context/SettingsContext';

export default function LiturgicalViewer({ content }) {
  const { fontSize, fontFamily, textAlign, highlightAssembly } = useSettings();

  // Process raw html to enhance liturgical elements
  const processedHtml = useMemo(() => {
    if (!content) return '';

    let html = content;

    // 1. Replace <b>PE:</b> with styled badge/span
    html = html.replace(
      /<b>PE:<\/b>/gi,
      `<span class="inline-flex items-center text-red-700 dark:text-red-400 theme-sepia:text-[#9e2a2b] font-bold mr-1.5 tracking-wide">PE:</span>`
    );

    // 2. Replace <b>T:</b> and style Assembly responses
    if (highlightAssembly) {
      // In paragraph format
      html = html.replace(
        /<p([^>]*)>\s*<b>T:<\/b>([\s\S]*?)<\/p>/gi,
        `<p$1 class="my-3 px-3.5 py-2.5 rounded-xl border-l-4 border-amber-500 bg-amber-50/70 dark:bg-amber-950/30 theme-sepia:bg-[#ebdcc2]/60 dark:border-amber-400 theme-sepia:border-[#a67c00] text-amber-950 dark:text-amber-100 theme-sepia:text-[#4a3818] shadow-xs font-semibold"><span class="inline-flex items-center font-black mr-1.5 text-amber-700 dark:text-amber-300 theme-sepia:text-[#a67c00]">T:</span>$2</p>`
      );
      // Inline T:
      html = html.replace(
        /<b>T:<\/b>/gi,
        `<span class="inline-flex items-center text-amber-700 dark:text-amber-400 theme-sepia:text-[#a67c00] font-bold mr-1.5">T:</span>`
      );
    } else {
      html = html.replace(
        /<b>T:<\/b>/gi,
        `<span class="inline-flex items-center text-amber-800 dark:text-amber-400 theme-sepia:text-[#a67c00] font-bold mr-1.5">T:</span>`
      );
    }

    // 3. Highlight liturgical cross †
    html = html.replace(
      /†/g,
      `<span class="text-red-600 dark:text-red-400 theme-sepia:text-[#9e2a2b] font-bold text-lg inline-block mx-0.5" title="Sinal da Cruz">†</span>`
    );

    // 4. Style rubric notes in italics <i>
    html = html.replace(
      /<i>([\s\S]*?)<\/i>/gi,
      `<span class="block my-2 text-[0.9em] italic text-slate-500 dark:text-gray-400 theme-sepia:text-[#5e5045] font-normal leading-relaxed pl-2 border-l-2 border-slate-300 dark:border-gray-700 theme-sepia:border-[#dec8a7]">$1</span>`
    );

    // 5. Style Section Titles like "PREFÁCIO" or "Comunicantes próprios"
    html = html.replace(
      /<b>(PREFÁCIO|Comunicantes próprios|RITO DA COMUNHÃO|ORAÇÃO DO PAI-NOSSO|ORAÇÃO PELA PAZ|BENÇÃO FINAL[^<]*)<\/b>/gi,
      `<span class="block text-center font-bold tracking-wider uppercase text-red-700 dark:text-red-400 theme-sepia:text-[#9e2a2b] text-base md:text-lg my-6 pb-2 border-b border-dashed border-red-200 dark:border-red-900/50 theme-sepia:border-[#dec8a7]">$1</span>`
    );

    // 6. Clean horizontal dividers
    html = html.replace(
      /_{4,}/g,
      `<hr class="my-6 border-t border-dashed border-slate-300 dark:border-gray-700 theme-sepia:border-[#dec8a7]" />`
    );

    return html;
  }, [content, highlightAssembly]);

  return (
    <div
      className="liturgy-viewer select-text leading-relaxed tracking-normal transition-all duration-150"
      style={{
        fontSize: `${fontSize}px`,
        textAlign: textAlign,
        fontFamily: fontFamily === 'serif' ? 'Lora, Georgia, Cambria, serif' : 'Inter, system-ui, sans-serif',
      }}
      dangerouslySetInnerHTML={{ __html: processedHtml }}
    />
  );
}
