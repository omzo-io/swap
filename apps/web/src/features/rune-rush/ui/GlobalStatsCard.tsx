'use client';

import { GlobalStats } from '../types/types';
import { css } from '~/styled-system/css';
import { VStack, HStack } from '~/styled-system/jsx';
import { Globe, TrendingUp, Users, Trophy } from 'lucide-react';

interface GlobalStatsCardProps {
  stats: GlobalStats | null;
  loading: boolean;
  error: string | null;
}

const formatNumber = (num: number) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toLocaleString();
};

const formatUSD = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const GlobalStatsCard = ({ stats, loading, error }: GlobalStatsCardProps) => {
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
        Loading global stats...
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

  if (!stats) {
    return null;
  }

  return (
    <div className={css({
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '16px',
      padding: '32px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      maxWidth: '1000px',
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
            backgroundColor: 'rgba(34, 197, 94, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          })}>
            <Globe className={css({ color: 'green.400', width: '24px', height: '24px' })} />
          </div>
          <VStack gap="4px" alignItems="flex-start">
            <h2 className={css({
              fontSize: '24px',
              fontWeight: 'bold',
              color: 'white',
              margin: 0,
            })}>
              Platform Statistics
            </h2>
            <p className={css({
              fontSize: '14px',
              color: 'gray.400',
              margin: 0,
            })}>
              Real-time platform metrics
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
              <Users className={css({ color: 'blue.400', width: '16px', height: '16px' })} />
              <span className={css({
                fontSize: '12px',
                color: 'gray.400',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              })}>
                Total Users
              </span>
            </HStack>
            <div className={css({
              fontSize: '24px',
              fontWeight: 'bold',
              color: 'white',
            })}>
              {formatNumber(stats.total_users)}
            </div>
          </div>

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
              {formatNumber(stats.total_swaps)}
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
                Total Points
              </span>
            </HStack>
            <div className={css({
              fontSize: '24px',
              fontWeight: 'bold',
              color: 'green.400',
            })}>
              {formatNumber(stats.total_omzo_points)}
            </div>
          </div>

          <div className={css({
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            borderRadius: '12px',
            p: 2,
            border: '1px solid rgba(255, 255, 255, 0.05)',
          })}>
            <HStack gap="8px" alignItems="center" marginBottom="8px">
              <Globe className={css({ color: 'purple.400', width: '16px', height: '16px' })} />
              <span className={css({
                fontSize: '12px',
                color: 'gray.400',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              })}>
                Total Liquidity
              </span>
            </HStack>
            <div className={css({
              fontSize: '24px',
              fontWeight: 'bold',
              color: 'white',
            })}>
              {formatUSD(stats.total_liquidity_usd)}
            </div>
          </div>
        </div>
      </VStack>
    </div>
  );
};