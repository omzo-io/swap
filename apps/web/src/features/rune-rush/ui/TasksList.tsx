'use client';

import { css } from '~/styled-system/css';
import { VStack, HStack } from '~/styled-system/jsx';
import { CheckCircle, Star, Target, TrendingUp, ExternalLink } from 'lucide-react';
import { UserAchievement } from '../types/types';
import { useState } from 'react';

interface Task {
  id: number;
  task: string;
  points: number;
  completed?: boolean;
  clickable?: boolean;
}

const tasks: Task[] = [
  { id: 1, task: 'Perform your first rune swap', points: 100 },
  { id: 2, task: 'Create your first liquidity pair', points: 120 },
  { id: 3, task: 'Add liquidity to an existing pool', points: 80 },
  { id: 4, task: 'Complete 3 swaps on different runes', points: 90 },
  { id: 5, task: 'Complete 10 swaps total', points: 90 },
  // { id: 6, task: 'Stake liquidity in a test pool', points: 110 },
  // { id: 7, task: 'Follow @omzoio on Twitter', points: 500 },
  // { id: 8, task: 'Retweet the official testnet announcement', points: 250 },
  { id: 6, task: 'Complete a swap during the Omzo Friday Rush (x5 Omzo Points)', points: 500 },
  // { id: 10, task: 'Create a short feedback post on X (tagging Omzo)', points: 250 },
  // { id: 11, task: 'Share a screenshot of your favorite rune combo on Twitter tagging @omzoio', points: 150 },
  { id: 7, task: 'Create a meme about Omzo and share it on Twitter with @omzoio tag', points: 150, clickable: true },
  { id: 8, task: 'Reach 5 consecutive daily swaps (streak bonus)', points: 100 },
  { id: 9, task: 'Complete 30 swaps total', points: 150 },
  { id: 10, task: 'Add liquidity to 3 existing pools', points: 250 },
];

// Mapping of achievement types to task IDs
const achievementTypeToTaskId: Record<string, number> = {
  'first_swap': 1,
  'first_liquidity_pair': 2,
  'add_liquidity': 3,
  'three_different_runes': 4,
  'ten_swaps': 5,
  'omzo_friday_rush': 6,
  'omzo_meme_creator': 7,
  'five_day_streak': 8,
  'thirty_swaps': 9,
  'three_liquidity_pools': 10,
};

interface TasksListProps {
  userAchievements?: UserAchievement[]; // Array of user achievements
  walletAddress?: string | null; // User's wallet address
}

