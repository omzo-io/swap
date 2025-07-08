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
    icon: <Crown className={css({ color: 'yellow.400', width: '20px', height: '20px' })} />,
    color: 'yellow.400'
  },
  {
    rank: 'Top 2',
    reward: '60 Omzo Coins + Mainnet Early Access',
    icon: <Trophy className={css({ color: 'gray.300', width: '20px', height: '20px' })} />,
    color: 'gray.300'
  },
  {
    rank: 'Top 3',
    reward: '40 Omzo Coins + Mainnet Early Access',
    icon: <Medal className={css({ color: 'amber.600', width: '20px', height: '20px' })} />,
    color: 'amber.600'
  },
  {
    rank: 'Top 4 & Top 5',
    reward: '25 Omzo Coins + Mainnet Early Access',
    icon: <Award className={css({ color: 'blue.400', width: '20px', height: '20px' })} />,
    color: 'blue.400'
  },
  {
    rank: 'Top 6-10',
    reward: '10 Omzo Coins + Mainnet Early Access',
    icon: <Gift className={css({ color: 'green.400', width: '20px', height: '20px' })} />,
    color: 'green.400'
  },
];

export const RewardsCard = () => {
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
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        })}>
          <Trophy className={css({ color: 'white', width: '16px', height: '16px' })} />
        </div>
        <h2 className={css({
          fontSize: '24px',
          fontWeight: 'bold',
          color: 'white',
          margin: 0,
        })}>
          Tournament Rewards
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
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '16px',
          width: '100%',
        })}>
          {rewards.map((reward, index) => (
            <div
              key={index}
              className={css({
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                borderRadius: '12px',
                padding: '20px',
                border: `1px solid rgba(255, 255, 255, 0.05)`,
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  transform: 'translateY(-2px)',
                },
              })}
            >
              <VStack gap="12px" alignItems="flex-start">
                <HStack gap="12px" alignItems="center">
                  <div className={css({
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  })}>
                    {reward.icon}
                  </div>
                  <div>
                    <h3 className={css({
                      fontSize: '18px',
                      fontWeight: 'bold',
                      color: reward.color,
                      margin: 0,
                    })}>
                      {reward.rank}
                    </h3>
                    <p className={css({
                      fontSize: '12px',
                      color: 'gray.400',
                      margin: 0,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    })}>
                      Rank
                    </p>
                  </div>
                </HStack>

                <div className={css({
                  width: '100%',
                })}>
                  <p className={css({
                    fontSize: '14px',
                    color: 'white',
                    margin: 0,
                    lineHeight: '1.5',
                    fontWeight: 'medium',
                  })}>
                    {reward.reward}
                  </p>
                </div>
              </VStack>
            </div>
          ))}
        </div>

        <div className={css({
          marginTop: '24px',
          padding: '20px',
          backgroundColor: 'rgba(255, 215, 0, 0.1)',
          borderRadius: '12px',
          border: '1px solid rgba(255, 215, 0, 0.2)',
        })}>
          <VStack gap="12px" alignItems="flex-start">
            <HStack gap="8px" alignItems="center">
              <Crown className={css({
                color: 'yellow.400',
                width: '16px',
                height: '16px'
              })} />
              <span className={css({
                fontSize: '16px',
                color: 'yellow.400',
                fontWeight: 'bold',
              })}>
                Grand Prize Details
              </span>
            </HStack>

            <div className={css({
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '12px',
              width: '100%',
            })}>
              <div className={css({
                padding: '12px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              })}>
                <h4 className={css({
                  fontSize: '14px',
                  fontWeight: 'bold',
                  color: 'yellow.400',
                  margin: '0 0 4px 0',
                })}>
                  🏆 Rune Master NFT Badge
                </h4>
                <p className={css({
                  fontSize: '12px',
                  color: 'gray.300',
                  margin: 0,
                })}>
                  Exclusive NFT badge for the tournament champion
                </p>
              </div>

              <div className={css({
                padding: '12px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              })}>
                <h4 className={css({
                  fontSize: '14px',
                  fontWeight: 'bold',
                  color: 'green.400',
                  margin: '0 0 4px 0',
                })}>
                  🚀 Mainnet Early Access
                </h4>
                <p className={css({
                  fontSize: '12px',
                  color: 'gray.300',
                  margin: 0,
                })}>
                  Priority access to Omzo mainnet features
                </p>
              </div>

              <div className={css({
                padding: '12px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              })}>
                <h4 className={css({
                  fontSize: '14px',
                  fontWeight: 'bold',
                  color: 'blue.400',
                  margin: '0 0 4px 0',
                })}>
                  💰 Omzo Coins
                </h4>
                <p className={css({
                  fontSize: '12px',
                  color: 'gray.300',
                  margin: 0,
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