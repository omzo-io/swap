import { NextRequest, NextResponse } from 'next/server';

const USER_STATS_SERVICE_URL = process.env.USER_STATS_SERVICE_URL;

export async function GET(request: NextRequest) {
  try {
    // Get the basic global stats
    const statsResponse = await fetch(`${USER_STATS_SERVICE_URL}/global-stats`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const statsData = await statsResponse.json();

    if (!statsResponse.ok) {
      return NextResponse.json(
        { error: statsData.error || 'Failed to fetch global stats' },
        { status: statsResponse.status }
      );
    }

    // Get the leaderboard to calculate total points from achievements
    const leaderboardResponse = await fetch(`${USER_STATS_SERVICE_URL}/leaderboard?limit=1000`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const leaderboardData = await leaderboardResponse.json();

    if (leaderboardResponse.ok) {
      // Calculate total points from all achievements
      let totalPoints = 0;
      let totalAchievements = 0;

      await Promise.all(
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

              achievements.forEach((achievement: any) => {
                totalPoints += achievement.points_rewarded || 0;
                totalAchievements += 1;
              });
            }
          } catch (error) {
            console.error(`Error fetching achievements for ${entry.wallet_address}:`, error);
          }
        })
      );

      // Update the global stats with the calculated points
      const updatedStats = {
        ...statsData.data,
        total_omzo_points: totalPoints,
        total_achievements: totalAchievements
      };

      return NextResponse.json({
        success: true,
        data: updatedStats
      });
    } else {
      // If we can't fetch the leaderboard, return the original stats
      return NextResponse.json(statsData);
    }
  } catch (error) {
    console.error('Error fetching global stats with achievements:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}