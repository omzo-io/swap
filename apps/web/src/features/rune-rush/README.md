# Run Rush Tournament Feature

## Overview

The Run Rush Tournament is a gamified feature that allows users to track their achievements, compete on a leaderboard, and earn points for their trading activities. Users can view their statistics, achievements, and compare their performance with other traders.

## Features

### 1. Tournament Table
- Displays a leaderboard of all users ranked by Omzo points
- Shows wallet addresses, total swaps, points, and trading volume
- Highlights the current user's position
- Responsive design with trophy icons for top 3 positions

### 2. User Statistics
- Personal trading statistics including total swaps, volume, and liquidity additions
- Current streak tracking
- Omzo points earned
- First swap completion date

### 3. Achievements System
- Displays earned achievements with descriptions and point rewards
- Achievement cards with dates and point values
- Visual indicators for different achievement types

### 4. Global Platform Statistics
- Platform-wide metrics including total users, swaps, and liquidity
- Real-time statistics display

## API Integration

The feature integrates with the User Statistics Service API as documented in the API.md file. The following endpoints are used:

- `GET /api/stats/:wallet_address` - User statistics
- `GET /api/achievements/:wallet_address` - User achievements
- `GET /api/leaderboard` - Tournament leaderboard
- `GET /api/global-stats` - Platform statistics

## Components

### API Hooks
- `useUserStats` - Fetches user statistics
- `useUserAchievements` - Fetches user achievements
- `useLeaderboard` - Fetches tournament leaderboard
- `useGlobalStats` - Fetches platform statistics

### UI Components
- `TournamentTable` - Main leaderboard display
- `UserStatsCard` - Personal statistics display
- `AchievementCard` - Individual achievement display
- `GlobalStatsCard` - Platform statistics display

## Usage

1. Navigate to `/rune-rush` in the application
2. Connect your wallet to view personal statistics
3. View the tournament table to see rankings
4. Check your achievements and progress

## Environment Variables

Set the following environment variable to point to your User Statistics Service:

```
USER_STATS_SERVICE_URL=https://your-domain.com/api
```

## Styling

The feature uses the existing design system with:
- Consistent color scheme and typography
- Responsive grid layouts
- Hover effects and transitions
- Gradient backgrounds and modern UI elements

## Future Enhancements

- Real-time updates using WebSocket connections
- Achievement notifications
- Tournament seasons and time-based competitions
- Reward distribution system
- Social features and sharing