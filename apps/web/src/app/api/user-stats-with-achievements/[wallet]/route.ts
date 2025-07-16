import { NextRequest, NextResponse } from 'next/server';

const USER_STATS_SERVICE_URL = process.env.USER_STATS_SERVICE_URL || 'https://your-domain.com/api';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ wallet: string }> }
) {
  try {
    const { wallet } = await params;
    const walletAddress = wallet;

    if (!walletAddress || !walletAddress.startsWith('0x')) {
      return NextResponse.json(
        { error: 'Invalid wallet address' },
        { status: 400 }
      );
    }

    // Fetch both stats and achievements in parallel
    const [statsResponse, achievementsResponse] = await Promise.all([
      fetch(`${USER_STATS_SERVICE_URL}/stats/${walletAddress}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      fetch(`${USER_STATS_SERVICE_URL}/achievements/${walletAddress}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
    ]);

    const statsData = await statsResponse.json();
    const achievementsData = await achievementsResponse.json();

    if (!statsResponse.ok || !achievementsResponse.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch user data' },
        { status: 500 }
      );
    }

    // Calculate total points from achievements
    const achievements = achievementsData.data || [];
    const totalPoints = achievements.reduce((sum: number, achievement: any) => {
      return sum + (achievement.points_rewarded || 0);
    }, 0);

    // Update the stats with the calculated points
    const updatedStats = {
      ...statsData.data,
      omzo_points: totalPoints,
      achievements_count: achievements.length
    };

    return NextResponse.json({
      success: true,
      data: {
        stats: updatedStats,
        achievements: achievements,
        totalPoints: totalPoints,
        achievementsCount: achievements.length
      }
    });
  } catch (error) {
    console.error('Error fetching user stats with achievements:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}