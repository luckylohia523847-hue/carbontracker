"use client";

import { useEffect, useState } from 'react';
import { Area, Bar, CartesianGrid, ComposedChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis, BarChart } from 'recharts';
import { Activity, ArrowDownRight, ArrowUpRight, Factory, Leaf, Sparkles, Zap } from 'lucide-react';
import { fetchDashboard } from '../lib/api';

const statCards = [
  { label: 'Total emissions', value: '248.4 tCO₂e', delta: '-18.2%', tone: 'up', icon: Leaf },
  { label: 'Electricity usage', value: '105,600 kWh', delta: '+4.8%', tone: 'down', icon: Zap },
  { label: 'Fuel consumption', value: '42,250 L', delta: '-7.1%', tone: 'up', icon: Activity },
  { label: 'Renewable share', value: '34.6%', delta: '+6.4%', tone: 'up', icon: Sparkles },
];

export default function Page() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetchDashboard().then(setData).catch(() => {
      setData({
        total_emissions_tco2e: 248.4,
        electricity_kwh: 105600,
        fuel_liters: 42250,
        water_liters: 485000,
        waste_kg: 68000,
        renewable_share_pct: 34.6,
        reduction_vs_last_year_pct: 18.2,
        monthly_trend: [
          { month: 'Jan', emissions: 28.5, target: 24.0 },
          { month: 'Feb', emissions: 27.1, target: 23.5 },
          { month: 'Mar', emissions: 25.9, target: 23.0 },
          { month: 'Apr', emissions: 24.5, target: 22.8 },
          { month: 'May', emissions: 23.4, target: 22.0 },
          { month: 'Jun', emissions: 22.8, target: 21.8 },
          { month: 'Jul', emissions: 21.3, target: 21.1 },
        ],
        process_breakdown: [
          { name: 'Boiler', value: 32 },
          { name: 'Machinery', value: 26 },
          { name: 'Logistics', value: 18 },
          { name: 'Waste', value: 15 },
          { name: 'Lighting', value: 9 },
        ],
        recommendations: [
          { title: 'LED lighting retrofit', impact: '12.5 tCO₂e', savings: '₹ 3.2L' },
          { title: 'Rooftop solar feasibility', impact: '18.1 tCO₂e', savings: '₹ 5.6L' },
          { title: 'Route optimization', impact: '6.9 tCO₂e', savings: '₹ 2.1L' },
        ],
        factories: [
          { name: 'Plant A', location: 'Pune', emissions: '132.4 tCO₂e', status: 'Below target' },
          { name: 'Plant B', location: 'Ahmednagar', emissions: '116.1 tCO₂e', status: 'Improving' },
          { name: 'Plant C', location: 'Nagpur', emissions: '151.7 tCO₂e', status: 'Watchlist' },
        ],
      });
    });
  }, []);

  if (!data) {
    return <div className="min-h-screen bg-carbon-900 p-10 text-white">Loading dashboard…</div>;
  }

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">
      <div className="mx-auto max-w-7xl p-6 lg:p-8">
        <header className="mb-8 flex flex-col gap-4 rounded-2xl bg-carbon-900 p-6 text-white shadow-soft lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-carbon-200">Industrial emissions intelligence</p>
            <h1 className="mt-2 text-3xl font-semibold">CarbonTrack</h1>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-2">
            <Factory className="h-5 w-5 text-carbon-200" />
            <div>
              <div className="text-xs text-carbon-200">Location</div>
              <div className="font-medium">Northstar Manufacturing Group</div>
            </div>
          </div>
        </header>

        <section className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {statCards.map(({ label, value, delta, tone, icon: Icon }) => (
            <div key={label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm text-slate-500">{label}</span>
                <div className="rounded-lg bg-carbon-50 p-2 text-carbon-700">
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <div className="flex items-end justify-between gap-3">
                <div className="text-2xl font-bold">{value}</div>
                <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${tone === 'up' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                  {tone === 'up' ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />} {delta}
                </span>
              </div>
            </div>
          ))}
        </section>

        <section className="mb-8 grid gap-6 xl:grid-cols-[1.6fr_1fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Emission trend</h2>
              <span className="rounded-full bg-carbon-50 px-2 py-1 text-xs text-carbon-700">Target tracking</span>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={data.monthly_trend}>
                  <defs>
                    <linearGradient id="co2Area" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="5%" stopColor="#3da267" stopOpacity={0.7} />
                      <stop offset="95%" stopColor="#3da267" stopOpacity={0.08} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} />
                  <Tooltip />
                  <Area type="monotone" dataKey="emissions" stroke="#3da267" fill="url(#co2Area)" strokeWidth={3} />
                  <Line type="monotone" dataKey="target" stroke="#94a3b8" strokeDasharray="5 5" dot={false} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold">Operational snapshot</h2>
            <div className="space-y-5">
              <div>
                <div className="mb-2 flex items-center justify-between text-sm text-slate-600">
                  <span>Water intensity</span>
                  <span>68%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-200">
                  <div className="h-2 w-[68%] rounded-full bg-sky-500" />
                </div>
              </div>
              <div>
                <div className="mb-2 flex items-center justify-between text-sm text-slate-600">
                  <span>Waste diversion</span>
                  <span>52%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-200">
                  <div className="h-2 w-[52%] rounded-full bg-emerald-500" />
                </div>
              </div>
              <div>
                <div className="mb-2 flex items-center justify-between text-sm text-slate-600">
                  <span>Renewable adoption</span>
                  <span>34.6%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-200">
                  <div className="h-2 w-[34.6%] rounded-full bg-violet-500" />
                </div>
              </div>
              <div className="rounded-xl bg-slate-50 p-4">
                <div className="mb-1 text-xs uppercase tracking-[0.2em] text-slate-500">Reduction vs last year</div>
                <div className="text-3xl font-bold text-carbon-700">18.2%</div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold">Emission sources</h2>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.process_breakdown}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#1f5135" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold">Recommended actions</h2>
            <div className="space-y-4">
              {data.recommendations.map((item: any) => (
                <div key={item.title} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="font-medium text-slate-900">{item.title}</div>
                    <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-700">High priority</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-sm text-slate-600">
                    <span>Estimated reduction</span>
                    <span className="font-semibold text-carbon-700">{item.impact}</span>
                  </div>
                  <div className="mt-1 flex items-center justify-between text-sm text-slate-600">
                    <span>Estimated savings</span>
                    <span className="font-semibold text-carbon-700">{item.savings}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-2 text-xs uppercase tracking-[0.2em] text-slate-500">Electricity</div>
            <div className="text-2xl font-bold">105,600 kWh</div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-2 text-xs uppercase tracking-[0.2em] text-slate-500">Water</div>
            <div className="text-2xl font-bold">485,000 L</div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-2 text-xs uppercase tracking-[0.2em] text-slate-500">Waste</div>
            <div className="text-2xl font-bold">68,000 kg</div>
          </div>
        </section>
      </div>
    </main>
  );
}
