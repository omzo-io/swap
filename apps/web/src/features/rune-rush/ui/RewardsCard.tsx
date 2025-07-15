'use client';

import { css } from '~/styled-system/css';
import { VStack, HStack } from '~/styled-system/jsx';
import { Trophy, Medal, Award, Gift, Crown } from 'lucide-react';

interface Reward {
  rank: string;
  reward: string;
  icon: React.ReactNode;
  color: string;
}

const rewards: Reward[] = [
  {
    rank: 'Top 1',
    reward: '100 Omzo Coins + Rune Master NFT Badge + Mainnet Early Access',
    icon: <Crown className={css({ color: 'yellow.400', width: '18px', height: '18px', '@media (min-width: 768px)': { width: '20px', height: '20px' } })} />,
    color: 'yellow.400'
  },
  {
    rank: 'Top 2',
    reward: '60 Omzo Coins + Mainnet Early Access',
    icon: <Trophy className={css({ color: 'gray.300', width: '18px', height: '18px', '@media (min-width: 768px)': { width: '20px', height: '20px' } })} />,
    color: 'gray.300'
  },
  {
    rank: 'Top 3',
    reward: '40 Omzo Coins + Mainnet Early Access',
    icon: <Medal className={css({ color: 'amber.600', width: '18px', height: '18px', '@media (min-width: 768px)': { width: '20px', height: '20px' } })} />,
    color: 'amber.600'
  },
  {
    rank: 'Top 4 & Top 5',
    reward: '25 Omzo Coins + Mainnet Early Access',
    icon: <Award className={css({ color: 'blue.400', width: '18px', height: '18px', '@media (min-width: 768px)': { width: '20px', height: '20px' } })} />,
    color: 'blue.400'
  },
  {
    rank: 'Top 6-10',
    reward: '10 Omzo Coins + Mainnet Early Access',
    icon: <Gift className={css({ color: 'green.400', width: '18px', height: '18px', '@media (min-width: 768px)': { width: '20px', height: '20px' } })} />,
    color: 'green.400'
  },
];

