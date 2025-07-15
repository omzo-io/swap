'use client';

import { UserAchievement } from '../types/types';
import { css } from '~/styled-system/css';
import { VStack, HStack } from '~/styled-system/jsx';
import { Star, Calendar, Zap } from 'lucide-react';

interface AchievementCardProps {
  achievement: UserAchievement;
}

export const AchievementCard = ({ achievement }: AchievementCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className={css({
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '12px',
      padding: '12px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      transition: 'all 0.2s ease',
      '@media (min-width: 768px)': {
        padding: '16px',
      },
      '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        transform: 'translateY(-2px)',
      },
    })}>
      <VStack gap="10px" alignItems="flex-start">
        <HStack gap="8px" alignItems="flex-start">
          <div className={css({
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 215, 0, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
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
          <VStack gap="2px" alignItems="flex-start" flex="1" minWidth="0">
            <h3 className={css({
              fontSize: '14px',
              fontWeight: 'bold',
              color: 'white',
              margin: 0,
              lineHeight: '1.3',
              wordBreak: 'break-word',
              '@media (min-width: 768px)': {
                fontSize: '16px',
                lineHeight: '1.4',
              },
            })}>
              {achievement.title}
            </h3>
            <p className={css({
              fontSize: '11px',
              color: 'gray.400',
              margin: 0,
              lineHeight: '1.3',
              wordBreak: 'break-word',
              '@media (min-width: 768px)': {
                fontSize: '12px',
                lineHeight: '1.4',
              },
            })}>
              {achievement.description}
            </p>
          </VStack>
        </HStack>

        <HStack gap="12px" alignItems="center" flexWrap="wrap">
          <HStack gap="4px" alignItems="center">
            <Zap className={css({
              color: 'green.400',
              width: '10px',
              height: '10px',
              '@media (min-width: 768px)': {
                width: '12px',
                height: '12px',
              },
            })} />
            <span className={css({
              fontSize: '11px',
              color: 'green.400',
              fontWeight: 'bold',
              '@media (min-width: 768px)': {
                fontSize: '12px',
              },
            })}>
              +{achievement.points_rewarded} points
            </span>
          </HStack>

          <HStack gap="4px" alignItems="center">
            <Calendar className={css({
              color: 'gray.400',
              width: '10px',
              height: '10px',
              '@media (min-width: 768px)': {
                width: '12px',
                height: '12px',
              },
            })} />
            <span className={css({
              fontSize: '11px',
              color: 'gray.400',
              '@media (min-width: 768px)': {
                fontSize: '12px',
              },
            })}>
              {formatDate(achievement.achieved_at)}
            </span>
          </HStack>
        </HStack>
      </VStack>
    </div>
  );
};