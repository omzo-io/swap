'use client';

import { LeaderboardEntry } from '../types/types';
import { css } from '~/styled-system/css';
import { HStack, VStack, Stack } from '~/styled-system/jsx';
import { Trophy, Medal, Award } from 'lucide-react';

interface TournamentTableProps {
  leaderboard: LeaderboardEntry[];
  loading: boolean;
  error: string | null;
  currentUserAddress?: string | null;
}

const getRankIcon = (rank: number) => {
  if (rank === 1) return <Trophy className={css({ color: 'yellow.400', width: '20px', height: '20px' })} />;
  if (rank === 2) return <Medal className={css({ color: 'gray.300', width: '20px', height: '20px' })} />;
  if (rank === 3) return <Award className={css({ color: 'amber.600', width: '20px', height: '20px' })} />;
  return null;
};

const formatWalletAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

const formatUSD = (amount: string) => {
  const num = parseFloat(amount);
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);
};

export const TournamentTable = ({ leaderboard, loading, error, currentUserAddress }: TournamentTableProps) => {
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
        Loading leaderboard...
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
    <VStack
      className={css({
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '32px',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '16px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
      })}
    >
      <h2 className={css({
        fontSize: '28px',
        fontWeight: 'bold',
        marginBottom: '20px',
        textAlign: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        backgroundClip: 'text',
        color: 'transparent',
      })}>
        🏆 Run Rush Tournament
      </h2>

      <div className={css({
        width: '100%',
        overflowX: 'auto',
      })}>
        <table className={css({
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: '14px',
        })}>
          <thead>
            <tr className={css({
              borderBottom: '2px solid rgba(255, 255, 255, 0.1)',
            })}>
              <th className={css({
                padding: '20px 16px',
                textAlign: 'left',
                fontWeight: 'bold',
                color: 'gray.300',
                fontSize: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              })}>
                Rank
              </th>
              <th className={css({
                padding: '20px 16px',
                textAlign: 'left',
                fontWeight: 'bold',
                color: 'gray.300',
                fontSize: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              })}>
                Wallet
              </th>
              <th className={css({
                padding: '20px 16px',
                textAlign: 'right',
                fontWeight: 'bold',
                color: 'gray.300',
                fontSize: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              })}>
                Points
              </th>
              <th className={css({
                padding: '20px 16px',
                textAlign: 'right',
                fontWeight: 'bold',
                color: 'gray.300',
                fontSize: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              })}>
                Swaps
              </th>
              <th className={css({
                padding: '20px 16px',
                textAlign: 'right',
                fontWeight: 'bold',
                color: 'gray.300',
                fontSize: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              })}>
                Volume
              </th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((entry, index) => {
              const rank = index + 1;
              const isCurrentUser = currentUserAddress?.toLowerCase() === entry.wallet_address.toLowerCase();

              return (
                <tr
                  key={entry.wallet_address}
                  className={css({
                    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                    backgroundColor: isCurrentUser ? 'rgba(102, 126, 234, 0.1)' : 'transparent',
                    transition: 'background-color 0.2s ease',
                    '&:hover': {
                      backgroundColor: isCurrentUser
                        ? 'rgba(102, 126, 234, 0.15)'
                        : 'rgba(255, 255, 255, 0.05)',
                    },
                  })}
                >
                  <td className={css({
                    padding: '20px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontWeight: rank <= 3 ? 'bold' : 'normal',
                    color: rank <= 3 ? 'yellow.400' : 'gray.300',
                  })}>
                    {getRankIcon(rank)}
                    #{rank}
                  </td>
                  <td className={css({
                    padding: '20px 16px',
                    fontFamily: 'monospace',
                    fontSize: '13px',
                    color: isCurrentUser ? 'blue.300' : 'white',
                    fontWeight: isCurrentUser ? 'bold' : 'normal',
                  })}>
                    {formatWalletAddress(entry.wallet_address)}
                    {isCurrentUser && (
                      <span className={css({
                        marginLeft: '8px',
                        fontSize: '10px',
                        color: 'blue.300',
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        padding: '2px 6px',
                        borderRadius: '4px',
                      })}>
                        YOU
                      </span>
                    )}
                  </td>
                  <td className={css({
                    padding: '20px 16px',
                    textAlign: 'right',
                    fontWeight: 'bold',
                    color: 'green.400',
                  })}>
                    {entry.omzo_points.toLocaleString()}
                  </td>
                  <td className={css({
                    padding: '20px 16px',
                    textAlign: 'right',
                    color: 'gray.300',
                  })}>
                    {entry.total_swaps.toLocaleString()}
                  </td>
                  <td className={css({
                    padding: '20px 16px',
                    textAlign: 'right',
                    color: 'gray.300',
                  })}>
                    {formatUSD(entry.total_usd_swapped)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {leaderboard.length === 0 && (
        <div className={css({
          padding: '40px',
          textAlign: 'center',
          color: 'gray.400',
          fontSize: '16px',
        })}>
          No participants yet. Be the first to join the tournament!
        </div>
      )}
    </VStack>
  );
};