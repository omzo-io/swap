import { useState, useEffect } from 'react';
import { UserStats, UserAchievement } from '../types/types';

interface UseUserStatsWithAchievementsReturn {
  stats: UserStats | null;
  achievements: UserAchievement[];
  totalPoints: number;
  achievementsCount: number;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useUserStatsWithAchievements = (walletAddress: string | null): UseUserStatsWithAchievementsReturn => {
  const [stats, setStats] = useState<UserStats | null>(null);
  const [achievements, setAchievements] = useState<UserAchievement[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    if (!walletAddress) {
      setStats(null);
      setAchievements([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Use the new combined API endpoint
      const response = await fetch(`/api/user-stats-with-achievements/${walletAddress}`);
      const data = await response.json();

      if (data.success) {
        setStats(data.data.stats);
        setAchievements(data.data.achievements);
      } else {
        setError(data.error || 'Failed to fetch user data');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch user data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [walletAddress]);

  // Calculate total points from achievements
  const totalPoints = achievements.reduce((sum, achievement) => sum + achievement.points_rewarded, 0);
  const achievementsCount = achievements.length;

  return {
    stats,
    achievements,
    totalPoints,
    achievementsCount,
    loading,
    error,
    refetch: fetchData
  };
};