export const TasksList = ({ userAchievements = [], walletAddress }: TasksListProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [twitterLink, setTwitterLink] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const getTaskStatus = (taskId: number) => {
    // Check if any achievement matches this task ID
    const isCompleted = userAchievements.some(achievement => {
      const mappedTaskId = achievementTypeToTaskId[achievement.achievement_type];
      const matches = mappedTaskId === taskId;

      return matches;
    });

    return isCompleted;
  };

  const formatPoints = (points: number) => {
    return points.toLocaleString();
  };

  const handleTaskClick = (task: Task) => {
    if (task.clickable && !getTaskStatus(task.id)) {
      setIsModalOpen(true);
    }
  };

    const handleSubmitMeme = async () => {
    if (!walletAddress) {
      setSubmitError('Please connect your wallet to submit a meme');
      return;
    }

    if (!twitterLink.trim()) {
      setSubmitError('Please enter a valid Twitter link');
      return;
    }

    // Basic Twitter link validation
    if (!twitterLink.includes('twitter.com') && !twitterLink.includes('x.com')) {
      setSubmitError('Please enter a valid Twitter/X link');
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Send the meme submission to our API
      const response = await fetch('/api/meme-submission', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          walletAddress: walletAddress || '',
          twitterLink: twitterLink.trim()
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit meme');
      }

      setSubmitSuccess(true);
      setTimeout(() => {
        setIsModalOpen(false);
        setTwitterLink('');
        setSubmitSuccess(false);
        // Optionally refresh the page or refetch achievements
        window.location.reload();
      }, 2000);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Failed to submit meme. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
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
            const isClickable = task.clickable && !isCompleted;

            return (
              <div
                key={task.id}
                className={css({
                  backgroundColor: isCompleted
                    ? 'rgba(34, 197, 94, 0.1)'
                    : isClickable
                    ? 'rgba(59, 130, 246, 0.1)'
                    : 'rgba(255, 255, 255, 0.03)',
                  borderRadius: '12px',
                  padding: '16px',
                  border: isCompleted
                    ? '1px solid rgba(34, 197, 94, 0.3)'
                    : isClickable
                    ? '1px solid rgba(59, 130, 246, 0.3)'
                    : '1px solid rgba(255, 255, 255, 0.05)',
                  transition: 'all 0.2s ease',
                  cursor: isClickable ? 'pointer' : 'default',
                  '&:hover': {
                    backgroundColor: isCompleted
                      ? 'rgba(34, 197, 94, 0.15)'
                      : isClickable
                      ? 'rgba(59, 130, 246, 0.2)'
                      : 'rgba(255, 255, 255, 0.08)',
                    transform: isClickable ? 'translateY(-2px)' : 'none',
                  },
                })}
                onClick={() => handleTaskClick(task)}
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
                        : isClickable
                        ? 'rgba(59, 130, 246, 0.2)'
                        : 'rgba(255, 255, 255, 0.1)',
                      flexShrink: 0,
                    })}>
                      {isCompleted ? (
                        <CheckCircle className={css({
                          color: 'green.400',
                          width: '14px',
                          height: '14px'
                        })} />
                      ) : isClickable ? (
                        <ExternalLink className={css({
                          color: 'blue.400',
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
                        color: isCompleted ? 'green.300' : isClickable ? 'blue.300' : 'white',
                        fontWeight: isCompleted || isClickable ? 'bold' : 'normal',
                        margin: 0,
                        lineHeight: '1.4',
                      })}>
                        {task.task}
                        {isClickable && (
                          <span className={css({
                            fontSize: '12px',
                            color: 'blue.400',
                            marginLeft: '8px',
                            fontStyle: 'italic',
                          })}>
                            (Click to submit)
                          </span>
                        )}
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
              Complete tasks to earn achievements and Omzo Points! Your points are calculated from achievements only - complete more tasks to climb the leaderboard.
            </span>
          </HStack>
        </div>
      </div>

      {/* Twitter Meme Submission Modal */}
      {isModalOpen && (
        <div className={css({
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
        })}>
          <div className={css({
            backgroundColor: 'rgba(30, 30, 30, 0.95)',
            borderRadius: '16px',
            padding: '32px',
            maxWidth: '500px',
            width: '90%',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
          })}>
            <VStack gap="24px">
              <HStack gap="12px" alignItems="center">
                <div className={css({
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(59, 130, 246, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                })}>
                  <ExternalLink className={css({ color: 'blue.400', width: '20px', height: '20px' })} />
                </div>
                <h3 className={css({
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: 'white',
                  margin: 0,
                })}>
                  Submit Your Meme
                </h3>
              </HStack>

              <p className={css({
                fontSize: '16px',
                color: 'gray.300',
                lineHeight: '1.5',
                margin: 0,
              })}>
                Share your Omzo meme on Twitter with @omzoio tag and paste the link below to earn 150 points!
              </p>

              <div className={css({
                padding: '12px',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                borderRadius: '8px',
                border: '1px solid rgba(59, 130, 246, 0.3)',
                color: 'blue.300',
                fontSize: '14px',
              })}>
                <div className={css({
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '4px',
                })}>
                  <span className={css({
                    fontSize: '16px',
                  })}>
                    ⏰
                  </span>
                  <span className={css({
                    fontWeight: 'bold',
                  })}>
                    Manual Review Process
                  </span>
                </div>
                <p className={css({
                  margin: 0,
                  fontSize: '13px',
                  lineHeight: '1.4',
                })}>
                  We will manually review your meme submission within 24 hours. You'll receive your points once approved!
                </p>
              </div>

              {!walletAddress && (
                <div className={css({
                  padding: '12px',
                  backgroundColor: 'rgba(239, 68, 68, 0.1)',
                  borderRadius: '8px',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  color: 'red.400',
                  fontSize: '14px',
                })}>
                  ⚠️ Please connect your wallet to submit a meme
                </div>
              )}

              <VStack gap="16px" width="100%">
                <label className={css({
                  fontSize: '14px',
                  color: 'gray.300',
                  fontWeight: 'bold',
                })}>
                  Twitter/X Link:
                </label>
                <input
                  type="url"
                  value={twitterLink}
                  onChange={(e) => setTwitterLink(e.target.value)}
                  placeholder="https://x.com/your-username/status/..."
                  className={css({
                    width: '100%',
                    padding: '24px 16px',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    color: 'white',
                    fontSize: '14px',
                    '&:focus': {
                      outline: 'none',
                      borderColor: 'blue.400',
                    },
                    '&::placeholder': {
                      color: 'gray.500',
                    },
                  })}
                />
              </VStack>

              {submitError && (
                <div className={css({
                  padding: '12px',
                  backgroundColor: 'rgba(239, 68, 68, 0.1)',
                  borderRadius: '8px',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  color: 'red.400',
                  fontSize: '14px',
                })}>
                  {submitError}
                </div>
              )}

              {submitSuccess && (
                <div className={css({
                  padding: '12px',
                  backgroundColor: 'rgba(34, 197, 94, 0.1)',
                  borderRadius: '8px',
                  border: '1px solid rgba(34, 197, 94, 0.3)',
                  color: 'green.400',
                  fontSize: '14px',
                })}>
                  <div className={css({
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '4px',
                  })}>
                    <span className={css({
                      fontSize: '16px',
                    })}>
                      ✅
                    </span>
                    <span className={css({
                      fontWeight: 'bold',
                    })}>
                      Submission Received!
                    </span>
                  </div>
                  <p className={css({
                    margin: 0,
                    fontSize: '13px',
                    lineHeight: '1.4',
                  })}>
                    Your meme has been submitted successfully. We'll review it within 24 hours and award your points once approved!
                  </p>
                </div>
              )}

              <HStack gap="12px" width="100%">
                <button
                  onClick={() => setIsModalOpen(false)}
                  disabled={isSubmitting}
                  className={css({
                    flex: 1,
                    padding: '12px 24px',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    backgroundColor: 'transparent',
                    color: 'gray.300',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    },
                    '&:disabled': {
                      opacity: 0.5,
                      cursor: 'not-allowed',
                    },
                  })}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitMeme}
                  disabled={isSubmitting || !twitterLink.trim()}
                  className={css({
                    flex: 1,
                    padding: '12px 24px',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: 'blue.500',
                    color: 'white',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      backgroundColor: 'blue.600',
                    },
                    '&:disabled': {
                      opacity: 0.5,
                      cursor: 'not-allowed',
                    },
                  })}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Meme'}
                </button>
              </HStack>
            </VStack>
          </div>
        </div>
      )}
    </VStack>
  );
};