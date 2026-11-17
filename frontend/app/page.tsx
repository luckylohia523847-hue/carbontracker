"use client";

export default function ConsumptionPage() {
  return (
    <main className="mx-auto max-w-5xl p-8">
      <div className="mb-6">
        <p className="text-sm uppercase tracking-[0.25em] text-carbon-700">Data intake</p>
        <h1 className="mt-2 text-3xl font-bold">Consumption entry</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <form className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Factory</label>
              <select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 outline-none focus:border-carbon-500">
                <option>Plant A</option>
                <option>Plant B</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Period</label>
              <input type="month" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 outline-none focus:border-carbon-500" defaultValue="2026-06" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Electricity (kWh)</label>
              <input type="number" defaultValue={15600} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 outline-none focus:border-carbon-500" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Diesel (L)</label>
              <input type="number" defaultValue={1800} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 outline-none focus:border-carbon-500" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Water (L)</label>
              <input type="number" defaultValue={62000} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 outline-none focus:border-carbon-500" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Waste (kg)</label>
              <input type="number" defaultValue={8400} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 outline-none focus:border-carbon-500" />
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <button className="rounded-xl bg-carbon-700 px-4 py-2 font-medium text-white">Save record</button>
            <button type="button" className="rounded-xl border border-slate-200 bg-white px-4 py-2 font-medium text-slate-700">Upload CSV</button>
          </div>
        </form>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold">Upload & integrations</h2>
          <ul className="space-y-3 text-sm text-slate-600">
            <li>• CSV upload for monthly utility records</li>
            <li>• Excel imports for production and logistics logs</li>
            <li>• Smart meter sync-ready on-premises integration layer</li>
            <li>• IoT-ready MQTT and sensor ingestion architecture</li>
            <li>• Source-aware emission factor dashboard</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
