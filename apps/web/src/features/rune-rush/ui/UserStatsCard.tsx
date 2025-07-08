'use client';

import { UserStats } from '../types/types';
import { css } from '~/styled-system/css';
import { VStack, HStack } from '~/styled-system/jsx';
import { TrendingUp, Users, DollarSign, Target, Flame, Trophy } from 'lucide-react';

interface UserStatsCardProps {
  stats: UserStats;
  loading: boolean;
  error: string | null;
}

const formatUSD = (amount: string) => {
  const num = parseFloat(amount);
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const UserStatsCard = ({ stats, loading, error }: UserStatsCardProps) => {
  if (loading) {
    return (
      <div className={css({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px',
        fontSize: '18px',
        color: 'gray.400'
      })}>
        Loading your stats...
      </div>
    );
  }

  if (error) {
    return (
      <div className={css({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px',
        fontSize: '18px',
        color: 'red.400'
      })}>
        Error: {error}
      </div>
    );
  }

  return (
    <div className={css({
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '16px',
      padding: '32px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      maxWidth: '800px',
      margin: '0 auto',
    })}>
      <VStack gap="24px" className={css({
        p: 3,
      })}>
        <HStack gap="12px" alignItems="center">
          <div className={css({
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            backgroundColor: 'rgba(102, 126, 234, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          })}>
            <Trophy className={css({ color: 'blue.300', width: '24px', height: '24px' })} />
          </div>
          <VStack gap="4px" alignItems="flex-start">
            <h2 className={css({
              fontSize: '24px',
              fontWeight: 'bold',
              color: 'white',
              margin: 0,
            })}>
              Your Run Rush Stats
            </h2>
            <p className={css({
              fontSize: '14px',
              color: 'gray.400',
              margin: 0,
            })}>
              Track your progress and achievements
            </p>
          </VStack>
        </HStack>

        <div className={css({
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          width: '100%',
        })}>
          <div className={css({
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            borderRadius: '12px',
            p: 2,
            border: '1px solid rgba(255, 255, 255, 0.05)',
          })}>
            <HStack gap="8px" alignItems="center" marginBottom="8px">
              <TrendingUp className={css({ color: 'green.400', width: '16px', height: '16px' })} />
              <span className={css({
                fontSize: '12px',
                color: 'gray.400',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              })}>
                Total Swaps
              </span>
            </HStack>
            <div className={css({
              fontSize: '24px',
              fontWeight: 'bold',
              color: 'white',
            })}>
              {stats.total_swaps.toLocaleString()}
            </div>
          </div>

          <div className={css({
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            borderRadius: '12px',
            p: 2,
            border: '1px solid rgba(255, 255, 255, 0.05)',
          })}>
            <HStack gap="8px" alignItems="center" marginBottom="8px">
              <DollarSign className={css({ color: 'green.400', width: '16px', height: '16px' })} />
              <span className={css({
                fontSize: '12px',
                color: 'gray.400',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              })}>
                Volume Swapped
              </span>
            </HStack>
            <div className={css({
              fontSize: '24px',
              fontWeight: 'bold',
              color: 'white',
            })}>
              {formatUSD(stats.total_usd_swapped)}
            </div>
          </div>

          <div className={css({
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            borderRadius: '12px',
            p: 2,
            border: '1px solid rgba(255, 255, 255, 0.05)',
          })}>
            <HStack gap="8px" alignItems="center" marginBottom="8px">
              <Users className={css({ color: 'blue.400', width: '16px', height: '16px' })} />
              <span className={css({
                fontSize: '12px',
                color: 'gray.400',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              })}>
                Liquidity Added
              </span>
            </HStack>
            <div className={css({
              fontSize: '24px',
              fontWeight: 'bold',
              color: 'white',
            })}>
              {stats.total_liquidity_additions}
            </div>
          </div>

          <div className={css({
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            borderRadius: '12px',
            p: 2,
            border: '1px solid rgba(255, 255, 255, 0.05)',
          })}>
            <HStack gap="8px" alignItems="center" marginBottom="8px">
              <Target className={css({ color: 'purple.400', width: '16px', height: '16px' })} />
              <span className={css({
                fontSize: '12px',
                color: 'gray.400',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              })}>
                Pairs Created
              </span>
            </HStack>
            <div className={css({
              fontSize: '24px',
              fontWeight: 'bold',
              color: 'white',
            })}>
              {stats.total_pairs_created}
            </div>
          </div>

          <div className={css({
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            borderRadius: '12px',
            p: 2,
            border: '1px solid rgba(255, 255, 255, 0.05)',
          })}>
            <HStack gap="8px" alignItems="center" marginBottom="8px">
              <Flame className={css({ color: 'orange.400', width: '16px', height: '16px' })} />
              <span className={css({
                fontSize: '12px',
                color: 'gray.400',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              })}>
                Current Streak
              </span>
            </HStack>
            <div className={css({
              fontSize: '24px',
              fontWeight: 'bold',
              color: 'white',
            })}>
              {stats.current_streak} days
            </div>
          </div>

          <div className={css({
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            borderRadius: '12px',
            p: 2,
            border: '1px solid rgba(255, 255, 255, 0.05)',
          })}>
            <HStack gap="8px" alignItems="center" marginBottom="8px">
              <Trophy className={css({ color: 'yellow.400', width: '16px', height: '16px' })} />
              <span className={css({
                fontSize: '12px',
                color: 'gray.400',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              })}>
                Omzo Points
              </span>
            </HStack>
            <div className={css({
              fontSize: '24px',
              fontWeight: 'bold',
              color: 'green.400',
            })}>
              {stats.omzo_points.toLocaleString()}
            </div>
          </div>
        </div>

        {stats.first_swap_completed && (
          <div className={css({
            backgroundColor: 'rgba(102, 126, 234, 0.1)',
            borderRadius: '12px',
            p: 2,
            border: '1px solid rgba(102, 126, 234, 0.2)',
          })}>
            <HStack gap="8px" alignItems="center">
              <div className={css({
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                backgroundColor: 'rgba(102, 126, 234, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              })}>
                <Target className={css({ color: 'blue.300', width: '12px', height: '12px' })} />
              </div>
              <span className={css({
                fontSize: '14px',
                color: 'blue.300',
                fontWeight: 'bold',
              })}>
                First swap completed on {formatDate(stats.first_swap_date)}
              </span>
            </HStack>
          </div>
        )}
      </VStack>
    </div>
  );
};