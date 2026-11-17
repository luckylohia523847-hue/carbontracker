const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export async function fetchDashboard() {
  const response = await fetch(`${API_URL}/api/dashboard/overview`, { cache: 'no-store' });
  if (!response.ok) throw new Error('Failed to fetch dashboard data');
  return response.json();
}

export async function fetchFactories() {
  const response = await fetch(`${API_URL}/api/factories`, { cache: 'no-store' });
  if (!response.ok) throw new Error('Failed to fetch factories');
  return response.json();
}

export async function fetchReports() {
  const response = await fetch(`${API_URL}/api/reports/summary`, { cache: 'no-store' });
  if (!response.ok) throw new Error('Failed to fetch reports');
  return response.json();
}
