import { useState, useEffect } from 'react';
import { UserAchievement } from '../types/types';

interface UseUserAchievementsReturn {
  achievements: UserAchievement[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useUserAchievements = (walletAddress: string | null): UseUserAchievementsReturn => {
  const [achievements, setAchievements] = useState<UserAchievement[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAchievements = async () => {
    if (!walletAddress) {
      setAchievements([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/achievements/${walletAddress}`);
      const data = await response.json();

      if (data.success) {
        setAchievements(data.data);
      } else {
        setError(data.error || 'Failed to fetch user achievements');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch user achievements');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAchievements();
  }, [walletAddress]);

  return { achievements, loading, error, refetch: fetchAchievements };
};