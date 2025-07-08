import { NextRequest, NextResponse } from 'next/server';

const USER_STATS_SERVICE_URL = process.env.USER_STATS_SERVICE_URL;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit') || '100';

    // First, get the basic leaderboard
    const leaderboardResponse = await fetch(`${USER_STATS_SERVICE_URL}/leaderboard?limit=${limit}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const leaderboardData = await leaderboardResponse.json();

    if (!leaderboardResponse.ok) {
      return NextResponse.json(
        { error: leaderboardData.error || 'Failed to fetch leaderboard' },
        { status: leaderboardResponse.status }
      );
    }

    // For each user in the leaderboard, fetch their achievements and recalculate points
    const updatedLeaderboard = await Promise.all(
      leaderboardData.data.map(async (entry: any) => {
        try {
          const achievementsResponse = await fetch(`${USER_STATS_SERVICE_URL}/achievements/${entry.wallet_address}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (achievementsResponse.ok) {
            const achievementsData = await achievementsResponse.json();
            const achievements = achievementsData.data || [];

            // Calculate total points from achievements
            const totalPoints = achievements.reduce((sum: number, achievement: any) => {
              return sum + (achievement.points_rewarded || 0);
            }, 0);

            return {
              ...entry,
              omzo_points: totalPoints,
              achievements_count: achievements.length,
              tasks_completed: achievements.length // Assuming tasks completed = achievements count
            };
          } else {
            // If we can't fetch achievements, keep the original data
            return entry;
          }
        } catch (error) {
          console.error(`Error fetching achievements for ${entry.wallet_address}:`, error);
          return entry;
        }
      })
    );

    // Sort by the recalculated points
    updatedLeaderboard.sort((a, b) => b.omzo_points - a.omzo_points);

    return NextResponse.json({
      success: true,
      data: updatedLeaderboard
    });
  } catch (error) {
    console.error('Error fetching leaderboard with achievements:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}