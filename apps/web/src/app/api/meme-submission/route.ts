import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

// Google Sheets API configuration
const GOOGLE_SHEETS_SPREADSHEET_ID = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
const GOOGLE_SHEETS_RANGE = process.env.GOOGLE_SHEETS_RANGE || 'submissions!A:D'; // A=timestamp, B=wallet, C=twitter_link, D=status

// Service account credentials (JSON string from environment variable)
const GOOGLE_SERVICE_ACCOUNT_CREDENTIALS = process.env.GOOGLE_SERVICE_ACCOUNT_CREDENTIALS;

let sheets: any = null;

// Initialize Google Sheets API with service account
const initializeSheets = () => {
  if (!GOOGLE_SERVICE_ACCOUNT_CREDENTIALS) {
    throw new Error('GOOGLE_SERVICE_ACCOUNT_CREDENTIALS environment variable is required');
  }

  try {
    const credentials = JSON.parse(GOOGLE_SERVICE_ACCOUNT_CREDENTIALS);

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    sheets = google.sheets({ version: 'v4', auth });
  } catch (error) {
    console.error('Error parsing service account credentials:', error);
    throw new Error('Invalid service account credentials format');
  }
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { walletAddress, twitterLink } = body;

    // Validate input
    if (!walletAddress || !twitterLink) {
      return NextResponse.json(
        { error: 'Missing required fields: walletAddress and twitterLink' },
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

    // Validate Twitter/X link
    if (!twitterLink.includes('twitter.com') && !twitterLink.includes('x.com')) {
      return NextResponse.json(
        { error: 'Invalid Twitter/X link' },
        { status: 400 }
      );
    }

    // Initialize sheets if not already done
    if (!sheets) {
      initializeSheets();
    }

    // Prepare data for Google Sheets
    const timestamp = new Date().toISOString();
    const rowData = [
      timestamp,
      walletAddress,
      twitterLink,
      'pending' // status - pending, approved, rejected
    ];

    // Append data to Google Sheets
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: GOOGLE_SHEETS_SPREADSHEET_ID,
      range: GOOGLE_SHEETS_RANGE,
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: [rowData]
      }
    });

    if (response.status !== 200) {
      throw new Error('Failed to write to Google Sheets');
    }

    // Log the submission for monitoring
    console.log(`Meme submission recorded: ${walletAddress} - ${twitterLink}`);

    return NextResponse.json({
      success: true,
      message: 'Meme submission recorded successfully',
      data: {
        timestamp,
        walletAddress,
        twitterLink,
        status: 'pending'
      }
    });

  } catch (error) {
    console.error('Error processing meme submission:', error);

    return NextResponse.json(
      {
        error: 'Failed to process meme submission',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}