export const RewardsCard = () => {
  return (
    <VStack gap="20px" className={css({
      width: '100%',
      maxWidth: '1200px',
      margin: '0 auto',
      '@media (min-width: 768px)': {
        gap: '24px',
      },
    })}>
      <HStack gap="8px" alignItems="center">
        <div className={css({
          width: '28px',
          height: '28px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          '@media (min-width: 768px)': {
            width: '32px',
            height: '32px',
          },
        })}>
          <Trophy className={css({
            color: 'white',
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
          Tournament Rewards
        </h2>
      </HStack>

      <div className={css({
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '16px',
        padding: '20px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        width: '100%',
        '@media (min-width: 768px)': {
          padding: '32px',
        },
      })}>
        <div className={css({
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '12px',
          width: '100%',
          '@media (min-width: 480px)': {
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '16px',
          },
          '@media (min-width: 768px)': {
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          },
        })}>
          {rewards.map((reward, index) => (
            <div
              key={index}
              className={css({
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                borderRadius: '12px',
                padding: '16px',
                border: `1px solid rgba(255, 255, 255, 0.05)`,
                transition: 'all 0.2s ease',
                '@media (min-width: 768px)': {
                  padding: '20px',
                },
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  transform: 'translateY(-2px)',
                },
              })}
            >
              <VStack gap="10px" alignItems="flex-start">
                <HStack gap="10px" alignItems="center">
                  <div className={css({
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    '@media (min-width: 768px)': {
                      width: '40px',
                      height: '40px',
                    },
                  })}>
                    {reward.icon}
                  </div>
                  <div>
                    <h3 className={css({
                      fontSize: '16px',
                      fontWeight: 'bold',
                      color: reward.color,
                      margin: 0,
                      '@media (min-width: 768px)': {
                        fontSize: '18px',
                      },
                    })}>
                      {reward.rank}
                    </h3>
                    <p className={css({
                      fontSize: '10px',
                      color: 'gray.400',
                      margin: 0,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      '@media (min-width: 768px)': {
                        fontSize: '12px',
                      },
                    })}>
                      Rank
                    </p>
                  </div>
                </HStack>

                <div className={css({
                  width: '100%',
                })}>
                  <p className={css({
                    fontSize: '12px',
                    color: 'white',
                    margin: 0,
                    lineHeight: '1.4',
                    fontWeight: 'medium',
                    '@media (min-width: 768px)': {
                      fontSize: '14px',
                      lineHeight: '1.5',
                    },
                  })}>
                    {reward.reward}
                  </p>
                </div>
              </VStack>
            </div>
          ))}
        </div>

        <div className={css({
          marginTop: '20px',
          padding: '16px',
          backgroundColor: 'rgba(255, 215, 0, 0.1)',
          borderRadius: '12px',
          border: '1px solid rgba(255, 215, 0, 0.2)',
          '@media (min-width: 768px)': {
            marginTop: '24px',
            padding: '20px',
          },
        })}>
          <VStack gap="10px" alignItems="flex-start">
            <HStack gap="6px" alignItems="center">
              <Crown className={css({
                color: 'yellow.400',
                width: '14px',
                height: '14px',
                '@media (min-width: 768px)': {
                  width: '16px',
                  height: '16px',
                },
              })} />
              <span className={css({
                fontSize: '14px',
                color: 'yellow.400',
                fontWeight: 'bold',
                '@media (min-width: 768px)': {
                  fontSize: '16px',
                },
              })}>
                Grand Prize Details
              </span>
            </HStack>

            <div className={css({
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '10px',
              width: '100%',
              '@media (min-width: 480px)': {
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '12px',
              },
              '@media (min-width: 768px)': {
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              },
            })}>
              <div className={css({
                padding: '10px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                '@media (min-width: 768px)': {
                  padding: '12px',
                },
              })}>
                <h4 className={css({
                  fontSize: '12px',
                  fontWeight: 'bold',
                  color: 'yellow.400',
                  margin: '0 0 4px 0',
                  '@media (min-width: 768px)': {
                    fontSize: '14px',
                  },
                })}>
                  🏆 Rune Master NFT Badge
                </h4>
                <p className={css({
                  fontSize: '10px',
                  color: 'gray.300',
                  margin: 0,
                  '@media (min-width: 768px)': {
                    fontSize: '12px',
                  },
                })}>
                  Exclusive NFT badge for the tournament champion
                </p>
              </div>

              <div className={css({
                padding: '10px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                '@media (min-width: 768px)': {
                  padding: '12px',
                },
              })}>
                <h4 className={css({
                  fontSize: '12px',
                  fontWeight: 'bold',
                  color: 'green.400',
                  margin: '0 0 4px 0',
                  '@media (min-width: 768px)': {
                    fontSize: '14px',
                  },
                })}>
                  🚀 Mainnet Early Access
                </h4>
                <p className={css({
                  fontSize: '10px',
                  color: 'gray.300',
                  margin: 0,
                  '@media (min-width: 768px)': {
                    fontSize: '12px',
                  },
                })}>
                  Priority access to Omzo mainnet features
                </p>
              </div>

              <div className={css({
                padding: '10px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                '@media (min-width: 768px)': {
                  padding: '12px',
                },
              })}>
                <h4 className={css({
                  fontSize: '12px',
                  fontWeight: 'bold',
                  color: 'blue.400',
                  margin: '0 0 4px 0',
                  '@media (min-width: 768px)': {
                    fontSize: '14px',
                  },
                })}>
                  💰 Omzo Coins
                </h4>
                <p className={css({
                  fontSize: '10px',
                  color: 'gray.300',
                  margin: 0,
                  '@media (min-width: 768px)': {
                    fontSize: '12px',
                  },
                })}>
                  Native tokens for future platform features
                </p>
              </div>
            </div>
          </VStack>
        </div>
      </div>
    </VStack>
  );
};