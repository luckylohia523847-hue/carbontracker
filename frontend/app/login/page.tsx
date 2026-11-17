"use client";

import { useState } from 'react';

export default function LoginPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <main className="mx-auto flex min-h-[calc(100vh-72px)] max-w-6xl items-center justify-center p-8">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft lg:grid-cols-2">
        <div className="bg-carbon-900 p-10 text-white">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-carbon-200">CarbonTrack</p>
          <h1 className="text-4xl font-semibold">Industrial sustainability, in one command center.</h1>
          <p className="mt-6 text-carbon-100">
            Monitor factory performance, reduce energy waste, and align operations with net-zero goals.
          </p>
        </div>

        <div className="p-10">
          <h2 className="text-2xl font-semibold">Sign in</h2>
          <p className="mt-2 text-sm text-slate-500">Demo access for management, admin, and plant users.</p>

          <form
            className="mt-8 space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
          >
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
              <input defaultValue="admin@northstar.example" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 outline-none focus:border-carbon-500" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Password</label>
              <input type="password" defaultValue="demo123" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 outline-none focus:border-carbon-500" />
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-slate-600"><input type="checkbox" /> Remember me</label>
              <a href="#" className="text-carbon-700">Forgot password?</a>
            </div>
            <button type="submit" className="w-full rounded-xl bg-carbon-700 px-4 py-3 font-medium text-white">Sign in</button>
          </form>

          {submitted && (
            <div className="mt-5 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-800">
              Demo login accepted. Redirecting to dashboard...
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
