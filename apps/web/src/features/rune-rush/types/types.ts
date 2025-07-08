export interface UserStats {
  wallet_address: string;
  total_swaps: number;
  total_liquidity_additions: number;
  total_pairs_created: number;
  total_usd_swapped: string;
  total_liquidity_provided_usd: string;
  first_swap_completed: boolean;
  first_swap_date: string;
  current_streak: number;
  longest_streak: number;
  omzo_points: number;
  created_at: string;
  updated_at: string;
}

export interface UserAchievement {
  id: string;
  wallet_address: string;
  achievement_type: string;
  title: string;
  description: string;
  points_rewarded: number;
  achieved_at: string;
}

export interface LeaderboardEntry {
  wallet_address: string;
  total_swaps: number;
  omzo_points: number;
  total_usd_swapped: string;
}

export interface GlobalStats {
  total_users: number;
  total_swaps: number;
  total_liquidity_usd: number;
  total_omzo_points: number;
}

export interface TournamentTableProps {
  leaderboard: LeaderboardEntry[];
  loading: boolean;
  error: string | null;
  currentUserAddress?: string | null;
}

export interface AchievementCardProps {
  achievement: UserAchievement;
}

export interface UserStatsCardProps {
  stats: UserStats;
  loading: boolean;
  error: string | null;
}