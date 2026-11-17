"use client";

import { useEffect, useState } from 'react';
import { fetchFactories } from '../../lib/api';

export default function FactoriesPage() {
  const [factories, setFactories] = useState<any[]>([]);

  useEffect(() => {
    fetchFactories().then(setFactories).catch(() => {
      setFactories([
        { id: 1, name: 'Plant A', location: 'Pune, Maharashtra', industry: 'Textiles', company_id: 1 },
        { id: 2, name: 'Plant B', location: 'Ahmednagar, Maharashtra', industry: 'FMCG', company_id: 1 },
      ]);
    });
  }, []);

  return (
    <main className="mx-auto max-w-6xl p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-carbon-700">Operations</p>
          <h1 className="mt-2 text-3xl font-bold">Factory portfolio</h1>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {factories.map((factory) => (
          <div key={factory.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <div className="text-sm text-slate-500">Factory</div>
                <div className="text-xl font-semibold">{factory.name}</div>
              </div>
              <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-700">Active</span>
            </div>
            <div className="space-y-2 text-sm text-slate-600">
              <div><span className="font-medium text-slate-800">Location:</span> {factory.location}</div>
              <div><span className="font-medium text-slate-800">Industry:</span> {factory.industry}</div>
              <div><span className="font-medium text-slate-800">Emissions:</span> 132.4 tCO₂e</div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
