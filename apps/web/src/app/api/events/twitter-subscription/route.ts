import { NextRequest, NextResponse } from 'next/server';

const USER_STATS_SERVICE_URL = process.env.USER_STATS_SERVICE_URL;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { wallet_address, twitter_username } = body;

    // Validate required fields
    if (!wallet_address || !twitter_username) {
      return NextResponse.json(
        { error: 'Missing required fields: wallet_address and twitter_username' },
        { status: 400 }
      );
    }

    // Validate wallet address format
    if (!wallet_address.startsWith('0x')) {
      return NextResponse.json(
        { error: 'Invalid wallet address format' },
        { status: 400 }
      );
    }

    // Validate Twitter username format
    if (typeof twitter_username !== 'string' || twitter_username.trim().length === 0) {
      return NextResponse.json(
        { error: 'Invalid Twitter username' },
        { status: 400 }
      );
    }

    // Forward the request to the external service
    const response = await fetch(`${USER_STATS_SERVICE_URL}/events/twitter-subscription`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        wallet_address,
        twitter_username: twitter_username.trim().replace('@', ''),
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { ...data, error: data.message || data.error || 'Failed to verify Twitter follow' },
        { status: response.status }
      );
    }

    return NextResponse.json({
      success: true,
      data: data.data || { message: 'Twitter follow verification submitted successfully' }
    });
  } catch (error) {
    console.error('Error processing Twitter subscription:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}