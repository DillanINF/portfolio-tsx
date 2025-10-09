"use client";

import { useEffect, useState } from 'react';
import { m } from 'framer-motion';

type Day = {
  date: string;
  color: string; // GitHub already returns color hex
  contributionCount: number;
};

type Week = { contributionDays: Day[] };

type Calendar = {
  totalContributions: number;
  weeks: Week[];
};

export default function GithubContributions() {
  const [data, setData] = useState<Calendar | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const load = async (isManualRefresh = false) => {
    try {
      if (isManualRefresh) setRefreshing(true);
      setError(null);
      const res = await fetch('/api/github-contributions', { cache: 'no-store' });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || 'Gagal memuat');
      setData(json);
    } catch (e: any) {
      setError(e?.message ?? 'Gagal memuat');
    } finally {
      setLoading(false);
      if (isManualRefresh) setRefreshing(false);
    }
  };

  useEffect(() => {
    load();
    const id = setInterval(load, 1000 * 60 * 5); // refresh tiap 5 menit
    return () => clearInterval(id);
  }, []);
  if (error) return <div className="text-red-600 text-sm">Gagal memuat kontribusi GitHub: {error}</div>;
  if (loading || !data) return <div className="text-gray-600 text-sm">Memuat kontribusi...</div>;

  const weeks = data.weeks;
  const monthShort = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];
  const monthLabels = weeks.map((w, i) => {
    const firstDay = w.contributionDays[0];
    const prevFirst = i > 0 ? weeks[i - 1].contributionDays[0] : null;
    const m = new Date(firstDay.date).getMonth();
    const prevM = prevFirst ? new Date(prevFirst.date).getMonth() : -1;
    const label = i === 0 || m !== prevM ? monthShort[m] : '';
    return label;
  });
  // Render heatmap per-minggu (kolom), 7 baris (Mon..Sun)
  return (
    <div>
      <div className="flex items-center justify-center mb-3 gap-4 relative max-w-4xl mx-auto">
        <h4 className="font-semibold text-gray-900 text-center" style={{ fontFamily: 'var(--font-orbitron)' }}>
          Aktivitas GitHub ({data.totalContributions} kontribusi setahun terakhir)
        </h4>
        <button 
          onClick={() => load(true)} 
          disabled={refreshing}
          className={`p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-all ${
            refreshing ? 'animate-spin' : ''
          }`}
          title="Segarkan data"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/>
          </svg>
        </button>
      </div>
      <div className="overflow-x-auto">
        <div className="w-full flex justify-center">
          <div className="inline-block p-2 rounded-lg bg-white border border-gray-200 mx-auto">
            {/* Header bulan */}
            <div className="flex gap-1 mb-1">
              {monthLabels.map((label, i) => (
                <div key={`m-${i}`} className="w-2.5 text-[10px] leading-3 text-gray-500 text-center" title={label}>
                  {label ? label[0] : ''}
                </div>
              ))}
            </div>
            {/* Grid minggu x hari */}
            <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-1">
              {weeks.map((w, wi) => (
                <div key={`w-${wi}`} className="flex flex-col gap-1">
                  {w.contributionDays.map((d, di) => (
                    <div
                      key={d.date + di}
                      className="w-2.5 h-2.5 rounded-sm"
                      title={`${d.date}: ${d.contributionCount} kontribusi`}
                      style={{ backgroundColor: d.color }}
                    />
                  ))}
                </div>
              ))}
            </m.div>
          </div>
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-2 text-center">Data real-time dari GitHub GraphQL. Auto-refresh setiap 5 menit atau tekan Segarkan.</p>
    </div>
  );
}
