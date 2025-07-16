'use client';

import { useAccount } from 'wagmi';
import { css } from '~/styled-system/css';
import { VStack, HStack } from '~/styled-system/jsx';
import { useUserStatsWithAchievements } from '@/features/rune-rush/api/useUserStatsWithAchievements';
import { useLeaderboard } from '@/features/rune-rush/api/useLeaderboard';
import { useGlobalStats } from '@/features/rune-rush/api/useGlobalStats';
import { TournamentTable } from '@/features/rune-rush/ui/TournamentTable';
import { UserStatsCard } from '@/features/rune-rush/ui/UserStatsCard';
import { AchievementCard } from '@/features/rune-rush/ui/AchievementCard';
import { GlobalStatsCard } from '@/features/rune-rush/ui/GlobalStatsCard';
import { TasksList } from '@/features/rune-rush/ui/TasksList';
import { RewardsCard } from '@/features/rune-rush/ui/RewardsCard';
import { TwitterFollowCard } from '@/features/rune-rush/ui/TwitterFollowCard';
import { Trophy, Star, TrendingUp } from 'lucide-react';

export default function RunRushPage() {
  const { address } = useAccount();

  const {
    stats: userStats,
    achievements,
    totalPoints,
    achievementsCount,
    loading: userStatsLoading,
    error: userStatsError
  } = useUserStatsWithAchievements(address || null);
  const { leaderboard, loading: leaderboardLoading, error: leaderboardError } = useLeaderboard(100);
  const { stats: globalStats, loading: globalStatsLoading, error: globalStatsError } = useGlobalStats();

  return (
    <VStack gap="24px" className={css({
      width: '100%',
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '20px 12px',
      display: 'flex',
      alignItems: 'center',
      minHeight: '100vh',
      '@media (min-width: 768px)': {
        padding: '40px 20px',
        gap: '32px',
      },
    })}>
      {/* Header */}
      <div className={css({
        textAlign: 'center',
        marginBottom: '16px',
        width: '100%',
        padding: '0 8px',
      })}>
        <HStack gap="8px" alignItems="center" justifyContent="center" marginBottom="12px" flexWrap="wrap">
          <div className={css({
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            '@media (min-width: 768px)': {
              width: '48px',
              height: '48px',
            },
          })}>
            <Trophy className={css({
              color: 'white',
              width: '20px',
              height: '20px',
              '@media (min-width: 768px)': {
                width: '24px',
                height: '24px',
              },
            })} />
          </div>
          <h1 className={css({
            fontSize: '24px',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            backgroundClip: 'text',
            color: 'transparent',
            margin: 0,
            lineHeight: '1.2',
            '@media (min-width: 768px)': {
              fontSize: '36px',
            },
          })}>
            Rune Rush Tournament
          </h1>
        </HStack>
        <p className={css({
          fontSize: '14px',
          color: 'gray.400',
          maxWidth: '600px',
          margin: '0 auto',
          lineHeight: '1.5',
          padding: '0 8px',
          '@media (min-width: 768px)': {
            fontSize: '18px',
          },
        })}>
          Complete tasks and earn achievements to climb the leaderboard.
          Your Omzo Points are calculated from achievements only - complete more tasks to earn more points!
        </p>
      </div>

      {/* Global Stats */}
      <div className={css({
        width: '100%',
        padding: '0 8px',
      })}>
        <GlobalStatsCard
          stats={globalStats}
          loading={globalStatsLoading}
          error={globalStatsError}
        />
      </div>

      {/* User Stats (if connected) */}
      {address && userStats && (
        <div className={css({
          width: '100%',
          padding: '0 8px',
        })}>
          <UserStatsCard
            stats={userStats}
            totalPoints={totalPoints}
            achievementsCount={achievementsCount}
            loading={userStatsLoading}
            error={userStatsError}
          />
        </div>
      )}

      {/* Twitter Follow Card (if connected)
      {address && (
        <TwitterFollowCard
          walletAddress={address}
          onFollowVerified={() => {
            // Refresh user stats after Twitter follow verification
            // This will trigger a refetch of achievements and stats
            window.location.reload();
          }}
        />
      )} */}

      {/* Tasks List */}
      <div className={css({
        width: '100%',
        padding: '0 8px',
      })}>
        <TasksList
          userAchievements={achievements}
          walletAddress={address}
        />
      </div>

      {/* Rewards Information */}
      <div className={css({
        width: '100%',
        padding: '0 8px',
      })}>
        <RewardsCard />
      </div>

      {/* Tournament Table */}
      <div className={css({
        width: '100%',
        padding: '0 8px',
      })}>
        <TournamentTable
          leaderboard={leaderboard}
          loading={leaderboardLoading}
          error={leaderboardError}
          currentUserAddress={address}
        />
      </div>

      {/* User Achievements (if connected) */}
      {address && achievements.length > 0 && (
        <VStack gap="20px" className={css({
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          alignItems: 'center',
          padding: '0 8px',
        })}>
          <HStack gap="8px" alignItems="center">
            <div className={css({
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 215, 0, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              '@media (min-width: 768px)': {
                width: '32px',
                height: '32px',
              },
            })}>
              <Star className={css({
                color: 'yellow.400',
                width: '14px',
                height: '14px',
                '@media (min-width: 768px)': {
                  width: '16px',
                  height: '16px',
                },
              })} />
            </div>
            <h2 className={css({
              fontSize: '20px',
              fontWeight: 'bold',
              color: 'white',
              margin: 0,
              '@media (min-width: 768px)': {
                fontSize: '24px',
              },
            })}>
              Your Achievements
            </h2>
          </HStack>

          <div className={css({
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '12px',
            width: '100%',
            justifyContent: 'center',
            '@media (min-width: 480px)': {
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '16px',
            },
            '@media (min-width: 768px)': {
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            },
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
          padding: '24px 16px',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          margin: '0 8px',
          '@media (min-width: 768px)': {
            padding: '40px',
          },
        })}>
          <div className={css({
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            backgroundColor: 'rgba(102, 126, 234, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 12px',
            '@media (min-width: 768px)': {
              width: '64px',
              height: '64px',
              marginBottom: '16px',
            },
          })}>
            <TrendingUp className={css({
              color: 'blue.300',
              width: '24px',
              height: '24px',
              '@media (min-width: 768px)': {
                width: '32px',
                height: '32px',
              },
            })} />
          </div>
          <h3 className={css({
            fontSize: '18px',
            fontWeight: 'bold',
            color: 'white',
            marginBottom: '8px',
            '@media (min-width: 768px)': {
              fontSize: '20px',
            },
          })}>
            Connect Your Wallet
          </h3>
          <p className={css({
            fontSize: '14px',
            color: 'gray.400',
            maxWidth: '400px',
            margin: '0 auto',
            lineHeight: '1.5',
            '@media (min-width: 768px)': {
              fontSize: '16px',
            },
          })}>
            Connect your wallet to view your personal statistics, achievements, and track your progress in the tournament.
          </p>
        </div>
      )}
    </VStack>
  );
}