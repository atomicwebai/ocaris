import React, { useEffect, useMemo, useState } from 'react';
import { CalendarDays, BookOpen, ChevronLeft, ChevronRight, LoaderCircle } from 'lucide-react';

const sections = [
  { id: 'coleta', label: 'Oração da Coleta', group: 'oracoes' },
  { id: 'oferendas', label: 'Oração sobre as Oferendas', group: 'oracoes' },
  { id: 'comunhao', label: 'Oração após a Comunhão', group: 'oracoes' },
  { id: 'leituras', label: 'Leituras e salmo', group: 'leituras' },
  { id: 'evangelho', label: 'Evangelho', group: 'leituras' },
];

function localDateValue(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function formatDate(dateValue) {
  if (!dateValue) return '';
  return new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long', timeZone: 'UTC' })
    .format(new Date(`${dateValue}T12:00:00Z`));
}

function Reading({ title, items = [] }) {
  if (!items.length) return null;
  return items.map((reading, index) => (
    <section key={`${title}-${reading.referencia || index}`} className="space-y-2">
      <h3 className="text-lg font-serif font-bold text-red-800 dark:text-red-300 theme-sepia:text-[#9e2a2b]">{title}</h3>
      <p className="text-sm font-semibold text-slate-500 dark:text-gray-400 theme-sepia:text-[#5e5045]">
        {[reading.referencia, reading.titulo].filter(Boolean).join(' — ')}
      </p>
      {reading.refrao && <p className="font-semibold text-amber-800 dark:text-amber-300 theme-sepia:text-[#8a6500]">{reading.refrao}</p>}
      <p className="whitespace-pre-line leading-relaxed">{reading.texto}</p>
    </section>
  ));
}

export default function DailyLiturgyPage() {
  const [date, setDate] = useState(() => localDateValue(new Date()));
  const [liturgy, setLiturgy] = useState(null);
  const [activeSection, setActiveSection] = useState('coleta');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!date) return undefined;
    const [year, month, day] = date.split('-');
    const controller = new AbortController();
    setLoading(true);
    setError('');
    fetch(`https://liturgia.up.railway.app/v2/?dia=${Number(day)}&mes=${Number(month)}&ano=${Number(year)}`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error('Não foi possível consultar a liturgia desta data.');
        return response.json();
      })
      .then((result) => {
        if (!result || !result.liturgia) throw new Error('A API não retornou dados para esta data.');
        setLiturgy(result);
      })
      .catch((requestError) => {
        if (requestError.name !== 'AbortError') {
          setLiturgy(null);
          setError('Não foi possível carregar a liturgia. Verifique sua conexão e tente outra data.');
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [date]);

  const availableSections = useMemo(() => sections.filter((section) => {
    if (section.id === 'evangelho') return Boolean(liturgy?.leituras?.evangelho?.length);
    if (section.group === 'oracoes') return Boolean(liturgy?.oracoes?.[section.id]);
    const readings = liturgy?.leituras;
    return Boolean(readings?.primeiraLeitura?.length || readings?.segundaLeitura?.length || readings?.salmo?.length);
  }), [liturgy]);

  useEffect(() => {
    if (availableSections.length && !availableSections.some((section) => section.id === activeSection)) {
      setActiveSection(availableSections[0].id);
    }
  }, [availableSections, activeSection]);

  const shiftDate = (amount) => {
    const next = new Date(`${date}T12:00:00`);
    next.setDate(next.getDate() + amount);
    setDate(localDateValue(next));
  };

  const sectionTitle = sections.find((section) => section.id === activeSection)?.label;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      <header className="text-center space-y-2 py-3">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-red-700 text-white shadow-sm"><BookOpen className="w-6 h-6" /></div>
        <h1 className="text-3xl font-serif font-bold text-slate-900 dark:text-white theme-sepia:text-[#2d241e]">Liturgia do dia</h1>
        <p className="text-sm text-slate-600 dark:text-gray-400 theme-sepia:text-[#5e5045]">Orações e leituras da celebração por data.</p>
      </header>

      <section className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-gray-800/80 theme-sepia:bg-[#fbf7ee] border border-slate-200 dark:border-gray-700 theme-sepia:border-[#dec8a7] space-y-3">
        <label htmlFor="liturgy-date" className="block text-sm font-semibold text-slate-700 dark:text-gray-200 theme-sepia:text-[#4a3818]">Selecione a data</label>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => shiftDate(-1)} className="p-2.5 rounded-xl border border-slate-200 dark:border-gray-700 theme-sepia:border-[#dec8a7] hover:bg-slate-50 dark:hover:bg-gray-700" aria-label="Dia anterior"><ChevronLeft className="w-5 h-5" /></button>
          <div className="relative flex-1">
            <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
            <input id="liturgy-date" type="date" value={date} onChange={(event) => setDate(event.target.value)} className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-white dark:bg-gray-900 theme-sepia:bg-[#fbf7ee] border border-slate-200 dark:border-gray-700 theme-sepia:border-[#dec8a7] text-slate-900 dark:text-white theme-sepia:text-[#2d241e] focus:outline-none focus:ring-2 focus:ring-red-600" />
          </div>
          <button type="button" onClick={() => shiftDate(1)} className="p-2.5 rounded-xl border border-slate-200 dark:border-gray-700 theme-sepia:border-[#dec8a7] hover:bg-slate-50 dark:hover:bg-gray-700" aria-label="Próximo dia"><ChevronRight className="w-5 h-5" /></button>
        </div>
      </section>

      {loading ? (
        <div className="flex items-center justify-center gap-2 py-16 text-slate-500 dark:text-gray-400"><LoaderCircle className="w-5 h-5 animate-spin" /> Carregando liturgia...</div>
      ) : error ? (
        <div role="alert" className="p-5 rounded-2xl border border-red-200 bg-red-50 text-red-800 dark:border-red-900 dark:bg-red-950/30 dark:text-red-200">{error}</div>
      ) : liturgy && (
        <>
          <section className="p-5 rounded-2xl bg-gradient-to-r from-red-800 to-red-950 text-white shadow-sm">
            <p className="text-xs uppercase tracking-wider font-bold text-red-200">{formatDate(date)}{liturgy.cor ? ` • ${liturgy.cor}` : ''}</p>
            <h2 className="mt-1 text-xl sm:text-2xl font-serif font-bold">{liturgy.liturgia}</h2>
          </section>

          <nav aria-label="Conteúdo da liturgia" className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
            {availableSections.map((section) => (
              <button key={section.id} type="button" onClick={() => setActiveSection(section.id)} className={`px-3.5 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition ${activeSection === section.id ? 'bg-red-700 text-white shadow-sm' : 'bg-white dark:bg-gray-800/80 theme-sepia:bg-[#fbf7ee] text-slate-700 dark:text-gray-300 theme-sepia:text-[#4a3818] border border-slate-200 dark:border-gray-700 theme-sepia:border-[#dec8a7]'}`}>
                {section.label}
              </button>
            ))}
          </nav>

          <article className="p-5 sm:p-8 rounded-3xl bg-white dark:bg-gray-900 theme-sepia:bg-[#fbf7ee] border border-slate-200/80 dark:border-gray-800 theme-sepia:border-[#dec8a7] shadow-xs space-y-5">
            <h2 className="text-xl font-serif font-bold text-slate-900 dark:text-white theme-sepia:text-[#2d241e]">{sectionTitle}</h2>
            {activeSection === 'coleta' && <p className="whitespace-pre-line leading-relaxed">{liturgy.oracoes?.coleta}</p>}
            {activeSection === 'oferendas' && <p className="whitespace-pre-line leading-relaxed">{liturgy.oracoes?.oferendas}</p>}
            {activeSection === 'comunhao' && <p className="whitespace-pre-line leading-relaxed">{liturgy.oracoes?.comunhao}</p>}
            {activeSection === 'leituras' && <div className="space-y-7 text-slate-800 dark:text-gray-200 theme-sepia:text-[#2d241e]">
              <Reading title="Primeira leitura" items={liturgy.leituras?.primeiraLeitura} />
              <Reading title="Salmo" items={liturgy.leituras?.salmo} />
              <Reading title="Segunda leitura" items={liturgy.leituras?.segundaLeitura} />
              {!liturgy.leituras?.primeiraLeitura?.length && !liturgy.leituras?.salmo?.length && !liturgy.leituras?.segundaLeitura?.length && <p>Não há leituras disponíveis para esta data.</p>}
            </div>}
            {activeSection === 'evangelho' && <div className="space-y-7 text-slate-800 dark:text-gray-200 theme-sepia:text-[#2d241e]"><Reading title="Evangelho" items={liturgy.leituras?.evangelho} /></div>}
          </article>
        </>
      )}
    </div>
  );
}
