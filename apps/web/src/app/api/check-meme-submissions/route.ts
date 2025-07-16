import { NextRequest, NextResponse } from 'next/server';

const USER_STATS_SERVICE_URL = process.env.USER_STATS_SERVICE_URL;
const CHECK_PASS = process.env.CHECK_PASS;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const password = searchParams.get('pass');
    const walletAddress = searchParams.get('wallet');
    const twitterLink = searchParams.get('twitter');

    // Validate password
    if (password !== CHECK_PASS) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Validate required parameters
    if (!walletAddress || !twitterLink) {
      return NextResponse.json(
        { error: 'Missing required parameters: wallet and twitterLink' },
        { status: 400 }
      );
    }

    // Validate wallet address format
    if (!walletAddress.startsWith('0x') || walletAddress.length !== 42) {
      return NextResponse.json(
        { error: 'Invalid wallet address format' },
        { status: 400 }
      );
    }

    // Call the Twitter subscription service
    const response = await fetch(`${USER_STATS_SERVICE_URL}/achievements/omzo-meme-creator`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        wallet_address: walletAddress,
        tweet_url: twitterLink
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          error: 'Failed to verify Twitter subscription',
          details: data.error || data.message || 'Unknown error'
        },
        { status: response.status }
      );
    }

    // Log the verification for monitoring
    console.log(`Twitter meme submission verified: ${walletAddress} - ${twitterLink}`);

    return NextResponse.json({
      success: true,
      message: 'Twitter meme submission verified successfully',
      data: {
        wallet_address: walletAddress,
        twitter_link: twitterLink,
        verified_at: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Error verifying Twitter meme submission:', error);

    return NextResponse.json(
      {
        error: 'Failed to verify Twitter meme submission',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}