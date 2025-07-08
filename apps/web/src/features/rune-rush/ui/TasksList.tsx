'use client';

import { css } from '~/styled-system/css';
import { VStack, HStack } from '~/styled-system/jsx';
import { CheckCircle, Star, Target, TrendingUp } from 'lucide-react';

interface Task {
  id: number;
  task: string;
  points: number;
  completed?: boolean;
}

const tasks: Task[] = [
  { id: 1, task: 'Perform your first rune swap', points: 100 },
  { id: 2, task: 'Create your first liquidity pair', points: 120 },
  { id: 3, task: 'Add liquidity to an existing pool', points: 80 },
  { id: 4, task: 'Complete 3 swaps on different runes', points: 90 },
  { id: 5, task: 'Complete 10 swaps total', points: 90 },
  { id: 6, task: 'Stake liquidity in a test pool', points: 110 },
  { id: 7, task: 'Follow @omzoio on Twitter', points: 500 },
  { id: 8, task: 'Retweet the official testnet announcement', points: 250 },
  { id: 9, task: 'Complete a swap during the Omzo Friday Rush (x5 Omzo Points)', points: 500 },
  { id: 10, task: 'Create a short feedback post on X (tagging Omzo)', points: 250 },
  { id: 11, task: 'Share a screenshot of your favorite rune combo on Twitter tagging @omzoio', points: 150 },
  { id: 12, task: 'Create a meme about Omzo and share it on Twitter with @omzoio tag', points: 150 },
  { id: 13, task: 'Reach 5 consecutive daily swaps (streak bonus)', points: 100 },
  { id: 14, task: 'Complete 30 swaps total', points: 150 },
  { id: 15, task: 'Add liquidity to 3 existing pools', points: 250 },
];

interface TasksListProps {
  userAchievements?: string[]; // Array of completed achievement IDs
}

export const TasksList = ({ userAchievements = [] }: TasksListProps) => {
  const getTaskStatus = (taskId: number) => {
    // This would be replaced with actual achievement checking logic
    return userAchievements.includes(taskId.toString());
  };

  const formatPoints = (points: number) => {
    return points.toLocaleString();
  };

  return (
    <VStack gap="24px" className={css({
      width: '100%',
      maxWidth: '1200px',
      margin: '0 auto',
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
          <Target className={css({ color: 'yellow.400', width: '16px', height: '16px' })} />
        </div>
        <h2 className={css({
          fontSize: '24px',
          fontWeight: 'bold',
          color: 'white',
          margin: 0,
        })}>
          Available Tasks
        </h2>
      </HStack>

      <div className={css({
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '16px',
        padding: '32px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        width: '100%',
      })}>
        <div className={css({
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '16px',
          width: '100%',
        })}>
          {tasks.map((task) => {
            const isCompleted = getTaskStatus(task.id);

            return (
              <div
                key={task.id}
                className={css({
                  backgroundColor: isCompleted
                    ? 'rgba(34, 197, 94, 0.1)'
                    : 'rgba(255, 255, 255, 0.03)',
                  borderRadius: '12px',
                  padding: '16px',
                  border: isCompleted
                    ? '1px solid rgba(34, 197, 94, 0.3)'
                    : '1px solid rgba(255, 255, 255, 0.05)',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    backgroundColor: isCompleted
                      ? 'rgba(34, 197, 94, 0.15)'
                      : 'rgba(255, 255, 255, 0.08)',
                  },
                })}
              >
                <HStack gap="12px" alignItems="flex-start" justifyContent="space-between">
                  <HStack gap="12px" alignItems="flex-start" flex="1">
                    <div className={css({
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      backgroundColor: isCompleted
                        ? 'rgba(34, 197, 94, 0.2)'
                        : 'rgba(255, 255, 255, 0.1)',
                      flexShrink: 0,
                    })}>
                      {isCompleted ? (
                        <CheckCircle className={css({
                          color: 'green.400',
                          width: '14px',
                          height: '14px'
                        })} />
                      ) : (
                        <span className={css({
                          fontSize: '12px',
                          fontWeight: 'bold',
                          color: 'gray.400',
                        })}>
                          {task.id}
                        </span>
                      )}
                    </div>

                    <div className={css({
                      flex: '1',
                      minWidth: 0,
                    })}>
                      <p className={css({
                        fontSize: '14px',
                        color: isCompleted ? 'green.300' : 'white',
                        fontWeight: isCompleted ? 'bold' : 'normal',
                        margin: 0,
                        lineHeight: '1.4',
                      })}>
                        {task.task}
                      </p>
                    </div>
                  </HStack>

                  <HStack gap="6px" alignItems="center">
                    <Star className={css({
                      color: 'yellow.400',
                      width: '14px',
                      height: '14px'
                    })} />
                    <span className={css({
                      fontSize: '14px',
                      fontWeight: 'bold',
                      color: 'yellow.400',
                      whiteSpace: 'nowrap',
                    })}>
                      {formatPoints(task.points)}
                    </span>
                  </HStack>
                </HStack>
              </div>
            );
          })}
        </div>

        <div className={css({
          marginTop: '24px',
          padding: '16px',
          backgroundColor: 'rgba(102, 126, 234, 0.1)',
          borderRadius: '12px',
          border: '1px solid rgba(102, 126, 234, 0.2)',
        })}>
          <HStack gap="8px" alignItems="center">
            <TrendingUp className={css({
              color: 'blue.300',
              width: '16px',
              height: '16px'
            })} />
            <span className={css({
              fontSize: '14px',
              color: 'blue.300',
              fontWeight: 'bold',
            })}>
              Pro Tip:
            </span>
            <span className={css({
              fontSize: '14px',
              color: 'gray.300',
            })}>
              Complete tasks to earn Omzo Points and climb the leaderboard! Some tasks can be completed multiple times for additional rewards.
            </span>
          </HStack>
        </div>
      </div>
    </VStack>
  );
};