import { useState, useEffect } from 'react';
import { GlobalStats } from '../types/types';

interface UseGlobalStatsReturn {
  stats: GlobalStats | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useGlobalStats = (): UseGlobalStatsReturn => {
  const [stats, setStats] = useState<GlobalStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/global-stats');
      const data = await response.json();

      if (data.success) {
        setStats(data.data);
      } else {
        setError(data.error || 'Failed to fetch global stats');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch global stats');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return { stats, loading, error, refetch: fetchStats };
};