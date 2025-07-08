import { useState, useEffect } from 'react';
import { LeaderboardEntry } from '../types/types';

interface UseLeaderboardReturn {
  leaderboard: LeaderboardEntry[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useLeaderboard = (limit: number = 100): UseLeaderboardReturn => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLeaderboard = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/leaderboard?limit=${limit}`);
      const data = await response.json();

      if (data.success) {
        setLeaderboard(data.data);
      } else {
        setError(data.error || 'Failed to fetch leaderboard');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch leaderboard');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, [limit]);

  return { leaderboard, loading, error, refetch: fetchLeaderboard };
};