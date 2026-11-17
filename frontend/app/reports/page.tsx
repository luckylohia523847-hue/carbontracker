"use client";

import { useEffect, useState } from 'react';

export default function ReportsPage() {
  const [report, setReport] = useState<any>(null);

  useEffect(() => {
    fetch('http://localhost:8000/api/reports/summary', { cache: 'no-store' })
      .then((res) => res.json())
      .then(setReport)
      .catch(() => {
        setReport({
          year: 2026,
          organisation: 'Northstar Industries',
          total_annual_co2e_tonnes: 248.4,
          scope_1: 113.2,
          scope_2: 76.1,
          scope_3: 59.1,
          energy_consumption_kwh: 105600,
          water_consumption_liters: 485000,
          waste_generated_kg: 68000,
          recommendations_count: 5,
          target_progress_pct: 74,
          summary: 'The organisation is trending below its quarterly reduction target and has strong opportunities in lighting and solar adoption.',
        });
      });
  }, []);

  if (!report) return <div className="p-10 text-slate-600">Loading report…</div>;

  return (
    <main className="mx-auto max-w-6xl p-8">
      <div className="mb-8">
        <p className="text-sm uppercase tracking-[0.25em] text-carbon-700">Reporting</p>
        <h1 className="mt-2 text-3xl font-bold">Sustainability summary</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="text-sm text-slate-500">Total annual CO₂e</div><div className="mt-2 text-3xl font-bold">{report.total_annual_co2e_tonnes} t</div></div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="text-sm text-slate-500">Scope 1</div><div className="mt-2 text-3xl font-bold">{report.scope_1} t</div></div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="text-sm text-slate-500">Scope 2</div><div className="mt-2 text-3xl font-bold">{report.scope_2} t</div></div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="text-sm text-slate-500">Target progress</div><div className="mt-2 text-3xl font-bold">{report.target_progress_pct}%</div></div>
      </div>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Executive summary</h2>
          <button className="rounded-xl bg-carbon-700 px-4 py-2 font-medium text-white">Download report</button>
        </div>
        <p className="mt-4 text-slate-600">{report.summary}</p>

        <div className="mt-6 grid gap-4 md:grid-cols-3 text-sm text-slate-600">
          <div className="rounded-xl bg-slate-50 p-4"><div className="text-slate-500">Energy consumption</div><div className="mt-2 text-xl font-bold text-slate-900">{report.energy_consumption_kwh.toLocaleString()} kWh</div></div>
          <div className="rounded-xl bg-slate-50 p-4"><div className="text-slate-500">Water consumption</div><div className="mt-2 text-xl font-bold text-slate-900">{report.water_consumption_liters.toLocaleString()} L</div></div>
          <div className="rounded-xl bg-slate-50 p-4"><div className="text-slate-500">Waste generated</div><div className="mt-2 text-xl font-bold text-slate-900">{report.waste_generated_kg.toLocaleString()} kg</div></div>
        </div>
      </div>
    </main>
  );
}
