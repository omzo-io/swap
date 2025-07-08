'use client';

import { useAccount } from 'wagmi';
import { css } from '~/styled-system/css';
import { VStack, HStack } from '~/styled-system/jsx';
import { useUserStats } from '@/features/rune-rush/api/useUserStats';
import { useUserAchievements } from '@/features/rune-rush/api/useUserAchievements';
import { useLeaderboard } from '@/features/rune-rush/api/useLeaderboard';
import { useGlobalStats } from '@/features/rune-rush/api/useGlobalStats';
import { TournamentTable } from '@/features/rune-rush/ui/TournamentTable';
import { UserStatsCard } from '@/features/rune-rush/ui/UserStatsCard';
import { AchievementCard } from '@/features/rune-rush/ui/AchievementCard';
import { GlobalStatsCard } from '@/features/rune-rush/ui/GlobalStatsCard';
import { TasksList } from '@/features/rune-rush/ui/TasksList';
import { Trophy, Star, TrendingUp } from 'lucide-react';

export default function RunRushPage() {
  const { address } = useAccount();

  const { stats: userStats, loading: userStatsLoading, error: userStatsError } = useUserStats(address || null);
  const { achievements, loading: achievementsLoading, error: achievementsError } = useUserAchievements(address || null);
  const { leaderboard, loading: leaderboardLoading, error: leaderboardError } = useLeaderboard(100);
  const { stats: globalStats, loading: globalStatsLoading, error: globalStatsError } = useGlobalStats();

  return (
    <VStack gap="32px" className={css({
      width: '100%',
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '40px 20px',
      display: 'flex',
      alignItems: 'center',
    })}>
      {/* Header */}
      <div className={css({
        textAlign: 'center',
        marginBottom: '20px',
        width: '100%',
      })}>
        <HStack gap="12px" alignItems="center" justifyContent="center" marginBottom="16px">
          <div className={css({
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          })}>
            <Trophy className={css({ color: 'white', width: '24px', height: '24px' })} />
          </div>
          <h1 className={css({
            fontSize: '36px',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            backgroundClip: 'text',
            color: 'transparent',
            margin: 0,
          })}>
            Rune Rush Tournament
          </h1>
        </HStack>
        <p className={css({
          fontSize: '18px',
          color: 'gray.400',
          maxWidth: '600px',
          margin: '0 auto',
          lineHeight: '1.6',
        })}>
          Compete with other traders, earn achievements, and climb the leaderboard.
          Track your progress and unlock rewards as you swap and provide liquidity.
        </p>
      </div>

      {/* Global Stats */}
      <GlobalStatsCard
        stats={globalStats}
        loading={globalStatsLoading}
        error={globalStatsError}
      />

      {/* User Stats (if connected) */}
      {address && userStats && (
        <UserStatsCard
          stats={userStats}
          loading={userStatsLoading}
          error={userStatsError}
        />
      )}

            {/* Tasks List */}
      <TasksList
        userAchievements={achievements.map(a => a.achievement_type)}
      />

      {/* Tournament Table */}
      <TournamentTable
        leaderboard={leaderboard}
        loading={leaderboardLoading}
        error={leaderboardError}
        currentUserAddress={address}
      />

      {/* User Achievements (if connected) */}
      {address && achievements.length > 0 && (
        <VStack gap="24px" className={css({
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          alignItems: 'center',
        })}>
          <HStack gap="12px" alignItems="center">
            <div className={css({
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 215, 0, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            })}>
              <Star className={css({ color: 'yellow.400', width: '16px', height: '16px' })} />
            </div>
            <h2 className={css({
              fontSize: '24px',
              fontWeight: 'bold',
              color: 'white',
              margin: 0,
            })}>
              Your Achievements
            </h2>
          </HStack>

          <div className={css({
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '16px',
            width: '100%',
            justifyContent: 'center',
          })}>
            {achievements.map((achievement) => (
              <AchievementCard
                key={achievement.id}
                achievement={achievement}
              />
            ))}
          </div>
        </VStack>
      )}

      {/* Connect Wallet Prompt */}
      {!address && (
        <div className={css({
          textAlign: 'center',
          padding: '40px',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        })}>
          <div className={css({
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: 'rgba(102, 126, 234, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
          })}>
            <TrendingUp className={css({ color: 'blue.300', width: '32px', height: '32px' })} />
          </div>
          <h3 className={css({
            fontSize: '20px',
            fontWeight: 'bold',
            color: 'white',
            marginBottom: '8px',
          })}>
            Connect Your Wallet
          </h3>
          <p className={css({
            fontSize: '16px',
            color: 'gray.400',
            maxWidth: '400px',
            margin: '0 auto',
            lineHeight: '1.5',
          })}>
            Connect your wallet to view your personal statistics, achievements, and track your progress in the tournament.
          </p>
        </div>
      )}
    </VStack>
  );
}