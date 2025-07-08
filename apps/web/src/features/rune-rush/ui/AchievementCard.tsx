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
      padding: '16px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      transition: 'all 0.2s ease',
      '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        transform: 'translateY(-2px)',
      },
    })}>
      <VStack gap="12px" alignItems="flex-start">
        <HStack gap="8px" alignItems="center">
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
          <VStack gap="2px" alignItems="flex-start">
            <h3 className={css({
              fontSize: '16px',
              fontWeight: 'bold',
              color: 'white',
              margin: 0,
            })}>
              {achievement.title}
            </h3>
            <p className={css({
              fontSize: '12px',
              color: 'gray.400',
              margin: 0,
            })}>
              {achievement.description}
            </p>
          </VStack>
        </HStack>

        <HStack gap="16px" alignItems="center">
          <HStack gap="4px" alignItems="center">
            <Zap className={css({ color: 'green.400', width: '12px', height: '12px' })} />
            <span className={css({
              fontSize: '12px',
              color: 'green.400',
              fontWeight: 'bold',
            })}>
              +{achievement.points_rewarded} points
            </span>
          </HStack>

          <HStack gap="4px" alignItems="center">
            <Calendar className={css({ color: 'gray.400', width: '12px', height: '12px' })} />
            <span className={css({
              fontSize: '12px',
              color: 'gray.400',
            })}>
              {formatDate(achievement.achieved_at)}
            </span>
          </HStack>
        </HStack>
      </VStack>
    </div>
  );
};