import './globals.css';
import Link from 'next/link';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-slate-100 text-slate-900">
          <nav className="border-b border-slate-200 bg-white/90 backdrop-blur">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
              <Link href="/" className="text-xl font-bold text-carbon-800">CarbonTrack</Link>
              <div className="flex gap-4 text-sm font-medium text-slate-600">
                <Link href="/" className="hover:text-carbon-700">Dashboard</Link>
                <Link href="/factories" className="hover:text-carbon-700">Factories</Link>
                <Link href="/consumption" className="hover:text-carbon-700">Consumption</Link>
              </div>
            </div>
          </nav>
          {children}
        </div>
      </body>
    </html>
  );
}
