const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export async function fetchDashboard() {
  const response = await fetch(`${API_URL}/api/dashboard/overview`, { cache: 'no-store' });
  if (!response.ok) {
    throw new Error('Failed to fetch dashboard data');
  }
  return response.json();
}
